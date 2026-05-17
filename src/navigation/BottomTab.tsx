import CallAstroScreen from '@/screens/CallAstrologers';
import ChatsAstrologer from '@/screens/ChatAstrologers';
import HomeScreen from '@/screens/Home';
import LiveAstrologers from '@/screens/LiveAstrologers';
import RemediesScreen from '@/screens/Remedies';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomTabBar from './CustomTabBar';
import Profile from '@/screens/Profile';
import UnlimitedAstrologers from '@/screens/unlimited_chats/UnlimitedAstrologers';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <CustomTabBar {...props} />}
      >
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="chat-astrologer" component={ChatsAstrologer} />
      <Tab.Screen name="live-astrologers" component={UnlimitedAstrologers} />
      <Tab.Screen name="audio-call" component={CallAstroScreen} />
      <Tab.Screen name="remedies" component={RemediesScreen} />
			{/* <Tab.Screen name='profile' component={Profile} /> */}
    </Tab.Navigator>
  );
};

export default BottomTab;
