import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Ref, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Colors, Fonts, Sizes} from '@/assets';
import {ThemedText} from '@/components/ThemedText';
import {normalize, verticalScale} from '@/utils/normalize';
import Spacing from '@/components/Spacing';
import CommonButton from '@/components/CommonButton';
import {initializeFireBaseApp, ToastMessage} from '@/utils/helper';
import {
  useVerifyOTPMutation,
  useSendOTPMutation,
} from '@/redux/services/authService';
import LoaderModal from '@/components/LoaderModal';
import {loginSuccess} from '@/redux/slices/authSlice';
import {useDispatch} from 'react-redux';
import {CommonActions, useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '@/components/Header';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar} from 'expo-status-bar';
import DeviceInfo from 'react-native-device-info';

type Props = {};

const VerifyOTP = (props: Props) => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const [verifyOTP, verifyOTPRes] = useVerifyOTPMutation();
  const [sendOTP, sendOTPRes] = useSendOTPMutation();
  const route = useRoute();
  const {title, loginTypeValue, phoneNumber, loginOTP} =
    route.params as {
      title?: string;
      loginTypeValue?: string;
      phoneNumber?: string;
      loginOTP?: number;
    };
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [currentOtp, setCurrentOtp] = useState<number | undefined>(loginOTP);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const ref1 = useRef<TextInput>(null);
  const ref2 = useRef<TextInput>(null);
  const ref3 = useRef<TextInput>(null);
  const ref4 = useRef<TextInput>(null);
  const [otp1, setOtp1] = useState('');
  const [otp2, setOtp2] = useState('');
  const [otp3, setOtp3] = useState('');
  const [otp4, setOtp4] = useState('');
  const [fcmToken, setFcmToken] = useState<any>('');

  useEffect(() => {
    initializeFireBaseApp()
      .then(token => {
        setFcmToken(token);
      })
      .catch(error => {
        console.error('Firebase initialization error:', error);
      });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (ref1.current !== null) {ref1.current.focus();}
    }, 500);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (secondsLeft > 0) {
      setIsResendEnabled(false);
      timer = setTimeout(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    } else {
      setIsResendEnabled(true);
    }

    return () => clearTimeout(timer);
  }, [secondsLeft]);

  useLayoutEffect(() => {
    if (title) {
      navigation.setOptions({
        headerTitle: title,
      });
    }
  }, [title]);

  const handleLoggedIn = async () => {
    const otp = otp1 + otp2 + otp3 + otp4;
    if (otp.length < 4) {
      ToastMessage('Please enter a valid OTP');
      return;
    }
    const contactDetail = loginTypeValue?.toString().split('-');
    if (contactDetail == undefined) {
      ToastMessage('Invalid contact details provided');
      return;
    }
    try {
      const response = await verifyOTP({
        contactNo: contactDetail[1],
        countryCode: contactDetail[0],
        otp: otp,
        type: 'P',
        userDeviceDetails: {
          deviceId: DeviceInfo.getDeviceId(),
          fcmToken: fcmToken,
          deviceLocation: 'India',
          deviceManufacturer: await DeviceInfo.getManufacturer(),
          deviceModel: DeviceInfo.getModel(),
          appVersion: DeviceInfo.getVersion(),
          appId: DeviceInfo.getBundleId(),
        },
      }).unwrap();
      console.log(response);
      if (response.success) {
        ToastMessage('Logged in successfully');
        await AsyncStorage.setItem('token', response.token);
        await AsyncStorage.setItem('userId', JSON.stringify(response.userDetails?.id) );
        dispatch(
          loginSuccess({user: response.userDetails, token: response.token}),
        );
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'drawer', // Your Drawer Navigator name
                state: {
                  index: 0,
                  routes: [
                    {
                      name: 'tab', // Your Tabs Navigator name inside Drawer
                      state: {
                        index: 0,
                        routes: [
                          {
                            name: 'home', // Final screen inside Tabs
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          }),
        );
      }
    } catch (error: any) {
      console.log('ERROR::', error);
      const errorData = error?.data;
      ToastMessage(errorData?.message);
    }
  };

  const handleResendOTP = async () => {
    if (!phoneNumber) {
      ToastMessage('Phone number is missing');
      return;
    }
    try {
      const data = {
        contactNo: phoneNumber,
        countryCode: '91',
        type: 'P',
      };
      const response = await sendOTP(data).unwrap();
      if (response.status === 200) {
        ToastMessage('OTP resent successfully');
        setCurrentOtp(response.otp);
        setSecondsLeft(60);
        // Clear previous input fields
        setOtp1('');
        setOtp2('');
        setOtp3('');
        setOtp4('');
        setTimeout(() => {
          ref1.current?.focus();
        }, 300);
      }
    } catch (error: any) {
      console.log('Resend Error::', error);
      const errorMsg =
        error?.data?.message ||
        error?.message ||
        'Failed to resend OTP. Please try again.';
      ToastMessage(errorMsg);
    }
  };

  return (
    <>
      <StatusBar animated backgroundColor={Colors.orangeColor} />
      <SafeAreaView style={styles.container}>
        <Header onPress={() => navigation.goBack()} title={title ?? 'Header'} />
        <Spacing height={Sizes.small} />
        <ThemedText type="subtitle" style={styles.title}>
          OTP sent to {loginTypeValue}
        </ThemedText>
        <View style={styles.pinInputContainer}>
          <TextInput
            ref={ref1}
            style={styles.inputStyle}
            keyboardType="number-pad"
            maxLength={1}
            value={otp1}
            onChangeText={text => {
              setOtp1(text);
              if (text.length > 0) ref2.current?.focus();
            }}
          />
          <TextInput
            ref={ref2}
            style={styles.inputStyle}
            keyboardType="number-pad"
            maxLength={1}
            value={otp2}
            onChangeText={text => {
              setOtp2(text);
              if (text.length > 0) ref3.current?.focus();
            }}
            onKeyPress={({nativeEvent}) => {
              if (nativeEvent.key === 'Backspace' && otp2 === '') {
                ref1.current?.focus();
              }
            }}
          />
          <TextInput
            ref={ref3}
            style={styles.inputStyle}
            keyboardType="number-pad"
            maxLength={1}
            value={otp3}
            onChangeText={text => {
              setOtp3(text);
              if (text.length > 0) ref4.current?.focus();
            }}
            onKeyPress={({nativeEvent}) => {
              if (nativeEvent.key === 'Backspace' && otp3 === '') {
                ref2.current?.focus();
              }
            }}
          />
          <TextInput
            ref={ref4}
            style={styles.inputStyle}
            keyboardType="number-pad"
            maxLength={1}
            value={otp4}
            onChangeText={text => {
              setOtp4(text);
            }}
            onKeyPress={({nativeEvent}) => {
              if (nativeEvent.key === 'Backspace' && otp4 === '') {
                ref3.current?.focus();
              }
            }}
          />
        </View>
        {/* <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          keyboardType="number-pad"
          value={otp}
          onChangeText={(text: string) => {
            setOtp(text);
            if (text.length === 6) {
              triggerOtpVerification(text);
            }
          }}
          maxLength={6}
        /> */}
        <Spacing height={Sizes.small} />
        {currentOtp && (
          <Text style={{textAlign: 'center', color: '#000'}}>{currentOtp}</Text>
        )}
        <CommonButton
          label="Verify OTP"
          onPress={() => {
            handleLoggedIn();
          }}
          buttonStyle={styles.buttonStyle}
        />
        {isResendEnabled ? (
          <TouchableOpacity activeOpacity={0.7} onPress={handleResendOTP}>
            <ThemedText type="link" style={styles.linkStyle}>
              Resend OTP
            </ThemedText>
          </TouchableOpacity>
        ) : (
          <ThemedText type="default" style={styles.resendLink}>
            {`Resend OTP (00:${secondsLeft} s)`}
          </ThemedText>
        )}
        <LoaderModal loading={verifyOTPRes?.isLoading || sendOTPRes?.isLoading} />
      </SafeAreaView>
    </>
  );
};

export default VerifyOTP;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: Colors.whiteColor,
  },
  title: {
    color: Colors.blackColor,
    textAlign: 'center',
    marginVertical: verticalScale(Sizes.small),
  },
  inputStyle: {
    borderWidth: 0.5,
    borderColor: Colors.colorGrey,
    backgroundColor: Colors.lightGrey,
    height: verticalScale(40),
    width: normalize(50),
    borderRadius: normalize(Sizes.base),
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: Colors.blackColor,
    fontSize: normalize(Sizes.medium),
  },
  pinInputContainer: {
    marginHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // gap: normalize(Sizes.medium),
    marginVertical: Sizes.small,
  },
  buttonStyle: {
    alignSelf: 'center',
    marginVertical: verticalScale(Sizes.small),
  },
  resendLink: {
    color: Colors.colorGrey,
    textAlign: 'center',
  },
  linkStyle: {
    textDecorationLine: 'underline',
    color: Colors.lightRedColor,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    width: 350,
    height: 50,
    padding: 10,
    marginTop: 10,
    fontWeight: '500',
    fontSize: 18,
    color: '#000',
    backgroundColor: '#ddd',
    alignSelf: 'center',
  },
  errorText: {
    color: '#FF5C5C',
    fontSize: 14,
    marginTop: 8,
    marginBottom: 16,
    textAlign: 'center',
  },
});
