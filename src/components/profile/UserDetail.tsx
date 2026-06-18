import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {normalize, verticalScale} from '@/utils/normalize';
import {Colors, Fonts, Images, Sizes} from '@/assets';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import {imgBaseurl} from '@/constants/constant';

type Props = {
  astro: any;
  onPressFollow: (astroId: any) => void;
  onPressUnfollow: (astroId: any) => void;
  isFollow: boolean;
};

const {width} = Dimensions.get('window');

const UserDetail = (props: Props) => {
  const {astro, onPressFollow, onPressUnfollow, isFollow} = props;

  return (
    <View style={styles.container}>
      <View style={styles.verifyIconContainer}>
        <FastImage
          source={Images.verifyAstro}
          style={{height: '100%', width: '100%'}}
          resizeMode="contain"
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <View>
          <View style={styles.profileImageContainer}>
            <FastImage
              source={
                astro?.profileImage == null
                  ? Images.imagePlaceholder
                  : {uri: `${imgBaseurl}${astro?.profileImage}`}
              }
              style={{height: '100%', width: '100%'}}
              resizeMode="cover"
            />
          </View>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" color={'#FFB400'} size={normalize(12)} />
            <Text style={styles.ratingText}>{astro?.rating == null ? 0 : astro?.rating}</Text>
          </View>
        </View>
        <View style={{flex: 1, paddingLeft: 15}}>
          <Text style={styles.name}>Astro {astro?.name}</Text>
          <View style={[styles.textViewStyle, {alignItems: 'flex-start'}]}>
            <FastImage
              source={Images.readingIcon}
              style={[styles.textIconStyle, {marginTop: 4}]}
              resizeMode="contain"
            />
            <Text style={styles.textStyle}>{astro?.allSkill.trim()}</Text>
          </View>
          <View style={styles.textViewStyle}>
            <FastImage
              source={Images.languageIcon}
              style={styles.textIconStyle}
              resizeMode="contain"
            />
            <Text style={styles.textStyle}>{astro?.languageKnown}</Text>
          </View>
          <View style={styles.textViewStyle}>
            <FastImage
              source={Images.expIcon}
              style={styles.textIconStyle}
              resizeMode="contain"
            />
            <Text style={styles.textStyle}>
              Exp: {astro?.experienceInYears}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.name}>{`\u20B9 ${astro?.charge}/min`}</Text>
            {astro?.changeStatus && (
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.onlineButton,
                  {
                    backgroundColor:
                      astro?.chatStatus == 'Online'
                        ? '#C5F9C3'
                        : astro?.changeStatus == 'Offline'
                        ? Colors.lightRedColor
                        : Colors.colorGrey,
                  },
                ]}>
                <Text style={styles.onlineButtonText}>
                  {astro?.changeStatus}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      <View style={styles.horizontalLine} />
      <View style={styles.bottomContainer}>
        <View style={{alignItems: 'center'}}>
          <Ionicons
            name="chatbubble-ellipses-outline"
            color={'#C6C6C6'}
            size={normalize(24)}
          />
          <Text style={styles.timeText}>{astro?.chatMin} mins</Text>
        </View>
        <View style={styles.verticalLine} />
        <View style={{alignItems: 'center'}}>
          <Ionicons
            name="call-outline"
            color={'#C6C6C6'}
            size={normalize(24)}
          />
          <Text style={styles.timeText}>{astro?.callMin} mins</Text>
        </View>
        {/* <TouchableOpacity style={styles.watchIntroButton}>
          <Ionicons
            name="videocam-outline"
            color={Colors.blackColor}
            size={normalize(18)}
          />
          <Text style={styles.watchIntroButtonText}>Watch Intro</Text>v
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => {
            if (isFollow) {
              onPressUnfollow(astro?.id);
            } else {
              onPressFollow(astro?.id);
            }
          }}
          style={styles.watchIntroButton}>
          <Ionicons
            name="person-outline"
            color={Colors.blackColor}
            size={normalize(18)}
          />
          <Text style={styles.watchIntroButtonText}>
            {isFollow ? 'Following' : 'Follow'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserDetail;

const styles = StyleSheet.create({
  container: {
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(8),
    marginHorizontal: normalize(15),
    marginTop: normalize(15),
    borderRadius: normalize(8),
    backgroundColor: Colors.whiteColor,
    elevation: 4,
  },
  name: {
    fontSize: normalize(15),
    fontFamily: Fonts.roboto.medium,
    color: Colors.blackColor,
    textTransform: 'capitalize',
  },
  otherText: {
    fontSize: normalize(13),
    fontFamily: Fonts.roboto.regular,
    color: '#808080',
    lineHeight: verticalScale(18),
  },
  verifyIconContainer: {
    height: verticalScale(18),
    width: verticalScale(18),
    position: 'absolute',
    right: 10,
    top: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: Colors.whiteColor,
    marginTop: normalize(6),
    paddingHorizontal: normalize(Sizes.small),
    paddingVertical: normalize(4),
    borderRadius: Sizes.small,
    position: 'absolute',
    bottom: -10,
    right: 22,
    zIndex: 1,
    elevation: 2,
  },
  ratingText: {
    color: Colors.blackColor,
    fontSize: normalize(12),
    fontFamily: Fonts.semibold,
    includeFontPadding: false,
  },
  watchIntroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF390',
    paddingHorizontal: normalize(17),
    gap: 8,
    height: verticalScale(32),
    borderRadius: normalize(8),
    borderWidth: 1,
    borderColor: '#FFB800',
  },
  watchIntroButtonText: {
    fontSize: normalize(12),
    fontFamily: Fonts.regular,
    color: Colors.blackColor,
    includeFontPadding: false,
  },
  horizontalLine: {
    height: verticalScale(1),
    backgroundColor: '#D0D0D0',
    marginTop: normalize(22),
    width: width - normalize(30),
    alignSelf: 'center',
  },
  onlineButton: {
    marginLeft: normalize(20),
    paddingHorizontal: normalize(18),
    paddingVertical: normalize(6),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    backgroundColor: '#C5F9C3',
  },
  onlineButtonText: {
    fontSize: normalize(12),
    fontFamily: Fonts.roboto.medium,
    color: '#157B11',
  },
  timeText: {
    fontSize: normalize(14),
    fontFamily: Fonts.regular,
    color: Colors.blackColor,
    includeFontPadding: false,
  },
  profileImageContainer: {
    height: 132,
    width: 116,
    borderRadius: normalize(7),
    overflow: 'hidden',
    zIndex: 0,
  },
  bottomContainer: {
    flexDirection: 'row',
    marginTop: normalize(10),
    justifyContent: 'space-around',
  },
  verticalLine: {
    height: verticalScale(40),
    width: verticalScale(1),
    backgroundColor: '#D0D0D0',
    alignSelf: 'center',
  },
  textViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(6),
    marginBottom: 2,
  },
  textIconStyle: {
    height: verticalScale(14),
    width: verticalScale(14),
  },
  textStyle: {
    flex: 1,
    fontSize: normalize(12.5),
    fontFamily: Fonts.regular,
    color: Colors.colorGrey,
    includeFontPadding: false,
    lineHeight: 24,
  },
});
