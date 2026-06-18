import Toast from 'react-native-simple-toast';
import {doc, collection, writeBatch} from 'firebase/firestore';
import {db} from './firebaseConfig';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import firebase from '@react-native-firebase/app';
import {initializeApp} from '@react-native-firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import Sound from "react-native-sound";
export function formatDate(dateString: Date) {
  try {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  } catch (error) {}
}

export const extractTimeWithAMPM = (timestamp: Date) => {
  const date = new Date(timestamp);
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  return `${hours}:${minutes} ${ampm}`;
};

export const ToastMessage = (message: any) => {
  const finalMessage = typeof message === 'string' ? message : String(message || 'An error occurred');
  return Toast.show(finalMessage, Toast.LONG);
};

export const sendMessage = async (
  chatId: any,
  partnerId: any,
  msgModel: any,
  currentUserId: any,
) => {
  const userChatCollectionRef = collection(db, 'chats');
  try {
    const globalId = currentUserId;

    const refMessages = collection(
      db,
      'chats',
      chatId,
      'userschat',
      globalId,
      'messages',
    );

    const refMessages1 = collection(
      db,
      'chats',
      chatId,
      'userschat',
      partnerId,
      'messages',
    );

    const newMessage1 = {...msgModel};
    const newMessage2 = {...msgModel, isRead: false};

    const batch = writeBatch(db);

    const msgRef1 = doc(refMessages); // auto-id doc ref
    batch.set(msgRef1, newMessage1);

    const msgRef2 = doc(refMessages1); // auto-id doc ref
    batch.set(msgRef2, newMessage2);

    await batch.commit();
    console.log('Messages uploaded successfully');
  } catch (error) {
    console.log('Error sending message:', error);
    ToastMessage('Failed to send message');
  }
};

export const sendMessageToRNF = async (
  chatId: string,
  partnerId: string,
  msgModel: any,
  currentUserId: string,
) => {
  try {
    const chatIdStr = chatId.toString();
    const partnerIdStr = partnerId.toString();
    const currentUserIdStr = currentUserId.toString();
    await Promise.all([
      firestore()
        .collection('chats')
        .doc(chatIdStr)
        .collection('userschat')
        .doc(currentUserIdStr)
        .collection('messages')
        .add({...msgModel}),

      firestore()
        .collection('chats')
        .doc(chatIdStr)
        .collection('userschat')
        .doc(partnerIdStr)
        .collection('messages')
        .add({...msgModel}),
    ]);
  } catch (error) {
    console.error('Error sending message to RNF:', error);
    ToastMessage('Failed to send message');
  }
};

export function formatTime(dateTimeString: number): string {
  const seconds = dateTimeString;
  const date = new Date(seconds * 1000);
  const time = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  return time;
}

export const formatTimeer = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
};

export const initializeFireBaseApp = async () => {
  try {
    const firebaseConfig = {
      apiKey: 'AIzaSyBPQg54A5iQb3wRduZ82n4PJRGkLGcvUc0',
      projectId: 'hello-myastro',
      messagingSenderId: '887653457697',
      appId: '1:887653457697:android:c99ffacc1d0dee69516860',
    };
    if (!firebase.apps.length) {
      initializeApp(firebaseConfig);
    }
    const old_token = await AsyncStorage.getItem('fcm');
    console.log('check old token', old_token);
    if (old_token == null) {
      const token = await messaging().getToken();
      console.log('new token', token);
      await AsyncStorage.setItem('fcm', token);
      return token;
    } else {
      console.log('old token', old_token);
      return old_token;
    }
  } catch (error) {
    console.error('Error initializing Firebase app:', error);
  }
};

// export const showNotification = async () => {
//   try {
//     messaging().onMessage(async remoteMessage => {
//       console.log('Notification received in foreground:', remoteMessage);
//       Alert.alert('Notification', JSON.stringify(remoteMessage));
//     });
//     messaging().setBackgroundMessageHandler(async remoteMessage => {
//       console.log('Notification received in background:', remoteMessage);
//       Alert.alert('Notification', JSON.stringify(remoteMessage));
//     });
//     messaging()
//       .getInitialNotification()
//       .then(remoteMessage => {
//         if (remoteMessage) {
//           console.log(
//             'Notification caused app to open from quit state:',
//             remoteMessage,
//           );
//           Alert.alert('Notification', JSON.stringify(remoteMessage));
//         }
//       });
//   } catch (error) {
//     console.log('Error showing notification:', error);
//   }
// };



export const playSound = (filename: any) => {
	var whoosh = new Sound(filename, Sound.MAIN_BUNDLE, (error) => {
		if (error) {
			console.log('failed to load the sound', error);
			return;
		}
		// loaded successfully
		console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

		// Play the sound with an onEnd callback
		whoosh.play((success) => {
			if (success) {
				console.log('successfully finished playing');
			} else {
				console.log('playback failed due to audio decoding errors');
			}
		});
	});
}