import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  useAcceptedChatMutation,
  useGetNotificationsMutation,
  useRejectChatMutation,
} from '@/redux/services/astroService';
import {useNavigation} from '@react-navigation/native';
import {imgBaseurl} from '@/constants/constant';
import Header from '@/components/Header';
import LoaderModal from '@/components/LoaderModal';
import {Colors, Fonts, Images} from '@/assets';
import {verticalScale} from '@/utils/normalize';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import PopUp from '@/components/PopUp';
import FastImage from 'react-native-fast-image';
import {useDispatch} from 'react-redux';
import {updateChatStartTime} from '@/redux/slices/globalSlice';

type Props = {};

const Notifications = (props: Props) => {
  const navigation = useNavigation<any>();
  const inset = useSafeAreaInsets();
  const dispatch = useDispatch<any>();
  const [acceptChat, acceptChatRes] = useAcceptedChatMutation();
  const [rejectChat] = useRejectChatMutation();
  const [data, setData] = useState<any>([]);
  const [showRejectPopup, setShowRejectPopup] = useState(false);
  const [rejectId, setRejectId] = useState<any>(null);
  const [rejectAstroName, setRejectAstroName] = useState('');
  const [astroProfileUrl, setAstroProfileUrl] = useState('');
  const [getUserNotifications, getUserNotificationsRes] =
    useGetNotificationsMutation();
  useEffect(() => {
    const subscribe = navigation.addListener('focus', () => {
      fetchNotifications();
    });
    return () => {
      subscribe();
    };
  }, []);
  const fetchNotifications = async () => {
    try {
      const response = await getUserNotifications({}).unwrap();
      console.log('Notifications fetched successfully:', response);
      setData(response.recordList || []);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };
  const renderItem = ({item}: any) => {
    if (item.chatId || item.callId) {
      return (
        <View style={styles.card}>
          <Image
            source={{uri: `${imgBaseurl}${item.astroprofileImage}`}}
            style={styles.avatar}
          />
          <View style={{flex: 1}}>
            <Text style={styles.title}>{item.title}</Text>
            {item.description && (
              <Text style={styles.desc}>{item.description}</Text>
            )}
            <Text style={styles.date}>{item.created_at}</Text>
            {item.notification_type == 1 ? (
              <Text style={styles.status}>
                Call Status: {item.callStatus} | Duration: {item.call_duration}s
              </Text>
            ) : (
              <Text style={styles.status}>
                Chat Status: {item.chatStatus} | Duration:{' '}
                {item.chat_duration / 60}
                min
              </Text>
            )}
            {item.notification_type == 3 && item.chatStatus != 'Completed' && (
              <View style={{flexDirection: 'row', gap: 10}}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    handleAcceptChat(
                      item.chatId,
                      item.astrologerId,
                      item.astroprofileImage,
                      item.astrologerName,
                      item.chat_duration,
                      item?.chatType,
                      item?.astrologerUserId,
                    );
                  }}>
                  <Text style={styles.buttonText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, {backgroundColor: Colors.blackColor}]}
                  onPress={() => {
                    // handleReject(item.chatId);
                    setShowRejectPopup(true);
                    setRejectId(item.chatId);
                    setRejectAstroName(item.astrologerName);
                    setAstroProfileUrl(
                      `${imgBaseurl}${item.astroprofileImage}`,
                    );
                  }}>
                  <Text style={styles.buttonText}>Reject</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      );
    } else {
      return null;
    }
  };
  const handleAcceptChat = (
    chatId: string,
    astrologerId: string,
    astroProfile: string,
    astrologerName: string,
    chatDuration: string,
    chatType: string,
    astrologerUserId: Number,
  ) => {
    const bodyContent = {chatId: chatId.toString()};
    acceptChat(bodyContent)
      .unwrap()
      .then(response => {
        console.log('Chat accepted successfully:', response);
        if (response.status == 200) {
          const time = Math.floor(Date.now() / 1000) + 2;
          dispatch(updateChatStartTime(time));
          // navigation.navigate('chat', {
          //   chatIdNoti: chatId,
          //   astrologerId: astrologerId,
          //   astroProfile: astroProfile,
          //   astrologerName: astrologerName,
          //   chatDuration: chatDuration,
          // });
          if (chatType == 'unlimited') {
            navigation.navigate('unlimitedChat', {
              chatIdNoti: chatId,
              astrologerId: astrologerId,
              astroProfile: astroProfile,
              astrologerName: astrologerName,
              chatDuration: chatDuration,
              astrologerUserId: astrologerUserId,
            });
          } else {
            navigation.navigate('chat', {
              chatIdNoti: chatId,
              astrologerId: astrologerId,
              astroProfile: astroProfile,
              astrologerName: astrologerName,
              chatDuration: chatDuration,
            });
          }
        }
      })
      .catch(error => {
        console.error('Failed to accept chat:', error);
      });
  };
  const handleReject = (chatId: string) => {
    const bodyContent = {chatId: chatId};
    rejectChat(bodyContent)
      .unwrap()
      .then(response => {
        console.log('Chat rejected successfully:', response);
        setShowRejectPopup(false);
        fetchNotifications(); // Refresh notifications after rejection
      })
      .catch(error => {
        console.error('Failed to reject chat:', error);
        setShowRejectPopup(false);
      });
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.orangeColor,
        paddingTop: inset.top,
        paddingBottom: inset.bottom,
      }}>
      <Header onPress={() => navigation.goBack()} title="Notifications" />
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{padding: 16}}
        style={{flex: 1, backgroundColor: Colors.whiteColor}}
        ListEmptyComponent={() => {
          if (!getUserNotificationsRes.isLoading && data.length === 0) {
            return (
              <View style={styles.emptyContainer}>
                <FastImage
                  source={Images.NoData}
                  style={{width: '100%', height: verticalScale(200)}}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    fontSize: verticalScale(11),
                    color: Colors.colorGrey,
                    fontFamily: Fonts.regular,
                    marginTop: 10,
                    includeFontPadding: false,
                  }}>
                  You have no notifications at the moment.
                </Text>
              </View>
            );
          }
          return null;
        }}
      />
      <PopUp
        isVisible={showRejectPopup}
        onClose={() => setShowRejectPopup(false)}
        profileUrl={astroProfileUrl}
        title={`${rejectAstroName} Astro`}
        description={`Are you sure you want to reject your chat with ${rejectAstroName} ? This action cannot be undone.`}
        buttons={[
          {
            label: 'Reject',
            onPress: () => {
              handleReject(rejectId);
            },
            style: {backgroundColor: Colors.blackColor},
          },
        ]}
      />
      <LoaderModal
        loading={getUserNotificationsRes?.isLoading || acceptChatRes?.isLoading}
      />
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    color: '#333',
    fontFamily: Fonts.semibold,
    includeFontPadding: false,
  },
  desc: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    fontFamily: Fonts.regular,
    includeFontPadding: false,
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    fontFamily: Fonts.regular,
    includeFontPadding: false,
  },
  status: {
    fontSize: 13,
    color: '#008080',
    marginTop: 6,
    fontFamily: Fonts.regular,
    includeFontPadding: false,
  },
  button: {
    backgroundColor: Colors.colorOrange,
    borderRadius: 8,
    padding: 7,
    justifyContent: 'center',
    alignItems: 'center',
    width: verticalScale(80),
    marginTop: verticalScale(10),
  },
  buttonText: {
    color: Colors.whiteColor,
    fontSize: 16,
    fontFamily: Fonts.medium,
    includeFontPadding: false,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: verticalScale(30),
  },
});
