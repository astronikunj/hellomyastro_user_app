import {Alert, FlatList, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Colors, Sizes} from '@/assets';
import AstroCard from '@/components/AstroCard';
import ScrollableHorizontalList from '@/components/ScrollableHorizontalList';
import Header from '@/components/Header';
import {
  useActiveAstrologerCategoryMutation,
  useChangeCallStatusMutation,
  useCheckUserAlreadyInCallReqMutation,
  useGetAstrologersMutation,
} from '@/redux/services/astroService';
import Spacing from '@/components/Spacing';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/store';
import {useNavigation, useRoute} from '@react-navigation/native';
import {normalize} from '@/utils/normalize';
import LoaderModal from '@/components/LoaderModal';
import ToastMessage from '@/components/ToastMessage';
import ChatWarningAlert from '@/components/ChatWarning';

type Props = {};

const CallAstroScreen = (props: Props) => {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const [getAstrologers, getAstrologersRes] = useGetAstrologersMutation();
  const [astroData, setAstroData] = React.useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const {chatFilter} = useSelector((state: RootState) => state.global);
  const [getCategories] = useActiveAstrologerCategoryMutation();
  const [changeStatus] = useChangeCallStatusMutation();
  const [checkUserAlreadyInCallReq] = useCheckUserAlreadyInCallReqMutation();
  const [callWarning, setCallWarning] = useState(false)
  const route = useRoute();
  const {category} = (route.params as any) || '';
  const {isAuthenticated: isLoggedIn, user} = useSelector(
    (state: RootState) => state.auth,
  );
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
      })
      .catch(err => {
        console.error('Error fetching astrologers data', err);
      });
  };
  React.useEffect(() => {
    updateAstroCategoryData();
  }, [category, chatFilter]);
  const renderHeader = () => {
    return (
      <View style={{marginHorizontal: Sizes.base}}>
        {/* <ScrollableHorizontalList
          categories={categories}
          chatFilter={chatFilter}
        /> */}
        <Spacing height={12} />
      </View>
    );
  };
  const onPressCall = React.useCallback(async (item: any) => {
    if (!isLoggedIn) {
      navigation.navigate('login');
      return;
    } else {
      const userWalletAmount = user?.totalWalletAmount || 0;
      const isEligible =
        item.charge * 5 <= userWalletAmount;
      // if (item.isFreeAvailable && userWalletAmount == 0) {
      //   setCallWarning(true)
      //   return;
      // }
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
              onPress: () => navigation.navigate('wallet'),
            },
          ],
        );
        return;
      }
      const resultInChatReq = await checkUserAlreadyInCallReq({
        astorlogerId: item.id,
      }).unwrap();
      const isUserAlreadyInChatReq = resultInChatReq.recordList;
      if (isUserAlreadyInChatReq == false) {
        if (item.callStatus?.toLowerCase() == 'online') {
          // og check is item.chatStatus == 'Online'
          if (item.callaitTime != null) {
            const waitTimeDiff =
              new Date(item.callWaitTime).getTime() - Date.now();
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
            type: 'Call',
          });
        } else {
          // Alert.alert(
          //   t('Chat Unavailable'),
          //   t('This astrologer is currently unavailable for chat.'),
          // );
          ToastMessage({
            message: 'This astrologer is currently unavailable for call.',
          });
          return;
        }
      }
    }
  }, []);
  return (
    <View
      style={{
        backgroundColor: Colors.orangeColor,
        flex: 1,
        paddingTop: inset.top,
      }}>
      <Header title="Call to astrologer" />
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.whiteColor,
        }}>
        <View style={{paddingVertical: normalize(12)}}>
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
              onPressCall={() => onPressCall(item)}
              fromScreen="call_screen"
              callWaitTime={item?.callWaitTime}
              callStatus={item?.callStatus}
            />
          )}
          contentContainerStyle={{
            gap: Sizes.base,
            paddingTop: 12,
            paddingBottom: 12,
          }}
          // ListHeaderComponent={renderHeader}
        />
      </View>
      <LoaderModal loading={getAstrologersRes?.isLoading} />
      {callWarning && <ChatWarningAlert visible={callWarning} onClose={() => setCallWarning(false)} walletScreen={() => navigation.navigate('wallet')} />}
    </View>
  );
};

export default CallAstroScreen;

const styles = StyleSheet.create({});
