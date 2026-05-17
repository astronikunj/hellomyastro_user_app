import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather'
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '@/redux/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Colors, Fonts, Images} from '@/assets';
import {normalize, verticalScale} from '@/utils/normalize';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PermissionsAndroid} from 'react-native';
import {initializeFireBaseApp} from '@/utils/helper';
import {RootState} from '@/redux/store';

const CustomDrawerContent = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const inset = useSafeAreaInsets();
  const user = useSelector((state: any) => state.auth.user);
  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const social_media = [
    {
      id: 1,
      icon: 'logo-instagram',
      url: 'https://www.instagram.com/hellomyastro?utm_source=qr&igsh=dDlncXA5YjhzcGt2',
    },
    {
      id: 2,
      icon: 'logo-facebook',
      url: 'https://www.facebook.com/share/1MTvzdAEvy/',
    },
    {
      id: 3,
      icon: 'logo-youtube',
      url: 'https://www.youtube.com/',
    },
  ];

  React.useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );

    initializeFireBaseApp()
      .then(token => {
      })
      .catch(error => {
        console.error('Firebase initialization error:', error);
      });
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    dispatch(logout());
    navigation.reset({index: 0, routes: [{name: 'login'}]});
  };

  const handleNavigate = (screen: string) => {
    if (isLoggedIn) {
      navigation.navigate('drawer', {screen: screen});
    } else {
      navigation.reset({index: 0, routes: [{name: 'login'}]});
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.container,
        {paddingBottom: inset.bottom, paddingTop: inset.top},
      ]}>
      {/* Top Section */}
      <View style={styles.profileSection}>
        <Image source={Images.imagePlaceholder} style={styles.avatar} />
        <View>
          <Text style={styles.name}>{user?.name || 'Guest'}</Text>
          <Text style={styles.phone}>{user?.contactNo || '+91XXXXXXXXXX'}</Text>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menu}>
        <MenuItem
          icon="person-outline"
          label="My Profile"
          onPress={() => handleNavigate('userprofile')}
        />
        <MenuItem
          icon="notifications-outline"
          label="Notifications"
          onPress={() => navigation.navigate('notifications')}
        />
        <MenuItem
          icon="wallet-outline"
          label="Wallet Balance"
          badge={`₹ ${user?.totalWalletAmount || 0}`}
          onPress={() => {
            if (isLoggedIn) {
              // navigation.navigate('wallet');
              Alert.alert('Message', 'This service is not available right now!')
            } else {
              navigation.reset({index: 0, routes: [{name: 'login'}]});
            }
          }}
        />
        <MenuItem
          icon="receipt-outline"
          label="Order History"
          onPress={() => handleNavigate('history')}
        />
        <MenuItem
          icon="medical-outline"
          label="Free Services"
          onPress={() => {}}
        />
        <MenuItem
          icon="people-outline"
          label="My Following"
          onPress={() => handleNavigate('followedAstro')}
        />
        <MenuItem
          icon="headset-outline"
          label="Astrologer Assistant"
          onPress={() => {
            if (isLoggedIn) {
              navigation.navigate('drawer', {
                screen: 'support',
                params: {initialTab: 'assistant'},
              });
            } else {
              navigation.reset({index: 0, routes: [{name: 'login'}]});
            }
          }}
        />
        <MenuItem
          icon="call-outline"
          label="Customer Support"
          onPress={() => {
            if (isLoggedIn) {
              navigation.navigate('drawer', {
                screen: 'support',
                params: {initialTab: 'customer'},
              });
            } else {
              navigation.reset({index: 0, routes: [{name: 'login'}]});
            }
          }}
        />
        <MenuItem
          icon="megaphone-outline"
          label="Refer & Earn ₹100"
          onPress={() => handleNavigate('refer')}
        />
        {/* <MenuItem
          icon="star-outline"
          label="Insta Points"
          badge="⭐ 10"
          onPress={() => handleNavigate('points')}
        /> */}
        {/* <MenuItem
          icon="language-outline"
          label="Choose Language"
          onPress={() => handleNavigate('language')}
        /> */}
        <MenuItem
          icon="thumbs-up-outline"
          label="Rate Us"
          onPress={() => handleNavigate('rate')}
        />
        <MenuItem
          icon="share-social-outline"
          label="Share"
          onPress={() => handleNavigate('share')}
        />
        <MenuItem
          icon="settings-outline"
          label="Settings"
          onPress={() => navigation.navigate('setting')}
        />
        {/* <MenuItem
          icon="lock-closed-outline"
          label="Privacy Policy"
          onPress={() => navigation.navigate('privacy-policy')}
        />
        <MenuItem
          icon="document-text-outline"
          label="Terms & Conditions"
          onPress={() => navigation.navigate('term-condition')}
        />
        <MenuItemFeather
          icon="dollar-sign"
          label="Refund & Cancellation Policy"
          onPress={() => navigation.navigate('refund-policy')}
        />
        <MenuItem
          icon="log-out-outline"
          label="Logout"
          onPress={handleLogout}
        /> */}
        {/* {!isLoggedIn && <MenuItem
          icon="people-outline"
          label="Astrologer Login"
          onPress={() => navigation.navigate('drawer', {screen: 'astro-login'})}
        />} */}
      </View>

      {/* Social Icons */}
      <View style={styles.socialSection}>
        <View style={{flexDirection: 'row'}}>
          {social_media.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => Linking.openURL(item.url)}>
              <Ionicons
                name={item.icon}
                size={28}
                color={Colors.blackColor}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.followText}>
          Follow us and we will follow you back
        </Text>
        <Text style={styles.versionText}>Version :1.21.36</Text>
      </View>
    </ScrollView>
  );
};

