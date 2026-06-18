import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import useChatViewModel from '../chat/useChatModel';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/store';
import ChatMessageBubble from '../chat/ChatBubble';
import {Colors, Fonts} from '@/assets';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import {imgBaseurl} from '@/constants/constant';
import {normalize, verticalScale} from '@/utils/normalize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

const ChatHistory = () => {
  const inset = useSafeAreaInsets();
  const route = useRoute();
  const {chatId, astrologerId, astroProfile, astrologerName} =
    route.params as any;
  const {messages, setCurrentUserId, setAstrologerId, setChatId, sendMessage} =
    useChatViewModel();
  const userDetail = useSelector((state: RootState) => state.auth.user);

  const [messageText, setMessageText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  // Animated keyboard height
  const keyboardHeight = useRef(new Animated.Value(0)).current;
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  // Update user & chat IDs
  useEffect(() => {
    if (userDetail) {setCurrentUserId(userDetail.id.toString());}
    if (route.params) {
      setChatId(chatId.toString());
      setAstrologerId(astrologerId.toString());
    }
  }, [route.params, userDetail]);

  // Keyboard listeners
  useEffect(() => {
    const showListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      e => {
        Animated.timing(keyboardHeight, {
          toValue: e.endCoordinates.height,
          duration: 250,
          useNativeDriver: false,
        }).start();
        setKeyboardOpen(true);
        // scroll to bottom when keyboard shows
        flatListRef.current?.scrollToOffset({offset: 0, animated: true});
      },
    );

    const hideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        Animated.timing(keyboardHeight, {
          toValue: 0,
          duration: 250,
          useNativeDriver: false,
        }).start();
        setKeyboardOpen(false);
      },
    );

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  // Group messages by date
  const groupMessagesByDate = (messages: any[]) => {
    if (!messages || messages.length === 0) {return [];}

    const sorted = [...messages].sort(
      (a, b) => moment(a.datetime).valueOf() - moment(b.datetime).valueOf(),
    );

    const grouped: any[] = [];
    let lastDate = '';

    sorted.forEach(msg => {
      const msgDate = moment(msg.datetime).format('YYYY-MM-DD');
      if (msgDate !== lastDate) {
        grouped.push({type: 'date', date: msgDate});
        lastDate = msgDate;
      }
      grouped.push({...msg, type: 'message'});
    });

    return grouped.reverse(); // for FlatList inverted
  };

  const getDateLabel = (date: string) => {
    const now = moment();
    const msgDate = moment(date);

    if (msgDate.isSame(now, 'day')) {return 'Today';}
    if (msgDate.isSame(now.clone().subtract(1, 'day'), 'day')) {return 'Yesterday';}

    return msgDate.format('MMM D, YYYY');
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: inset.top,
        backgroundColor: Colors.orangeColor,
        paddingBottom: inset.bottom,
      }}>
      {/* Top Bar */}
      <View style={styles.topBarContainer}>
        <View style={styles.row}>
          <FastImage
            source={{uri: `${imgBaseurl}${astroProfile}`}}
            style={styles.avatar}
          />
          <Text style={styles.astroName}>{astrologerName || 'Chat'}</Text>
        </View>
      </View>

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
          <TouchableOpacity
            onPress={() => {}}
            style={{marginLeft: 8}}>
            <Ionicons name="send" size={24} color="#0084ff" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

export default ChatHistory;

const styles = StyleSheet.create({
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
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
