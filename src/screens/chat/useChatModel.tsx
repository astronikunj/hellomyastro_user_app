import {formatTime, sendMessageToRNF} from '@/utils/helper';
import {useEffect, useState} from 'react';
import firestore, {Timestamp} from '@react-native-firebase/firestore';

interface Message {
  text: string;
  isSelf: boolean;
  time: string;
  datetime: any;
}

const useChatViewModel = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string>('');
  const [astrologerId, setAstrologerId] = useState<string>('');
  const [messageText, setMessageText] = useState('');
  const [chatId, setChatId] = useState<string>('');

  useEffect(() => {
    console.log('chatId:', chatId, 'astrologerId:', astrologerId, 'currentUserId:', currentUserId);
    // Guard: do not subscribe until all IDs are set
    if (!chatId || !astrologerId || !currentUserId) return;

    const unsubscribe = firestore()
      .collection('chats')
      .doc(chatId.toString())
      .collection('userschat')
      .doc(astrologerId.toString())
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        snapshot => {
          const newMessages: Message[] = [];
          snapshot.forEach(doc => {
            const data = doc.data();
            newMessages.push({
              text: data.message,
              isSelf: data.userId1 == currentUserId,
              time: formatTime(data.createdAt.seconds),
              datetime: data.createdAt.toDate(),
            });
          });
          setMessages(newMessages);
        },
        error => {
          console.error('Firestore snapshot error (user):', error);
        },
      );

    // ✅ Correct cleanup
    return unsubscribe;
  }, [chatId, currentUserId, astrologerId]);

  const sendMessage = async () => {
    if (messageText.trim().length === 0) return;

    const chatData = {
      message: messageText,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      isDelete: false,
      isRead: true,
      userId1: currentUserId?.toString(),
      userId2: astrologerId?.toString(),
      isEndMessage: false,
    };

    if (chatId && astrologerId && currentUserId) {
      await sendMessageToRNF(
        chatId.toString(),
        astrologerId.toString(),
        chatData,
        currentUserId.toString(),
      );
      setMessageText('');
    }
  };

  const sendChatEndMessage = async (message: string) => {
    const chatData = {
      message: message,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      isDelete: false,
      isRead: true,
      userId1: currentUserId?.toString(),
      userId2: astrologerId?.toString(),
      isEndMessage: true,
    };

    if (chatId && astrologerId && currentUserId) {
      await sendMessageToRNF(
        chatId.toString(),
        astrologerId.toString(),
        chatData,
        currentUserId.toString(),
      );
      setMessageText('');
    }
  };

  return {
    messages,
    messageText,
    setMessageText,
    sendMessage,
    setCurrentUserId,
    setAstrologerId,
    setChatId,
    sendChatEndMessage,
  };
};

export default useChatViewModel;
