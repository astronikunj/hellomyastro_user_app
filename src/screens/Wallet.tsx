import {
  Alert,
  Button,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, Fonts, Images, Sizes} from '@/assets';
import {normalize, verticalScale} from '@/utils/normalize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ThemedText} from '@/components/ThemedText';
import Spacing from '@/components/Spacing';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/redux/store';
import {
  useAddAmountInWalletMutation,
  useGetPaymentAmountMutation,
  useGetUserDetailMutation,
} from '@/redux/services/astroService';
import LoaderModal from '@/components/LoaderModal';
import CommonButton from '@/components/CommonButton';
import {WebView} from 'react-native-webview';
import ToastMessage from '@/components/ToastMessage';
import Modal from 'react-native-modal';
import {updateUser} from '@/redux/slices/authSlice';
import FastImage from 'react-native-fast-image';

type Props = {};

const {width, height} = Dimensions.get('window');

const Wallet = (props: Props) => {
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();
  const dispatch = useDispatch();
  const [selectedAmounId, setSelectedAmountId] = useState<any>(null);
  const {user} = useSelector((state: RootState) => state.auth);
  const [paymentAmountsList, setPaymentAmountsList] = useState<any[]>([]);
  const [getPayment, getPaymentRes] = useGetPaymentAmountMutation();
  const [addAmountToWallet] = useAddAmountInWalletMutation();
  const [paymentUrl, setPaymentUrl] = useState<any>();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [getUserDetails] = useGetUserDetailMutation();

  React.useEffect(() => {
    getPaymentAmount();
  }, []);
  const getPaymentAmount = () => {
    getPayment('')
      .unwrap()
      .then(res => {
        console.log('Payment Amount:', res);
        const val = [...res.recordList];
        setPaymentAmountsList(val.reverse());
        setSelectedAmountId(res.recordList[0]);
      })
      .catch(err => {
        console.error('Error fetching payment amount:', err);
      });
  };
  const makePayment = () => {
    if (selectedAmounId == null) {
      ToastMessage({message: 'Please select a Recharge amount!'});
      return;
    }
    const amountWithGst = (
      selectedAmounId.amount +
      (selectedAmounId.amount * 18) / 100
    ).toFixed(2);
    const cashbackAmount =
      parseInt(selectedAmounId.amount.toString()) *
      (parseInt(selectedAmounId.cashback.toString()) / 100);

    const finalCashback = Math.floor(cashbackAmount); // same as .toInt()
    const body = {
      userId: user?.id,
      amount: amountWithGst,
      cashback_amount: finalCashback,
    };
    addAmountToWallet(body)
      .unwrap()
      .then(res => {
        if (res.status == 200) {
          setPaymentUrl(res?.url);
          setShowPaymentModal(true);
        }
      });
  };
  const webViewRef = React.useRef(null);

  const updateUserWallet = async () => {
    try {
      const res = await getUserDetails('').unwrap();
      if (res.status == 200) {
        dispatch(updateUser({user: res.userDetails}));
      } else if ((res.status = -401)) {
        Alert.alert('Warning', 'Login Again');
      } else {
        Alert.alert('Warning!', 'Something wrong try after sometimes.');
      }
    } catch (error) {}
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.whiteColor,
        paddingTop: inset.top,
        paddingBottom: inset.bottom,
      }}>
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <View style={styles.leftContainer}>
            <Ionicons
              name="arrow-back"
              size={verticalScale(Sizes.medium)}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.headerText}>Add money to wallet</Text>
          </View>
          <View style={styles.rightContainer}>
            <View style={{flexDirection: 'row', gap: normalize(Sizes.base)}}>
              <Ionicons
                name="wallet-outline"
                color={Colors.colorGrey}
                size={verticalScale(Sizes.medium)}
              />
              <View style={styles.walletContainer}>
                <Text
                  style={
                    styles.walletText
                  }>{`\u20B9 ${user?.totalWalletAmount || 0}`}</Text>
              </View>
            </View>
          </View>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}
          keyboardVerticalOffset={
            Platform.OS === 'ios' ? verticalScale(60) : 0
          }>
          <ScrollView contentContainerStyle={{flex: 1}}>
            <ThemedText
              type="subtitle"
              style={{
                color: Colors.blackColor,
                textTransform: 'capitalize',
                padding: Sizes.base,
              }}>
              Recharge your wallet
            </ThemedText>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginHorizontal: Sizes.base,
              }}>
              {paymentAmountsList?.map(item => (
                <TouchableOpacity
                  onPress={() => setSelectedAmountId(item)}
                  key={item?.id}
                  style={amountContainerStyle(selectedAmounId, item).container}>
                  <Text
                    style={styles.amountText}>{`\u20B9 ${item?.amount}`}</Text>
                  {item?.cashback > 0 && (
                    <View
                      style={
                        amountContainerStyle(selectedAmounId, item)
                          .offerContainer
                      }>
                      <Text
                        style={
                          amountContainerStyle(selectedAmounId, item).offerText
                        }>
                        {`Get ${item?.cashback}% EXTRA`}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
            <Spacing height={verticalScale(Sizes.small)} />
            <View>
              <ThemedText
                type="subtitle"
                style={{
                  color: Colors.blackColor,
                  padding: normalize(Sizes.base),
                }}>
                Coupons & Offers
              </ThemedText>
              <View style={styles.inputWrapper}>
                <TextInput
                  placeholder="Enter Coupon Code"
                  placeholderTextColor={Colors.colorGrey}
                  style={styles.input}
                />
                <TouchableOpacity activeOpacity={0.7} style={styles.button}>
                  <ThemedText type="default" style={{color: Colors.whiteColor}}>
                    Apply
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.orderDetailContainer}>
              <Text style={styles.heading}>Your Order</Text>
              <View style={styles.row}>
                <Text style={styles.h1Text}>Plan Value</Text>
                <Text
                  style={[
                    styles.h1Text,
                  ]}>{`\u20B9 ${selectedAmounId?.amount}`}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.h1Text}>18% GST(+)</Text>
                <Text style={[styles.h1Text]}>{`\u20B9 ${
                  (selectedAmounId?.amount * 18) / 100
                }`}</Text>
              </View>
              <View
                style={{
                  width: '100%',
                  borderTopWidth: 0.3,
                  borderColor: Colors.colorGrey,
                  marginTop: normalize(12),
                }}
              />
              <View style={styles.row}>
                <Text style={[styles.h1Text, styles.h1Amt]}>Total Amount</Text>
                <Text style={[styles.h1Text, styles.h1Amt]}>{`\u20B9 ${(
                  selectedAmounId?.amount +
                  (selectedAmounId?.amount * 18) / 100
                ).toFixed(2)}`}</Text>
              </View>
              <Spacing height={normalize(12)} />
              <View style={styles.offerDetail}>
                <FastImage
                  source={Images.Funding}
                  style={{
                    height: normalize(38),
                    width: normalize(38),
                    marginRight: normalize(16),
                  }}
                />
                <View>
                  <Text style={styles.offerPercentage}>
                    Get {selectedAmounId?.cashback}% Extra
                  </Text>
                  <Text style={styles.cashbackAmt}>
                    {'\u20B9'}
                    {(
                      parseInt(selectedAmounId?.amount.toString()) *
                      (parseInt(selectedAmounId?.cashback.toString()) / 100)
                    ).toFixed(2)}{' '}
                    cashback
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      <View>
        <CommonButton
          label={`Proceed To Pay \u20B9 ${(
            selectedAmounId?.amount +
            (selectedAmounId?.amount * 18) / 100
          ).toFixed(2)}`}
          onPress={makePayment}
          buttonStyle={{alignSelf: 'center'}}
          buttonTextStyle={{fontFamily: Fonts.medium}}
        />
      </View>
      <Modal
        isVisible={showPaymentModal}
        animationIn="slideInUp"
        animationOut={'slideInDown'}
        style={{flex: 1, padding: 0, margin: 0}}
        coverScreen={true}
        onBackButtonPress={() => setShowPaymentModal(false)}
        >
        <View style={{flex: 1}}>
          {/* <Button
            title="Close"
            onPress={() => setShowPaymentModal(false)}
            color={Colors.blackColor}
          /> */}
          {paymentUrl && (
            <WebView
              ref={webViewRef}
              source={{uri: paymentUrl}}
              style={{flex: 1}}
              sharedCookiesEnabled={true}
              thirdPartyCookiesEnabled={true}
              cacheEnabled={true}
              incognito={false}
              domStorageEnabled={true}
              onLoadStart={({nativeEvent}) => {
                console.log('Start URL: ', nativeEvent.url);
              }}
              onLoadEnd={({nativeEvent}) => {
                console.log('Loaded URL: ', nativeEvent.url);
                if (nativeEvent.url.includes('payment-success')) {
                  Alert.alert('Payment', 'Payment Success!');
                  setShowPaymentModal(false); // modal close
                  updateUserWallet();
                }
                if (nativeEvent.url.includes('payment-failed')) {
                  Alert.alert('Payment', 'Payment Failed!');
                  setShowPaymentModal(false);
                }
              }}
              // ✅ JS handler equivalent
              injectedJavaScript={`
            window.postMessage = window.ReactNativeWebView.postMessage;
          `}
              onMessage={event => {
                console.log('Message from WebView:', event.nativeEvent.data);
                if (event.nativeEvent.data === 'PaymentSuccess') {
                  Alert.alert('Payment', 'Payment Success!');
                  setShowPaymentModal(false);
                }
                if (event.nativeEvent.data === 'PaymentFailed') {
                  Alert.alert('Payment', 'Payment Failed!');
                  setShowPaymentModal(false);
                }
              }}
            />
          )}
        </View>
      </Modal>
      <LoaderModal loading={getPaymentRes?.isLoading} />
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(Sizes.base),
  },
  walletContainer: {
    backgroundColor: '#1fe045',
    paddingVertical: Sizes.base / 2,
    paddingHorizontal: Sizes.base,
    borderRadius: 4,
  },
  walletText: {
    color: Colors.blackColor,
    fontSize: normalize(Sizes.small),
    fontFamily: Fonts.medium,
    includeFontPadding: false,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.whiteColor,
    padding: normalize(10),
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.whiteColor,
  },
  headerText: {
    color: Colors.blackColor,
    fontSize: normalize(Sizes.medium),
    fontFamily: Fonts.medium,
    paddingStart: normalize(Sizes.base),
    includeFontPadding: false,
  },
  amountText: {
    textAlign: 'center',
    color: Colors.blackColor,
    fontFamily: Fonts.medium,
    fontSize: normalize(16),
    paddingBottom: Sizes.base,
    includeFontPadding: false,
  },
  input: {
    color: Colors.blackColor,
    flex: 1,
    fontFamily: Fonts.medium,
    fontSize: normalize(Sizes.xmedium),
    textTransform: 'uppercase',
    includeFontPadding: false,
  },
  button: {
    backgroundColor: Colors.colorOrange,
    paddingHorizontal: Sizes.large,
    paddingVertical: 4,
    borderRadius: 8,
  },
  inputWrapper: {
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: Sizes.base,
    paddingVertical: 2,
    marginHorizontal: Sizes.small,
    alignItems: 'center',
    borderRadius: Sizes.base - 2,
    borderColor: Colors.colorGrey,
    height: verticalScale(45),
  },
  h1Text: {
    fontSize: normalize(14.5),
    color: Colors.colorGrey,
    fontFamily: Fonts.medium,
    includeFontPadding: false,
    lineHeight: normalize(22),
  },
  h1Amt: {
    color: Colors.blackColor,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: normalize(12),
  },
  heading: {
    fontSize: normalize(18),
    color: Colors.blackColor,
    fontFamily: Fonts.semibold,
    includeFontPadding: false,
    lineHeight: normalize(22),
  },
  orderDetailContainer: {
    flex: 1,
    borderWidth: 0.3,
    borderColor: Colors.colorGrey,
    margin: normalize(12),
    padding: normalize(12),
    borderRadius: normalize(12),
    backgroundColor: Colors.whiteColor,
  },
  offerDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(10),
    borderRadius: normalize(8),
  },
  offerPercentage: {
    backgroundColor: Colors.greenColor,
    color: Colors.whiteColor,
    fontFamily: Fonts.medium,
    includeFontPadding: false,
    lineHeight: normalize(22),
    textAlign: 'center',
    paddingVertical: normalize(2),
    borderRadius: normalize(24),
  },
  cashbackAmt: {
    color: Colors.blackColor,
    fontFamily: Fonts.medium,
    includeFontPadding: false,
    lineHeight: normalize(22),
  },
});

const amountContainerStyle = (selectedAmounId?: number, itemId?: number) =>
  StyleSheet.create({
    container: {
      width: width / 3 - 16,
      height: verticalScale(60),
      margin: 5,
      borderWidth: itemId == selectedAmounId ? 2 : 1,
      borderColor:
        itemId == selectedAmounId ? Colors.colorOrange : Colors.colorGrey,
      justifyContent: 'center',
      borderRadius: 8,
      overflow: 'hidden',
    },
    offerContainer: {
      backgroundColor:
        itemId == selectedAmounId ? Colors.colorOrange : '#b4d8a6',
      position: 'absolute',
      bottom: 0,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 2,
    },
    offerText: {
      color: itemId == selectedAmounId ? Colors.whiteColor : Colors.blackColor,
      fontFamily: Fonts.medium,
      fontSize: normalize(11.5),
      includeFontPadding: false,
    },
  });
