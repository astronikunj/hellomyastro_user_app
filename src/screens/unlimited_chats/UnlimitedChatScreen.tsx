import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
  Animated,
  Platform,
  Keyboard,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/redux/store';
import {
  useEndChatTimeMutation,
  useGetChatMessagesMutation,
  useGetUserDetailMutation,
  useLazyGetMessagesQuery,
  useSendMessageMutation,
} from '@/redux/services/astroService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {socket} from '@/services/socket';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {Chat} from '@flyerhq/react-native-chat-ui';
import ChatMessageBubble from '../chat/ChatBubble';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors, Fonts} from '@/assets';
import {normalize, verticalScale} from '@/utils/normalize';
import {imgBaseurl} from '@/constants/constant';
import FastImage from 'react-native-fast-image';
import {useNavigation, useRoute} from '@react-navigation/native';
import PopUp from '@/components/PopUp';
import {updateUser} from '@/redux/slices/authSlice';
import {ToastMessage} from '@/utils/helper';
import PopEndChat from '@/components/PopEndChat';

export const UnlimitedChatScreen = () => {
  const navigation = useNavigation<any>();
  const inset = useSafeAreaInsets();
  const route = useRoute();
  const userDetail = useSelector((state: RootState) => state.auth.user);
  const {
    astrologerId,
    chatIdNoti,
    astroProfile,
    astrologerName,
    chatDuration,
    astrologerUserId,
  } = route.params || ({} as any);
  const [messages, setMessages] = useState<any[]>([]);
  const [showEndChatPopUp, setShowEndChatPopUp] = useState(false);
  const [text, setText] = useState('');
  const {isAuthenticated: isLoggedIn, user} = useSelector(
    (state: RootState) => state.auth,
  );
  const dispatch = useDispatch();
  const [getChatMessages] = useGetChatMessagesMutation();
  const [endChatTime, endChatTimeRes] = useEndChatTimeMutation();
  const [getUserDetails] = useGetUserDetailMutation();
  const [visible, setVisible] = useState(false);
  const keyboardHeight = useRef(new Animated.Value(0)).current;
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  console.log('Astro id', astrologerId);

  React.useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const bodyContent = {
      user_id: user?.id,
      astrologer_id: astrologerUserId,
    };
    try {
      const res: any = await getChatMessages(bodyContent).unwrap();
      setMessages(res.data.messages);
    } catch (error) {
      console.log('Error', error);
    }
  };

  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });

    socket.on('connect_error', err => {
      console.log('Socket error:', err.message);
    });

    socket.emit('join', user?.id);

    // Receiver
    socket.on('private_message', msg => {
      setMessages(prev => [msg?.data, ...prev]);
      if (msg?.data?.message.includes('Chat Ended')) {
        endChat();
      }
    });

    // Sender ACK
    socket.on('message_sent', msg => {
      // Alert.alert('Sender Ack', JSON.stringify(msg));
      console.log('MSG SENT ACK::', msg);
      setMessages(prev => [msg?.data, ...prev]);
    });

    socket.on('message_error', err => {
      console.log('Message error:', err);
    });

    return () => {
      socket.off('private_message');
      socket.off('message_sent');
      socket.disconnect();
    };
  }, []);

  const onSend = async () => {
    const payload = {
      sender_id: user?.id,
      receiver_id: astrologerUserId,
      sender_type: 'user',
      message: text,
    };
    socket.emit('private_message', {
      ...payload,
    });
    setText('');
  };

  const sendChatEndMessage = async (message: string) => {
    const payload = {
      sender_id: user?.id,
      receiver_id: astrologerUserId,
      sender_type: 'user',
      message: message,
    };
    socket.emit('private_message', {
      ...payload,
    });
    setText('');
  };

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

  const endChat = async () => {
    try {
      const body = {
        chatId: chatIdNoti,
        totalMin: 30 * 60,
      };
      console.log(body);
      const username = userDetail?.name;
      sendChatEndMessage(`${username ? username : 'Guest'} -> Chat Ended`);
      const response = await endChatTime(body).unwrap();
      if (response.status == 200) {
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

  return (
    <View
      style={{
        flex: 1,
        paddingTop: inset.top,
        // backgroundColor: Colors.orangeColor,
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
      {showEndChatPopUp && (
        <PopEndChat
          profileImage={`${imgBaseurl}${astroProfile}`}
          title="Chat is Ended"
          description={`You chat is ended with ${astrologerName} Astro.`}
          buttons={[
            {
              label: 'Done',
              onPress: () => navigation.replace('drawer'),
            },
          ]}
        />
      )}
      <Animated.View
        style={{
          flex: 1,
          paddingBottom:
            Platform.OS == 'ios'
              ? keyboardHeight
              : keyboardOpen
              ? normalize(8)
              : 0,
        }}>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id || Math.random().toString()}
          inverted
          renderItem={({item}) => (
            <ChatMessageBubble
              message={item?.message}
              isSelf={item?.sender_id == user?.id}
              time={moment(item?.created_at).format('hh:MM A')}
            />
          )}
        />

        <View style={styles.inputContainer}>
          <TextInput
            value={text}
            onChangeText={setText}
            style={styles.input}
            placeholder="Type message..."
            placeholderTextColor={'#666'}
            multiline
          />
          <TouchableOpacity
            onPress={onSend}
            style={{
              padding: 16,
              marginLeft: 10,
            }}>
            <Ionicons name="send" size={24} color="#0084ff" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 24,
    borderColor: '#ddd',
    elevation: 8,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    borderRadius: 8,
    padding: 10,
    color: '#0d0d0d',
    fontFamily: Fonts.regular,
    includeFontPadding: false,
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
});
