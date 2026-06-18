import {Colors, Fonts, Images, Sizes} from '@/assets';
import {
  Image,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Keyboard,
  Platform,
} from 'react-native';
import {ThemedText} from '@/components/ThemedText';
import React, {useEffect, useState} from 'react';
import CountryCodeSelector from '@/components/CountryCodeSelector';
import Spacing from '@/components/Spacing';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {normalize, verticalScale} from '@/utils/normalize';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/redux/store';
import CommonButton from '@/components/CommonButton';
import {updateLoginType} from '@/redux/slices/loginOrRegisterSlice';
import {ToastMessage} from '@/utils/helper';
import {SafeAreaView} from 'react-native-safe-area-context';
import LoaderModal from '@/components/LoaderModal';
import {useSendOTPMutation} from '@/redux/services/authService';
import FastImage from 'react-native-fast-image';

const {width, height} = Dimensions.get('window');

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const loginWithMobile = useSelector(
    (state: RootState) => state.loginOrRegister.loginWithMobile,
  );
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [loginAppUser, loginAppUserRes] = useSendOTPMutation();
  const phoneNumberRef = React.useRef('');
  // Update ref whenever phoneNumber state changes
  useEffect(() => {
    phoneNumberRef.current = mobile;
  }, [mobile]);

  const handleTextChange = (text: string) => {
    if (/^\d*$/.test(text) && loginWithMobile) {
      setMobile(text);
    }
    if (!loginWithMobile) {
      setEmail(text);
    }
  };
  const handleLoginType = () => {
    if (loginWithMobile) {
      setMobile('');
    } else {
      setEmail('');
    }
    dispatch(updateLoginType());
  };

  const handlePressLogin = async () => {
    if (loginWithMobile) {
      if (mobile.length < 10) {
        ToastMessage('Please enter a valid mobile number');
        return;
      }
      const data = {
        contactNo: phoneNumberRef.current,
        countryCode: '91',
        type: 'P',
      };
      try {
        const res = await loginAppUser(data).unwrap();
        if (res.status == 200) {
          navigation.navigate('verify', {
            phoneNumber: phoneNumberRef.current,
            title: 'Verify Phone',
            loginTypeValue: `+91-${phoneNumberRef.current}`,
            loginOTP: res.otp,
          });
        }
        } catch (error: any) {
          console.log('Error::', error);
          const errorMsg =
          error?.data?.error?.contactNo?.[0] ||
          error?.data?.message ||
          error?.message ||
          'Something went wrong. Please try again.';

        ToastMessage(errorMsg);
        }
    } else {
      if (!email.includes('@') || !email.includes('.')) {
        ToastMessage('Please enter a valid email address');
        return;
      }
      navigation.navigate('verify', {
        title: 'Verify Email',
        loginTypeValue: email,
      });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated barStyle={'dark-content'} />
      <ScrollView
        contentContainerStyle={{flex: 1, justifyContent: 'space-between'}}>
        <View>
          <TouchableOpacity
            onPress={() => navigation.replace('drawer', {screen: 'tab'})}
            style={styles.skipLink}>
            <ThemedText type="link" style={styles.linkStyle}>
              {t('Skip')}
            </ThemedText>
          </TouchableOpacity>
          <View style={styles.topContainer}>
            <View style={styles.logoContainer}>
              <FastImage source={Images.AppLogo3D} style={styles.logo} />
            </View>
            <ThemedText style={{color: Colors.blackColor}} type="subtitle">
              {t('Greeting')}
            </ThemedText>
            <ThemedText style={{color: Colors.blackColor}} type="default">
              {t('Consult Astrologers, Real Answers!')}
            </ThemedText>
          </View>
          <Spacing height={normalize(22)} />
          <View style={[styles.bottomContainer]}>
            <View style={styles.inputContainer}>
              {loginWithMobile ? (
                <CountryCodeSelector />
              ) : (
                <Ionicons
                  name="mail-open"
                  size={24}
                  color={Colors.whiteColor}
                  style={{paddingHorizontal: 12}}
                />
              )}
              <View style={styles.inputSeperator} />
              <TextInput
                style={styles.input}
                placeholder={
                  loginWithMobile ? t('Phone number') : t('Email Address')
                }
                placeholderTextColor={Colors.colorGrey}
                keyboardType={loginWithMobile ? 'number-pad' : 'email-address'}
                maxLength={loginWithMobile ? 10 : 50}
                value={loginWithMobile ? mobile : email}
                onChangeText={handleTextChange}
              />
            </View>
            <Spacing height={verticalScale(12)} />
            <CommonButton
              label={t('SEND OTP')}
              onPress={() => {
                handlePressLogin();
                // STEP 4: Start authentication flow when user clicks continue
                // headlessModule.decimateAll();
                if (mobile.trim()) {
                  Keyboard.dismiss();

                  // Create request object with phone number and country code
                  // const request = {
                  //   phone: mobile.trim(),
                  //   countryCode: '91',
                  // };

                  // Initiate authentication with OTPless
                  // headlessModule.start(request);
                  // setLoading(true);
                }
              }}
            />
            <ThemedText
              type="small"
              style={{width: '92%', color: Colors.colorGrey}}>
              {t('By signing up, you agree to our ')}
              <ThemedText
                onPress={() => navigation.navigate('term-condition')}
                type="small"
                style={{
                  textDecorationLine: 'underline',
                  color: Colors.colorGrey,
                }}>
                {t('Terms of use')}
              </ThemedText>{' '}
              &
              <ThemedText
                onPress={() => navigation.navigate('privacy-policy')}
                type="small"
                style={{
                  textDecorationLine: 'underline',
                  color: Colors.colorGrey,
                }}>
                {t(' Privacy')} {t('Policy')}.
              </ThemedText>
            </ThemedText>
            {/* <TouchableOpacity activeOpacity={0.7} onPress={handleLoginType}>
            <ThemedText type="link" style={styles.linkStyle}>
              {loginWithMobile
                ? t('Sign in with Email')
                : t('Sign in with Mobile')}
            </ThemedText>
          </TouchableOpacity> */}
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.gmailLoginButton}>
              <Image
                source={Images.gmail}
                style={{
                  height: verticalScale(Sizes.large),
                  width: verticalScale(Sizes.large),
                  resizeMode: 'contain',
                }}
              />
              <Text style={styles.gmailLoginText}>Continue with Gmail</Text>
            </TouchableOpacity>
            {/* <View style={styles.offerContainer}>
            <View style={[styles.triangle, styles.arrowRight]} />
            <Text style={styles.offerText}>First Chat Free on Signup</Text>
            <View style={[styles.triangle, styles.arrowLeft]} />
          </View> */}
          </View>
        </View>

        <View style={[styles.boxMainContainer]}>
          <View>
            <View style={styles.boxContainer}>
              <Image
                source={Images.confidential}
                style={styles.boxImageStyle}
              />
            </View>
            <Text style={styles.boxTextStyle}>Private &{'\n'}Confidential</Text>
          </View>
          <View>
            <View style={styles.boxContainer}>
              <Image
                source={Images.verifiedAccount}
                style={styles.boxImageStyle}
              />
            </View>
            <Text style={styles.boxTextStyle}>Verified{'\n'}Astrologers</Text>
          </View>
          <View>
            <View style={styles.boxContainer}>
              <Image source={Images.payment} style={styles.boxImageStyle} />
            </View>
            <Text style={styles.boxTextStyle}>Secure{'\n'}Payments</Text>
          </View>
        </View>
        {loginAppUserRes?.isLoading && (
          <LoaderModal loading={loginAppUserRes?.isLoading} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  topContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  bottomContainer: {
    backgroundColor: Colors.whiteColor,
    alignItems: 'center',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: Colors.colorGrey,
    marginHorizontal: 12,
    paddingHorizontal: 6,
    paddingVertical: normalize(0),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    height: verticalScale(36),
  },
  input: {
    flex: 1,
    fontFamily: Fonts.medium,
    fontSize: normalize(Sizes.xmedium),
    marginLeft: normalize(6),
    includeFontPadding: false,
    color: Colors.blackColor,
  },
  inputSeperator: {
    borderLeftWidth: 0.5,
    height: verticalScale(28),
    width: 0,
    borderColor: Colors.colorGrey,
  },
  logoContainer: {
    width: verticalScale(185),
    height: verticalScale(185),
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  linkStyle: {
    textDecorationLine: 'underline',
    color: Colors.blackColor,
  },
  skipLink: {
    textAlign: 'right',
    alignSelf: 'flex-end',
    marginRight: 16,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
  },
  arrowLeft: {
    borderTopWidth: normalize(22),
    borderRightWidth: normalize(22),
    borderBottomWidth: normalize(22),
    borderLeftWidth: 0,
    borderTopColor: 'transparent',
    borderRightColor: Colors.whiteColor,
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  arrowRight: {
    borderTopWidth: normalize(22),
    borderRightWidth: 0,
    borderBottomWidth: normalize(22),
    borderLeftWidth: normalize(22),
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: Colors.whiteColor,
  },
  offerContainer: {
    backgroundColor: Colors.lightRedColor,
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    margin: Sizes.small,
    flexDirection: 'row',
  },
  offerText: {
    color: Colors.whiteColor,
    fontSize: normalize(17),
    fontFamily: Fonts.medium,
  },
  gmailLoginButton: {
    borderWidth: 1,
    borderColor: Colors.colorGrey,
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: normalize(8),
    borderRadius: Sizes.extraLarge,
    paddingVertical: normalize(Sizes.base - 2),
    marginTop: normalize(24),
  },
  gmailLoginText: {
    color: Colors.blackColor,
    fontSize: normalize(Sizes.xmedium),
    fontFamily: Fonts.medium,
    marginLeft: normalize(6),
  },
  boxContainer: {
    width: verticalScale(width * 0.2),
    height: verticalScale(60),
    padding: Sizes.base,
    backgroundColor: Colors.lightGrey,
    borderRadius: 4,
  },
  boxTextStyle: {
    color: Colors.blackColor,
    fontSize: normalize(Sizes.small),
    fontFamily: Fonts.regular,
    textAlign: 'center',
  },
  boxImageStyle: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  boxMainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
