import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {navigationRef} from './navigation/NavigationService';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NetInfo from '@react-native-community/netinfo';
import PopUp from './components/PopUp';
import Splash from './screens/Splash';
import LoginScreen from './screens/Login';
import VerifyOTP from './screens/Verify';
import SearchScreen from './screens/Search';
import Wallet from './screens/Wallet';
import MyDrawer from './navigation/Drawer';
import ShoppingScreen from './screens/Shopping';
import ProductDetail from './screens/ProductDetail';
import ChatForm from './screens/ChatIntakeForm';
import Profile from './screens/Profile';
import ChatScreen from './screens/chat/ChatScreen';
import ChatHistory from './screens/history/ChatHistory';
import BlogDetail from './screens/BlogDetail';
import Blogs from './screens/Blogs';
import {initI18n} from './i18n';
import {Colors} from './assets';
import {imgBaseurl} from './constants/constant';
import {useNotificationHandler} from './hook/useNotificationHandler';
import {useAcceptedChatMutation} from './redux/services/astroService';
import LoaderModal from './components/LoaderModal';
import PaymentScreen from './screens/PaymentScreen';
import {updateChatStartTime} from './redux/slices/globalSlice';
import {useDispatch} from 'react-redux';
import PrivacyPolicyScreen from './screens/PrivacyPolicy';
import TermsAndConditionsScreen from './screens/TermCondition';
import RefundPolicyScreen from './screens/RefundPolicy';
import messaging from '@react-native-firebase/messaging';
import Notifications from './screens/Notifications';
import SettingsScreen from './screens/Settings';
import RaiseTicket from './screens/RaiseTicket';
import { UnlimitedChatScreen } from './screens/unlimited_chats/UnlimitedChatScreen';

const Stack = createNativeStackNavigator();

const RootApp = () => {
  const [isConnected, setIsConnected] = React.useState<any>(true);
  const [showAcceptPopup, setShowAcceptPopup] = React.useState(false);
  const [acceptItem, setAcceptItem] = React.useState<any>(null);
  const {notificationData} = useNotificationHandler();
  const [acceptChat, acceptChatRes] = useAcceptedChatMutation();
  const dispatch = useDispatch<any>();

  React.useEffect(() => {
    // This fires when the app is opened from a background state
    const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage,
      );

      // Navigate to Notification screen here
      navigationRef.current?.navigate('notifications', {
        data: remoteMessage.data, // agar extra data bhejna hai
      });
    });

    // This handles when the app was completely closed
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
          );
          navigationRef.current?.navigate('notifications', {
            data: remoteMessage.data,
          });
        }
      });

    return unsubscribe;
  }, []);

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected && state.isInternetReachable !== false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  React.useEffect(() => {
    initI18n().then(() => {
      console.log('Translation ready...');
    });
  }, []);

  React.useEffect(() => {
    if (notificationData) {
      setAcceptItem(notificationData);
      setShowAcceptPopup(true);
    }
  }, [notificationData]);

  const handleAcceptChat = (
    chatId: string,
    astrologerId: string,
    astroProfile: string,
    astrologerName: string,
    chatDuration: string,
    chatType: string,
    astrologerUserId: Number
  ) => {
    console.log(
      chatId,
      astrologerId,
      astroProfile,
      astrologerName,
      chatDuration,
      chatType
    );
    const bodyContent = {chatId: chatId};
    acceptChat(bodyContent)
      .unwrap()
      .then(response => {
        console.log('Chat accepted successfully:', response);
        if (response.status == 200) {
          const time = Math.floor(Date.now() / 1000) + 2;
          dispatch(updateChatStartTime(time));
          setShowAcceptPopup(false);
          if(chatType == 'unlimited') {
            navigationRef.current?.navigate('unlimitedChat', {
            chatIdNoti: chatId,
            astrologerId: astrologerId,
            astroProfile: astroProfile,
            astrologerName: astrologerName,
            chatDuration: chatDuration,
            astrologerUserId: astrologerUserId,
          });
          } else {
            navigationRef.current?.navigate('chat', {
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
      })
      .finally(() => {
        setShowAcceptPopup(false);
      });
  };
  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="splash" component={Splash} />
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="verify" component={VerifyOTP} />
          <Stack.Screen name="search" component={SearchScreen} />
          <Stack.Screen name="wallet" component={Wallet} />
          <Stack.Screen name="drawer" component={MyDrawer} />
          <Stack.Screen name="notifications" component={Notifications} />
          <Stack.Screen name="shopping" component={ShoppingScreen} />
          <Stack.Screen name="productDetail" component={ProductDetail} />
          <Stack.Screen name="chatForm" component={ChatForm} />
          <Stack.Screen name="profile" component={Profile} />
          <Stack.Screen name="chat" component={ChatScreen} />
          <Stack.Screen name="chatHistory" component={ChatHistory} />
          <Stack.Screen name="blog" component={BlogDetail} />
          <Stack.Screen name="blogs" component={Blogs} />
          <Stack.Screen name="payment-screen" component={PaymentScreen} />
          <Stack.Screen name="privacy-policy" component={PrivacyPolicyScreen} />
          <Stack.Screen
            name="term-condition"
            component={TermsAndConditionsScreen}
          />
          <Stack.Screen name="refund-policy" component={RefundPolicyScreen} />
          <Stack.Screen name="setting" component={SettingsScreen} />
          <Stack.Screen name="raise-ticket" component={RaiseTicket} />
          <Stack.Screen name="unlimitedChat" component={UnlimitedChatScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      {!isConnected && (
        <PopUp
          isVisible={!isConnected}
          title="Internet Issue"
          description="Check your internet connection it is not working"
          showProfileImage={false}
        />
      )}
      <PopUp
        isVisible={showAcceptPopup}
        profileUrl={acceptItem?.body?.profile ? `${imgBaseurl}${acceptItem.body.profile}` : undefined}
        title={acceptItem?.title}
        description={acceptItem?.body?.description}
        buttons={[
          {
            label: 'Accept',
            onPress: () => {
              handleAcceptChat(
                acceptItem?.body?.chatId,
                acceptItem?.body?.astrologerId,
                acceptItem?.body?.profile,
                acceptItem?.body?.astrologerName,
                acceptItem?.body?.chat_duration,
                acceptItem?.body?.chatType,
                acceptItem?.body?.astrologerUserId,
              );
            },
            style: {backgroundColor: Colors.orangeColor},
            btnTextStyle: {color: Colors.blackColor},
          },
        ]}
      />
      {acceptChatRes?.isLoading && (
        <LoaderModal loading={acceptChatRes?.isLoading} />
      )}
    </>
  );
};

export default RootApp;
