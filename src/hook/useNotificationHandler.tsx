import {useEffect, useRef, useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import {playSound} from '@/utils/helper';

// Must be registered at module level (outside any component/hook)
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Notification received in background (user):', remoteMessage);
});

export const useNotificationHandler = () => {
  const lastNotificationId = useRef<any>(null);
  const lastNotificationTime = useRef<number>(0);

  const [notificationData, setNotificationData] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const id = remoteMessage?.messageId || remoteMessage?.data?.id;
      const now = Date.now();

      console.log('Notify ', remoteMessage);

      // Prevent duplicates (same ID or within 2s)
      if (
        id &&
        id === lastNotificationId.current &&
        now - lastNotificationTime.current < 2000
      ) {
        console.log('Duplicate notification ignored:', id);
        return;
      }

      lastNotificationId.current = id || null;
      lastNotificationTime.current = now;

      try {
        const rawData = remoteMessage.data?.data_noti;
        let parsed = rawData;

        if (typeof rawData === 'string') {
          parsed = JSON.parse(rawData);
        }

        setNotificationData(parsed);

        // Only play sound for chat-accepted notifications
        if (typeof remoteMessage?.data?.message === 'string') {
          const message = remoteMessage.data.message;
          const pattern = /chat.*accept|accept.*chat/i;
          if (pattern.test(message)) {
            playSound('livechat.mp3');
          }
        }
      } catch (e) {
        console.log('Error parsing data_noti:', e);
      }
    });

    return () => unsubscribe();
  }, []);

  return {notificationData, setNotificationData};
};
