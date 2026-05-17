import {Colors, Fonts, Images} from '@/assets';
import Header from '@/components/Header';
import Spacing from '@/components/Spacing';
import {normalize, verticalScale} from '@/utils/normalize';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ReferAndEarn = () => {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: inset.top,
          paddingBottom: inset.bottom,
        },
      ]}>
      <Header
        title="Refer and Earn Money"
        onPress={() => navigation.goBack()}
        headerStyle={{backgroundColor: '#FFF5DC'}}
      />

      {/* Title */}
      <Text style={styles.title}>Invite Friends & Earn ₹100</Text>

      {/* Steps */}
      <View style={styles.stepsContainer}>
        <View style={styles.step}>
          <View style={styles.iconWrapper}>
            <FastImage
              source={Images.OnlinePay}
              style={{height: '100%', width: '100%'}}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.stepText}>Invite a friend</Text>
        </View>
        {/* <Text style={styles.arrow}>→</Text> */}
        <FastImage
          source={Images.RightIcon}
          style={{height: verticalScale(24), width: verticalScale(24)}}
          resizeMode="contain"
        />
        <View style={styles.step}>
          <View style={styles.iconWrapper}>
            <FastImage
              source={Images.Flirt}
              style={{height: '100%', width: '100%'}}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.stepText}>Friend does recharge</Text>
        </View>
        <FastImage
          source={Images.RightIcon}
          style={{height: verticalScale(24), width: verticalScale(24)}}
          resizeMode="contain"
        />
        <View style={styles.step}>
          <View style={styles.iconWrapper}>
            <FastImage
              source={Images.Dollar}
              style={{height: '100%', width: '100%'}}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.stepText}>You get Rs 100</Text>
        </View>
      </View>

      {/* Referral Code */}
      <View style={styles.referralBox}>
        <Text style={styles.referralText}>Your referral code:</Text>
        <Text style={styles.referralCode}>FIRBE</Text>
      </View>
      <View
        style={{
          backgroundColor: Colors.whiteColor,
          width: '100%',
          height: '100%',
        }}>
        {/* Share on Whatsapp */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <TouchableOpacity style={styles.whatsappBtn}>
            <Ionicons name="logo-whatsapp" size={20} color="#fff" />
            <Text style={styles.whatsappText}> Share on WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderWidth: normalize(1),
              borderColor: Colors.colorGrey,
              padding: normalize(8),
              borderRadius: normalize(6),
            }}>
            <Ionicons name="share-social" size={normalize(22)} />
          </TouchableOpacity>
        </View>

        {/* Find Friends */}
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: '#333',
            borderRadius: normalize(8),
            alignSelf: 'center',
            width: '90%',
            paddingHorizontal: normalize(12),
          }}>
          <Text style={styles.findFriends}>
            Find Friends by sharing us your{' '}
            <Text style={styles.highlight}>Contacts List »</Text>
          </Text>
        </TouchableOpacity>

        {/* Terms & Conditions */}
        {/* <TouchableOpacity>
          <Text style={styles.terms}>Terms & Conditions →</Text>
        </TouchableOpacity> */}
        <Spacing height={14} />
        <View style={{paddingVertical: 12, paddingHorizontal: normalize(8)}}>
          <Text style={styles.term}>Terms & Conditions</Text>
          <Text style={styles.rule}>
            1. Your friend must sign up on HelloMyAstro using your refferal
            code.
          </Text>
          <Text style={styles.rule}>
            2. Your friend must be a first time user of HelloMyAstro.
          </Text>
          <Text style={styles.rule}>
            3. Once your friend does a recharge of Rs.100 or above then you will
            get a Rs.100 extra in your wallet.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5DC',
  },
  title: {
    fontSize: normalize(18),
    fontFamily: Fonts.bold,
    marginVertical: 15,
    includeFontPadding: false,
    textAlign: 'center',
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 20,
  },
  step: {
    alignItems: 'center',
    // width: 90,
  },
  stepText: {
    fontSize: normalize(11.5),
    textAlign: 'center',
    marginTop: 5,
    fontFamily: Fonts.regular,
    includeFontPadding: false,
  },
  arrow: {
    fontSize: 20,
    marginHorizontal: 5,
  },
  referralBox: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FBE9B1',
    flexDirection: 'row',
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(10),
  },
  referralText: {
    fontSize: normalize(14),
    marginRight: 10,
    fontFamily: Fonts.semibold,
    includeFontPadding: false,
  },
  referralCode: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  whatsappBtn: {
    flexDirection: 'row',
    backgroundColor: '#25D366',
    paddingVertical: 12,
    borderRadius: normalize(6),
    marginVertical: 15,
    width: '75%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  whatsappText: {
    color: Colors.whiteColor,
    fontSize: normalize(15.5),
    fontFamily: Fonts.bold,
    includeFontPadding: false,
  },
  findFriends: {
    fontSize: normalize(13),
    marginVertical: 10,
    textAlign: 'center',
    fontFamily: Fonts.regular,
    includeFontPadding: false,
  },
  highlight: {
    color: 'orange',
  },
  terms: {
    textAlign: 'center',
    color: '#333',
    marginTop: 15,
    fontSize: normalize(14),
    fontFamily: Fonts.regular,
    includeFontPadding: false,
  },
  iconWrapper: {
    height: verticalScale(50),
    width: verticalScale(50),
    borderRadius: verticalScale(100),
    padding: normalize(4),
    borderWidth: 2,
    borderColor: Colors.orangeColor,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rule: {
    fontSize: normalize(13),
    color: Colors.blackColor,
    fontFamily: Fonts.medium,
    includeFontPadding: false,
    lineHeight: normalize(22),
    paddingBottom: normalize(4),
  },
  term: {
    fontSize: normalize(14),
    color: Colors.blackColor,
    fontFamily: Fonts.bold,
    includeFontPadding: false,
    lineHeight: normalize(22),
    paddingBottom: normalize(8),
  },
});

export default ReferAndEarn;
