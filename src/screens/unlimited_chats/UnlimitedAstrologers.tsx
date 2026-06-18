import {Colors, Sizes} from '@/assets';
import AstroCard from '@/components/AstroCard';
import ChatWarningAlert from '@/components/ChatWarning';
import Header from '@/components/Header';
import LoaderModal from '@/components/LoaderModal';
import ToastMessage from '@/components/ToastMessage';
import {
  useChangeStatusMutation,
  useCheckUserAlreadyInChatReqMutation,
  useGetUnlimitedAstrologersMutation,
} from '@/redux/services/astroService';
import {RootState} from '@/redux/store';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';

const UnlimitedAstrologers = () => {
  const navigation = useNavigation<any>();
  const inset = useSafeAreaInsets();
  const {isAuthenticated: isLoggedIn, user} = useSelector(
    (state: RootState) => state.auth,
  );
  const [getAstrologers, getAstrologersRes] = useGetUnlimitedAstrologersMutation();
  const [checkUserAlreadyInChatReq] = useCheckUserAlreadyInChatReqMutation();
  const [changeStatus] = useChangeStatusMutation();
  const [astrologersList, setAstrologersList] = useState<any[]>([]);
  const [chatWarning, setChatWarning] = useState(false);

  const fetchAstrologers = async () => {
    let payload: any = {
      userId: user?.id,
    };
    getAstrologers(payload)
      .unwrap()
      .then(res => {
        setAstrologersList(res?.recordList || []);
      })
      .catch(err => {
        console.error('Error fetching astrologers data', err);
      });
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchAstrologers();
    });
    return unsubscribe;
  }, []);

  const onPressChat = useCallback(async (item: any) => {
    if (!isLoggedIn) {
      navigation.navigate('login');
      return;
    } else {
      const userWalletAmount = user?.totalWalletAmount || 0;
      const isEligible = item.unlimited_amount <= userWalletAmount;
      if (!isEligible) {
        setChatWarning(true);
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
            chatType: 'unlimited',
            astrologerUserId: item?.userId,
          });
        } else {
          ToastMessage({
            message: 'This astrologer is currently unavailable for chat.',
          });
          return;
        }
      }
    }
  }, []);

  return (
    <View style={[styles.container, {paddingTop: inset.top}]}>
      <Header title="Unlimited Chat" />
      <TouchableOpacity onPress={() => navigation.navigate('unlimitedChat')}>
        <Text style={{color: '#000', fontSize: 15, backgroundColor: 'orange'}}>Go CHat Screen</Text>
      </TouchableOpacity>
      <FlatList
        data={astrologersList}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => (
          <AstroCard
            allSkills={item.allSkill}
            charge={item.unlimited_amount}
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
        //   ListHeaderComponent={renderHeader}
        //   refreshControl={
        //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        //   }
      />
      {chatWarning && (
        <ChatWarningAlert
          visible={chatWarning}
          onClose={() => setChatWarning(false)}
          walletScreen={() => navigation.navigate('wallet')}
        />
      )}

      <LoaderModal loading={getAstrologersRes?.isLoading} />
    </View>
  );
};

export default UnlimitedAstrologers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
});