const MenuItem = ({icon, label, onPress, badge}: any) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Ionicons name={icon} size={20} color="#000" style={{marginRight: 15}} />
    <Text style={styles.menuLabel}>{label}</Text>
    {badge && <Text style={styles.badge}>{badge}</Text>}
  </TouchableOpacity>
);

const MenuItemFeather = ({icon, label, onPress, badge}: any) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Feather name={icon} size={20} color="#000" style={{marginRight: 15}} />
    <Text style={styles.menuLabel}>{label}</Text>
    {badge && <Text style={styles.badge}>{badge}</Text>}
  </TouchableOpacity>
);

export default CustomDrawerContent;

const styles = StyleSheet.create({
  container: {flexGrow: 1, paddingVertical: 10},
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalize(18),
    backgroundColor: Colors.lightGrey,
    paddingHorizontal: normalize(10),
    gap: normalize(10),
  },
  avatar: {
    width: verticalScale(45),
    height: verticalScale(45),
    borderRadius: verticalScale(45) / 2,
    backgroundColor: '#ddd',
  },
  name: {
    fontSize: normalize(15),
    fontFamily: Fonts.semibold,
    marginTop: 8,
    color: Colors.blackColor,
  },
  phone: {
    fontSize: normalize(12),
    color: Colors.colorGrey,
    fontFamily: Fonts.regular,
    includeFontPadding: false,
  },
  menu: {
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12, // change it from 14 to 10
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
    position: 'relative',
  },
  menuLabel: {
    fontSize: normalize(14),
    flex: 1,
    color: Colors.blackColor,
    fontFamily: Fonts.medium,
    includeFontPadding: false,
  },
  badge: {
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    backgroundColor: '#00C853',
    color: '#fff',
    overflow: 'hidden',
  },
  socialSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  socialIcon: {
    marginHorizontal: 8,
    marginTop: 10,
  },
  followText: {
    fontSize: normalize(12),
    marginTop: 10,
    color: Colors.colorGrey,
    fontFamily: Fonts.regular,
    includeFontPadding: false,
  },
  versionText: {
    fontSize: 12,
    marginTop: 4,
    color: Colors.colorGrey,
  },
  logoutBtn: {
    flexDirection: 'row',
    backgroundColor: Colors.blackColor,
    margin: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    borderRadius: 10,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
    fontFamily: Fonts.medium,
  },
});
