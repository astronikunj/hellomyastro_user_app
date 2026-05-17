import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import {imgBaseurl} from '@/constants/constant';
import Spacing from './Spacing';
import {normalize, verticalScale} from '@/utils/normalize';
import {Colors, Fonts, Images, Sizes} from '@/assets';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';

type Props = {
  profileImage: string;
  name: string;
  primartSkills: string;
  allSkills: string;
  languages: string;
  charge: number;
  expInYears: number;
  rating: number;
  onPressChat?: () => void;
  onPressCall?: () => void;
  onPressProfile?: () => void;
  fromScreen?: string;
  onPressUnfollow?: () => void;
  chatWaitTime?: any;
  chatStatus?: any;
  callWaitTime?: any;
  callStatus?: any;
};

const AstroCard = (props: Props) => {
  const {
    profileImage,
    name,
    primartSkills,
    allSkills,
    languages,
    charge,
    expInYears,
    rating,
    chatWaitTime,
    chatStatus,
    callWaitTime,
    callStatus,
    onPressChat = () => {},
    onPressCall = () => {},
    onPressProfile,
  } = props;
  return (
    <View style={styles.container}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPressProfile}
            style={styles.outerImageContainer}>
            <View style={styles.imageContainer}>
              <FastImage
                source={{uri: `${imgBaseurl}${profileImage}`}}
                style={{width: '100%', height: '100%'}}
                resizeMode="contain"
              />
            </View>
            {chatStatus != null && chatStatus?.toLowerCase() != 'wait time' && (
              <View
                style={{
                  height: normalize(13.5),
                  width: normalize(13.5),
                  borderRadius: normalize(13.5),
                  backgroundColor:
                    chatStatus?.toLowerCase() == 'online'
                      ? Colors.greenColor
                      : Colors.lightRedColor,
                  position: 'absolute',
                  bottom: normalize(0),
                  right: normalize(8),
                  zIndex: 1,
                }}
              />
            )}
          </TouchableOpacity>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{rating}</Text>
            <Ionicons
              name="star"
              color={Colors.blackColor}
              size={normalize(12)}
            />
          </View>
        </View>
        <View style={{marginLeft: Sizes.small}}>
          <Text style={styles.nameStyle}>{name}</Text>
          <View style={[styles.textViewStyle, {marginBottom: normalize(-3.5)}]}>
            <FastImage
              source={Images.readingIcon}
              style={[
                styles.textIconStyle,
                {alignSelf: 'baseline', marginTop: 3},
              ]}
              resizeMode="contain"
            />
            <Text style={[styles.textStyle]}>
              {primartSkills.trim().split(',').slice(0, 2).join(', ')}
            </Text>
          </View>
          <View style={styles.textViewStyle}>
            <FastImage
              source={Images.languageIcon}
              style={styles.textIconStyle}
              resizeMode="contain"
            />
            <Text style={styles.textStyle}>{languages}</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <View style={{width: '52%'}}>
              {/* Astrologer Experience */}
              <View style={styles.textViewStyle}>
                <FastImage
                  source={Images.expIcon}
                  style={styles.textIconStyle}
                  resizeMode="contain"
                />
                <Text style={styles.textStyle}>Exp: {expInYears}</Text>
              </View>
              {/* Astrologer Price */}
              <View style={styles.textViewStyle}>
                <FastImage
                  source={Images.priceIcon}
                  style={{height: normalize(13), width: normalize(13)}}
                  resizeMode="contain"
                />
                <Text style={styles.chargeText}>{`${charge}/min`}</Text>
              </View>
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: normalize(120),
              }}>
              {chatWaitTime != null && (
                <Text style={styles.waitTIme}>
                  {`Waiting Time ~${chatWaitTime}min`}
                </Text>
              )}
            </View>
          </View>
        </View>
      </View>
      <Spacing height={4} />
      {props.onPressUnfollow ? (
        <TouchableOpacity
          onPress={props.onPressUnfollow}
          style={styles.unfollowBtn}>
          <Text style={styles.unfollowBtnText}>Unfollow</Text>
        </TouchableOpacity>
      ) : (
        <View
          style={[
            styles.buttonWrapperContainer,
            {
              alignSelf: props.fromScreen !== undefined ? 'flex-end' : 'center',
              width: props.fromScreen !== undefined ? 'auto' : '100%',
            },
          ]}>
          {(props.fromScreen == 'chat_screen' ||
            props.fromScreen == undefined) && (
            <TouchableOpacity
              onPress={onPressChat}
              activeOpacity={chatStatus?.toLowerCase() != 'online' ? 1 : 0.5}
              style={[
                styles.buttonContainer,
                chatStatus?.toLowerCase() != 'online' && styles.buttonDisabled,
                {width: props.fromScreen == 'chat_screen' ? '34%' : '26%'},
              ]}>
              <Ionicons
                name="chatbubble-ellipses-outline"
                color={
                  chatStatus?.toLowerCase() != 'online'
                    ? '#AAA'
                    : Colors.greenColor
                }
                size={normalize(24)}
              />
              <Text
                style={[
                  styles.chatText,
                  chatStatus?.toLowerCase() != 'online' &&
                    styles.buttonTextDisabled,
                ]}>
                Chat
              </Text>
            </TouchableOpacity>
          )}
          {(props.fromScreen == 'call_screen' ||
            props.fromScreen == undefined) && (
            <TouchableOpacity
              onPress={onPressCall}
              activeOpacity={callStatus?.toLowerCase() != 'online' ? 1 : 0.8}
              style={[
                styles.buttonContainer,
                callStatus?.toLowerCase() != 'online' && styles.buttonDisabled,
                {width: props.fromScreen == 'call_screen' ? '34%' : '26%'},
              ]}>
              <Ionicons
                name="call"
                color={
                  callStatus?.toLowerCase() != 'online'
                    ? '#AAA'
                    : Colors.greenColor
                }
                size={normalize(22)}
              />
              <Text
                style={[
                  styles.chatText,
                  callStatus?.toLowerCase() != 'online' &&
                    styles.buttonTextDisabled,
                ]}>
                Call
              </Text>
            </TouchableOpacity>
          )}
          {(props.fromScreen == 'video_screen' ||
            props.fromScreen == undefined) && (
            <TouchableOpacity
              activeOpacity={1}
              style={[
                styles.buttonContainer,
                styles.buttonDisabled,
                {width: '34%'},
              ]}>
              <Ionicons name="videocam" color={'#AAA'} size={normalize(22)} />
              <Text style={[styles.chatText, styles.buttonTextDisabled]}>
                Video Call
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      <View style={styles.verifyContainer}>
        <Image
          source={Images.verifyAstro}
          style={{height: '100%', width: '100%'}}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default AstroCard;

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    // alignItems: 'center',
    backgroundColor: Colors.whiteColor,
    marginHorizontal: Sizes.base,
    padding: Sizes.base,
    borderRadius: Sizes.base,
    borderWidth: 0.3,
    borderColor: Colors.colorGrey,
    overflow: 'hidden',
  },
  imageContainer: {
    height: normalize(65),
    width: normalize(65),
    borderRadius: normalize(80),
    overflow: 'hidden',
  },
  nameStyle: {
    color: Colors.colorOrange,
    textTransform: 'capitalize',
    fontSize: normalize(Sizes.medium),
    fontFamily: Fonts.medium,
    includeFontPadding: false,
    marginBottom: -4,
  },
  textStyle: {
    fontSize: normalize(13),
    fontFamily: Fonts.regular,
    color: Colors.colorGrey,
    includeFontPadding: false,
    lineHeight: 20,
    width: normalize(220),
  },
  chatText: {
    color: Colors.greenColor,
    fontSize: normalize(13),
    fontFamily: Fonts.medium,
    includeFontPadding: false,
  },
  chargeText: {
    color: Colors.blackColor,
    fontSize: normalize(13),
    fontFamily: Fonts.medium,
    includeFontPadding: false,
    lineHeight: 24,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: Colors.orangeColor,
    marginTop: normalize(6),
    paddingHorizontal: normalize(Sizes.small),
    paddingVertical: normalize(2),
    borderRadius: Sizes.small,
  },
  ratingText: {
    color: Colors.blackColor,
    fontSize: normalize(12),
    fontFamily: Fonts.semibold,
    includeFontPadding: false,
  },
  outerImageContainer: {
    borderWidth: 2,
    borderColor: Colors.lightRedColor,
    padding: 2,
    borderRadius: normalize(80),
  },
  textViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(6),
    // marginBottom: 2,
  },
  textIconStyle: {
    height: verticalScale(14),
    width: verticalScale(14),
  },
  buttonContainer: {
    width: '26%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.45,
    borderRadius: 28,
    paddingVertical: 6,
    gap: normalize(4),
    backgroundColor: Colors.whiteColor,
  },
  buttonWrapperContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  verifyContainer: {
    height: verticalScale(18),
    width: verticalScale(18),
    position: 'absolute',
    top: 20,
    right: 20,
  },
  unfollowBtn: {
    paddingVertical: normalize(6),
    paddingHorizontal: normalize(18),
    borderRadius: normalize(8),
    backgroundColor: Colors.colorGold,
    justifyContent: 'center',
    alignItems: 'center',
    width: '34%',
    alignSelf: 'flex-end',
  },
  unfollowBtnText: {
    fontSize: normalize(14),
    color: Colors.blackColor,
    fontFamily: Fonts.medium,
    includeFontPadding: false,
  },
  waitTIme: {
    color: Colors.lightRedColor,
    fontSize: normalize(10),
    fontFamily: Fonts.regular,
    includeFontPadding: false,
    lineHeight: normalize(22),
  },
  buttonDisabled: {
    borderColor: '#CCC',
  },
  buttonTextDisabled: {
    color: '#AAA',
  },
});
