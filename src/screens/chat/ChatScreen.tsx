import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  StyleSheet,
  Keyboard,
  Dimensions,
  Alert,
  BackHandler,
  Animated,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useChatViewModel from './useChatModel';
import ChatMessageBubble from './ChatBubble';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/redux/store';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Colors, Fonts} from '@/assets';
import FastImage from 'react-native-fast-image';
import {imgBaseurl} from '@/constants/constant';
import {normalize, verticalScale} from '@/utils/normalize';
import {formatTimeer, ToastMessage} from '@/utils/helper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  useAddReviewMutation,
  useEndChatTimeMutation,
  useGetUserDetailMutation,
} from '@/redux/services/astroService';
import PopUp from '@/components/PopUp';
import LoaderModal from '@/components/LoaderModal';
import {updateUser} from '@/redux/slices/authSlice';
import PopEndChat from '@/components/PopEndChat';
import ReviewModal from '@/components/ReviewModal';
import moment from 'moment';

const ChatScreen = () => {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const {
    messages,
    messageText,
    setMessageText,
    sendMessage,
    setCurrentUserId,
    setAstrologerId,
    setChatId,
    sendChatEndMessage,
  } = useChatViewModel();
  const userDetail = useSelector((state: RootState) => state.auth.user);
  const {chatStartTime} = useSelector((state: RootState) => state.global);
  const route = useRoute();
  const {astrologerId, chatIdNoti, astroProfile, astrologerName, chatDuration, astrologerUserId} =
    route.params || ({} as any);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [endChatTime, endChatTimeRes] = useEndChatTimeMutation();
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const [getUserDetails] = useGetUserDetailMutation();
  const [spentMoney, setSpentMoney] = useState(0);
  const [showEndChatPopUp, setShowEndChatPopUp] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [addReview, addReviewRes] = useAddReviewMutation();
  const [endFunCall, setEndFunCall] = useState(true);
  const flatListRef = useRef<FlatList>(null);
  const keyboardHeight = useRef(new Animated.Value(0)).current;
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    if (userDetail) {
      setCurrentUserId(userDetail.id);
    }
    if (userDetail && astrologerId) {
      // Use astrologerUserId (users table FK) for Firestore path — matches partner app
      const firestoreAstroId = astrologerUserId || astrologerId;
      const chatIdStr = `${firestoreAstroId}_${userDetail?.id}`;
      setAstrologerId(firestoreAstroId);
      setChatId(chatIdStr.toString());
      setSecondsLeft(parseInt(chatDuration));
      setEndFunCall(false);
    }
  }, [route.params]);

    // Keyboard listeners
    useEffect(() => {
      const showListener = Keyboard.addListener(
        Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
        e => {
          setKeyboardOpen(true);
          Animated.timing(keyboardHeight, {
            toValue: e.endCoordinates.height,
            duration: 250,
            useNativeDriver: false,
          }).start();
          // scroll to bottom when keyboard shows
          flatListRef.current?.scrollToOffset({offset: 0, animated: true});
        },
      );

      const hideListener = Keyboard.addListener(
        Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
        () => {
          setKeyboardOpen(false);
          Animated.timing(keyboardHeight, {
            toValue: 0,
            duration: 250,
            useNativeDriver: false,
          }).start();
        },
      );

      return () => {
        showListener.remove();
        hideListener.remove();
      };
    }, []);

  const formatTime = (seconds: any) => {
    const total = Math.max(0, Math.floor(seconds)); // ensure integer & >= 0
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  useEffect(() => {
    if (!chatDuration) {return;} // server/astrologer se mila time

    // end time = start time + duration (both in seconds)
    const endTimeUnix = Number(chatStartTime) + Number(chatDuration);

    const updateRemaining = () => {
      const nowUnix = Math.floor(Date.now() / 1000); // current time in seconds
      const remaining = endTimeUnix - nowUnix;

      if (remaining <= 0) {
        setSecondsLeft(0);
      } else {
        setSecondsLeft(Math.floor(remaining)); // force integer
      }
    };

    // run immediately once to set initial state
    updateRemaining();

    const timer = setInterval(updateRemaining, 1000);

    return () => clearInterval(timer);
  }, [chatDuration]);

  const endChat = async () => {
    try {
      const body = {
        chatId: chatIdNoti,
        totalMin: Number(chatDuration) - secondsLeft,
      };
      console.log(body);
      if (endFunCall) {return;}
      setEndFunCall(true);
      const username = userDetail?.name;
      sendChatEndMessage(`${username ? username : 'Guest'} -> Chat Ended`);
      const response = await endChatTime(body).unwrap();
      if (response.status == 200) {
        setSpentMoney(response.recordList);
        const res = await getUserDetails('').unwrap();
        dispatch(updateUser({user: res.userDetails}));
        setShowEndChatPopUp(true);
        ToastMessage('Chat ended successfully');
      } else {
        ToastMessage('Failed to end chat');
      }
    } catch (error) {
      console.error('Error ending chat:', error);
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[0].text;

      console.log('last message', lastMessage);
      if (lastMessage.includes('Chat Ended')) {
        console.log('Chat Ended found in last message');
        endChat();
      }
    }
  }, [messages]);

  const addCustomerReview = ({rating, review}: any) => {
    let body = {
      rating: rating,
      review: review,
      astrologerId: astrologerId,
      isPublic: true,
    };
    addReview(body)
      .unwrap()
      .then(res => {
        if (res.status == 200) {
          ToastMessage('Astrologe Review successfully!');
          setShowReviewModal(false);
          navigation.replace('drawer');
        }
      })
      .catch(error => {
        Alert.alert('Error', JSON.stringify(error));
        setShowReviewModal(false);
        navigation.replace('drawer');
      });
  };

  const groupMessagesByDate = (messages: any[]) => {
    if (!messages || messages.length === 0) {return [];}

    // Step 1: Sort messages oldest → newest
    const sorted = [...messages].sort(
      (a, b) => moment(a.datetime).valueOf() - moment(b.datetime).valueOf(),
    );

    // Step 2: Build grouped list
    const grouped: any[] = [];
    let lastDate = '';

    sorted.forEach(msg => {
      const msgDate = moment(msg.datetime).format('YYYY-MM-DD');

      if (msgDate !== lastDate) {
        grouped.push({
          type: 'date',
          date: msgDate,
        });
        lastDate = msgDate;
      }

      grouped.push({
        type: 'message',
        ...msg,
      });
    });

    // Step 3: Reverse so FlatList inverted works as expected
    return grouped.reverse();
  };

  const getDateLabel = (date: string) => {
    const now = moment();
    const msgDate = moment(date);

    if (msgDate.isSame(now, 'day')) {return 'Today';}
    if (msgDate.isSame(now.clone().subtract(1, 'day'), 'day'))
      {return 'Yesterday';}

    return msgDate.format('MMM D, YYYY');
  };

  useEffect(() => {
    // function to handle back press
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => endChat(), // or navigation.goBack()
        },
      ]);
      return true; // prevent default behavior (back)
    };

    // add event listener
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    // clean up
    return () => backHandler.remove();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: inset.top,
        backgroundColor: Colors.orangeColor,
        paddingBottom: inset.bottom,
      }}>
      <View style={styles.topBarContainer}>
        <View style={styles.row}>
          <FastImage
            source={{uri: `${imgBaseurl}${astroProfile}`}}
            style={styles.avatar}
          />
          <Text style={styles.astroName}>{astrologerName || 'Chat'}</Text>
        </View>
        <View style={styles.row}>
          <View style={[styles.button, {backgroundColor: 'transparent'}]}>
            <Text style={styles.timerText}>{formatTime(secondsLeft)}</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={() => {
              setVisible(true);
            }}>
            <Text style={styles.buttonText}>End Chat</Text>
          </TouchableOpacity>
        </View>
      </View>
      {visible && (
        <PopUp
          isVisible={visible}
          onClose={() => setVisible(false)}
          profileUrl={`${imgBaseurl}${astroProfile}`}
          title={`${astrologerName} Astro`}
          description={`Are you sure you want to end this chat with astrologer ${astrologerName}? This action cannot be undone.`}
          buttons={[
            {
              label: 'End Chat',
              onPress: () => {
                endChat();
                setVisible(false);
                // navigation.replace('drawer');
              },
              style: {backgroundColor: Colors.colorOrange},
            },
          ]}
        />
      )}
      {(endChatTimeRes?.isLoading || addReviewRes?.isLoading) && (
        <LoaderModal loading={endChatTimeRes?.isLoading} />
      )}
      {showEndChatPopUp && (
        <PopEndChat
          profileImage={`${imgBaseurl}${astroProfile}`}
          title="Chat is Ended"
          description={`You chat is ended with ${astrologerName} Astro and ₹${spentMoney} is deducted for this chat.`}
          buttons={[
            {
              label: 'Done',
              onPress: () => setShowReviewModal(true),
            },
          ]}
        />
      )}
      {showReviewModal && (
        <ReviewModal
          isVisible={true}
          onClose={() => {
            navigation.replace('drawer');
            setShowReviewModal(false);
          }}
          onSubmit={({rating, review}) => {
            console.log('Rating', rating, 'Review', review);
            addCustomerReview({rating, review});
          }}
        />
      )}
      {/* <KeyboardAwareScrollView
        contentContainerStyle={{flex: 1}}
        keyboardShouldPersistTaps="handled"
        bottomOffset={Platform.OS === 'ios' ? 30 : 0}>
        <View style={{flex: 1}}>
          <FlatList
            style={{backgroundColor: '#f5f5f5'}}
            data={groupMessagesByDate(messages)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => {
              if (item.type === 'date') {
                return (
                  <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>
                      {getDateLabel(item.date)}
                    </Text>
                  </View>
                );
              }

              return (
                <ChatMessageBubble
                  message={item.text}
                  isSelf={item.isSelf}
                  time={item.time}
                />
              );
            }}
            inverted
            contentContainerStyle={{paddingVertical: 10}}
            keyboardShouldPersistTaps="handled"
          />
        </View>
        <View style={[styles.inputContainer]}>
          <TextInput
            style={styles.input}
            placeholder="Type a message"
            placeholderTextColor={'#888'}
            value={messageText}
            onChangeText={setMessageText}
          />
          <TouchableOpacity onPress={sendMessage} style={{marginLeft: 8}}>
            <Ionicons name="send" size={24} color="#0084ff" />
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView> */}
      {/* Messages + Input */}
      <Animated.View style={{flex: 1, paddingBottom: Platform.OS == 'ios' ? keyboardHeight : keyboardOpen ? normalize(8) : 0}}>
        <FlatList
          ref={flatListRef}
          style={{flex: 1, backgroundColor: '#f5f5f5'}}
          data={groupMessagesByDate(messages)}
          keyExtractor={(item, index) => index.toString()}
          inverted
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{paddingVertical: 10}}
          renderItem={({item}) => {
            if (item.type === 'date') {
              return (
                <View style={styles.dateContainer}>
                  <Text style={styles.dateText}>{getDateLabel(item.date)}</Text>
                </View>
              );
            }
            return (
              <ChatMessageBubble
                message={item.text}
                isSelf={item.isSelf}
                time={item.time}
              />
            );
          }}
        />

        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message"
            placeholderTextColor="#888"
            value={messageText}
            onChangeText={setMessageText}
            multiline
          />
          <TouchableOpacity onPress={sendMessage} style={{marginLeft: 8}}>
            <Ionicons name="send" size={24} color="#0084ff" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.blackColor,
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(10),
  },
  buttonText: {
    color: Colors.whiteColor,
    fontSize: verticalScale(11),
    fontFamily: Fonts.medium,
    includeFontPadding: false,
  },
  timerText: {
    color: Colors.blackColor,
    fontSize: verticalScale(11),
    fontFamily: Fonts.regular,
    includeFontPadding: false,
  },
  input: {
    flex: 1,
    backgroundColor: '#eee',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
    fontFamily: Fonts.regular,
    includeFontPadding: false,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  topBarContainer: {
    backgroundColor: Colors.orangeColor,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    justifyContent: 'space-between',
  },
  avatar: {
    width: verticalScale(35),
    height: verticalScale(35),
    borderRadius: 25,
    marginRight: 12,
  },
  astroName: {
    fontSize: 17,
    color: Colors.blackColor,
    includeFontPadding: false,
    fontFamily: Fonts.medium,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateContainer: {
    alignSelf: 'center',
    marginVertical: 10,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#eee',
    borderRadius: 12,
  },
  dateText: {
    fontSize: 12,
    color: '#555',
  },
});
