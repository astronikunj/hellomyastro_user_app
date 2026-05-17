import {Alert, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Colors, Fonts, Images} from '@/assets';
import {useDispatch} from 'react-redux';
import {loginSuccess, updateUser} from '@/redux/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useGetUserDetailMutation} from '@/redux/services/astroService';
import FastImage from 'react-native-fast-image';
import {normalize, verticalScale} from '@/utils/normalize';

type Props = {};

const Splash = (props: Props) => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const [getUserDetails] = useGetUserDetailMutation();
  React.useEffect(() => {
    setTimeout(() => {
      checkLoginStatus();
    }, 2000);
  }, []);
  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      dispatch(loginSuccess({user: {}, token}));
      const res = await getUserDetails('').unwrap();
      console.log(res);
      if (res.status == 200) {
        dispatch(updateUser({user: res.userDetails}));
        navigation.replace('drawer', {screen: 'home'});
      } else if ((res.status = -401)) {
        navigation.replace('login');
      } else {
        Alert.alert('Warning!', 'Something wrong try after sometimes.');
      }
    } else {
      navigation.replace('login');
    }
  };
  return (
    <FastImage
      source={Images.splashBackground}
      resizeMode="cover"
      style={styles.container}>
      <View style={styles.logoWrapper}>
        <FastImage
          source={Images.AppLogo3D}
          style={{width: '100%', height: '100%'}}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.appName}>
        Hello<Text style={{color: Colors.colorOrange}}>My</Text>Astro
      </Text>
      <Text style={styles.moto}>Connecting you to what matters most</Text>
    </FastImage>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logoWrapper: {
    height: verticalScale(195),
    width: verticalScale(195),
  },
  moto: {
    fontSize: normalize(16),
    fontFamily: Fonts.medium,
    textAlign: 'center',
    color: Colors.blackColor,
  },
  appName: {
    fontSize: normalize(24),
    fontFamily: Fonts.bold,
    marginTop: 20,
    color: Colors.blackColor,
    includeFontPadding: false
  },
});
