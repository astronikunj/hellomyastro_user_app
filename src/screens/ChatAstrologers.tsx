import {Alert, FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Colors, Sizes} from '@/assets';
import AstroCard from '@/components/AstroCard';
import Spacing from '@/components/Spacing';
import ScrollableHorizontalList from '@/components/ScrollableHorizontalList';
import ChatScreenBanner from '@/components/ChatScreenBanner';
import Header from '@/components/Header';
import {
  useActiveAstrologerCategoryMutation,
  useChangeStatusMutation,
  useCheckUserAlreadyInChatReqMutation,
  useGetAstrologersMutation,
} from '@/redux/services/astroService';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LoaderModal from '@/components/LoaderModal';
import {RootState} from '@/redux/store';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {StatusBar} from 'expo-status-bar';
import ToastMessage from '@/components/ToastMessage';
import ChatWarningAlert from '@/components/ChatWarning';

type Props = {};

const ChatsAstrologer = (props: Props) => {
  const navigation = useNavigation<any>();
  const {t} = useTranslation();
  const route = useRoute();
  const {category} = (route.params as any) || '';
  const {isAuthenticated: isLoggedIn, user} = useSelector(
    (state: RootState) => state.auth,
  );
  const inset = useSafeAreaInsets();
  const [getCategories] = useActiveAstrologerCategoryMutation();
  const [getAstrologers, getAstrologersRes] = useGetAstrologersMutation();
  const [checkUserAlreadyInChatReq] = useCheckUserAlreadyInChatReqMutation();
  const [changeStatus] = useChangeStatusMutation();
  const [astroData, setAstroData] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const {chatFilter} = useSelector((state: RootState) => state.global);
  const [chatWarning, setChatWarning] = useState(false);
  React.useEffect(() => {
    getCategories({})
      .unwrap()
      .then(res => {
        if (res?.recordList) {
          let catee = res?.recordList;
          catee = [{id: 0, name: 'All'}, ...catee];
          setCategories(catee);
        }
      })
      .catch(err => {
        console.error('Error fetching categories', err);
      });
  }, []);
  React.useEffect(() => {
    updateAstroCategoryData();
  }, [category, chatFilter]);

  const onPressChat = useCallback(async (item: any) => {
    if (!isLoggedIn) {
      navigation.navigate('login');
      return;
    } else {
      const userWalletAmount = user?.totalWalletAmount || 0;
      const isEligible =
        item.charge * 5 <= userWalletAmount || item.isFreeAvailable;
      if (item.isFreeAvailable && userWalletAmount == 0) {
        setChatWarning(true);
        return;
      }
      if (!isEligible) {
        Alert.alert(
          'Warning!',
          'Your wallet balance is low recharge your wallet.',
          [
            {
              text: 'Cancel',
              onPress: () => null,
              style: 'cancel',
            },
            {
              text: 'YES',
              onPress: () => null, // navigation.navigate('wallet'),
            },
          ],
        );
        return;
      }
      const resultInChatReq = await checkUserAlreadyInChatReq({
        astorlogerId: item.id,
      }).unwrap();
      const isUserAlreadyInChatReq = resultInChatReq.recordList;
      if (isUserAlreadyInChatReq == false) {
        console.log('User is not in chat request', item.chatStatus);
        if (item.chatStatus?.toLowerCase() == 'online') {
          // og check is item.chatStatus == 'Online'
          if (item.chatWaitTime != null) {
            const waitTimeDiff =
              new Date(item.chatWaitTime).getTime() - Date.now();
            if (waitTimeDiff < 0) {
              await changeStatus({
                astrologerId: item.id,
                status: 'Online',
                waitTime: null,
              });
            }
          }
          navigation.navigate('chatForm', {
            astrologerId: item.id,
            astrologerName: item.name,
            astrologerImage: item.profileImage,
            isFreeAvailable: item.isFreeAvailable,
            freeChatDuration: item?.freeChatDuration,
            rate: item.charge,
            type: 'Chat',
          });
        } else {
          // Alert.alert(
          //   t('Chat Unavailable'),
          //   t('This astrologer is currently unavailable for chat.'),
          // );
          ToastMessage({
            message: 'This astrologer is currently unavailable for chat.',
          });
          return;
        }
      }
    }
  }, []);

  const updateAstroCategoryData = async () => {
    let payload: any = {
      userId: user?.id,
    };
    if (chatFilter) {
      payload = {
        ...payload,
        astrologerCategoryId: chatFilter?.id,
      };
    }
    getAstrologers(payload)
      .unwrap()
      .then(res => {
        setAstroData(res?.recordList || []);
        setRefreshing(false);
      })
      .catch(err => {
        console.error('Error fetching astrologers data', err);
      });
  };

  const renderHeader = () => {
    return (
      <View style={{marginHorizontal: Sizes.base}}>
        {/* <ScrollableHorizontalList
          categories={categories}
          chatFilter={chatFilter}
        /> */}
        {/* <Spacing height={12} /> */}
        <ChatScreenBanner />
      </View>
    );
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    updateAstroCategoryData();
  }, []);

  return (
    <View
      style={{
        backgroundColor: Colors.orangeColor,
        paddingTop: inset.top,
        flex: 1,
      }}>
      <StatusBar backgroundColor={Colors.orangeColor} />
      <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
        <Header title="Chat With Our Astrologers" />
        <Spacing height={12} />
        <View>
          <ScrollableHorizontalList
            categories={categories}
            chatFilter={chatFilter}
          />
        </View>
        <FlatList
          data={astroData}
          keyExtractor={item => item.id.toString()}
          renderItem={({item, index}) => (
            <AstroCard
              allSkills={item.allSkill}
              charge={item.charge}
              expInYears={item.experienceInYears}
              languages={item.languageKnown}
              name={item.name}
              primartSkills={item.primarySkill}
              profileImage={item.profileImage}
              rating={item.rating}
              onPressChat={() => onPressChat(item)}
              onPressProfile={() =>
                navigation.navigate('profile', {astrologerId: item.id})
              }
              fromScreen="chat_screen"
              chatWaitTime={item?.chatWaitTime}
              chatStatus={item?.chatStatus}
            />
          )}
          contentContainerStyle={{
            gap: Sizes.base,
            paddingTop: 12,
            paddingBottom: 12,
            backgroundColor: Colors.whiteColor,
          }}
          ListHeaderComponent={renderHeader}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
      {chatWarning && <ChatWarningAlert visible={chatWarning} onClose={() => setChatWarning(false)} walletScreen={() => navigation.navigate('wallet')} />}
      <LoaderModal loading={getAstrologersRes?.isLoading} />
    </View>
  );
};

export default ChatsAstrologer;

const styles = StyleSheet.create({});
