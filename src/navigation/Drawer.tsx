import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTab from './BottomTab';
import CustomDrawerContent from './CustomDrawerContent';
import Notifications from '@/screens/Notifications';
import UserHistory from '@/screens/history';
import UserProfile from '@/screens/UserProfile';
import ReferAndEarn from '@/screens/ReferAndEarn';
import FollowedAstrologer from '@/screens/FollowedAstrologer';
import SupportScreen from '@/screens/CustomerSupport';
import AstroLogin from '@/screens/AstroLogin';

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  return (
    <Drawer.Navigator
    drawerContent={(props: any) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="tab" component={BottomTab} options={{headerShown: false}} />
      {/* <Drawer.Screen name='notifications' component={Notifications} options={{headerShown: false}} /> */}
      <Drawer.Screen name="history" component={UserHistory} options={{headerShown: false}} />
      <Drawer.Screen name="userprofile" component={UserProfile} options={{headerShown: false}} />
      <Drawer.Screen name="refer" component={ReferAndEarn} options={{headerShown: false}} />
      <Drawer.Screen name="followedAstro" component={FollowedAstrologer} options={{headerShown: false}} />
      <Drawer.Screen name="support" component={SupportScreen} options={{headerShown: false}} />
      <Drawer.Screen name="astro-login" component={AstroLogin} options={{headerShown: false}}  />
    </Drawer.Navigator>
  );
}
