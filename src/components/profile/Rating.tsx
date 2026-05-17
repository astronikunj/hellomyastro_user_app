import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {normalize, verticalScale} from '@/utils/normalize';
import {Colors, Fonts, Images} from '@/assets';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Spacing from '../Spacing';
import {imgBaseurl} from '@/constants/constant';

type Props = {
  rating: any;
  reviewCount: any;
  reviewList: any[];
  reviewLoading: boolean;
};

const {width} = Dimensions.get('window');

const renderReviewItem = ({item}: any) => (
  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
    <FastImage
      source={
        item.profile
          ? {
              uri: `${imgBaseurl}${item.profile}`,
            }
          : Images.imagePlaceholder
      }
      style={{
        height: normalize(45),
        width: normalize(45),
        borderRadius: normalize(45),
      }}
      resizeMode="cover"
    />
    <View
      style={{
        paddingLeft: normalize(10),
        width: width - normalize(80),
      }}>
      <Text
        style={{
          fontSize: normalize(16),
          fontFamily: Fonts.roboto.medium,
          color: Colors.blackColor,
        }}>
        {item.userName}
      </Text>
      <Spacing height={normalize(2)} />
      <View style={styles.ratingStarsContainer}>
        {[1, 2, 3, 4, 5].map(value => {
          if (value <= parseInt(item.rating)) {
            return (
              <Ionicons
                key={value}
                name="star"
                color={'#FFB400'}
                size={normalize(13)}
              />
            );
          } else {
            return (
              <Ionicons
                key={value}
                name="star"
                color={Colors.colorGrey}
                size={normalize(13)}
              />
            );
          }
        })}
      </View>
      <Text
        style={{
          fontSize: normalize(14),
          color: Colors.blackColor,
          fontFamily: Fonts.roboto.regular,
          marginTop: normalize(8),
          lineHeight: normalize(20),
        }}>
        {item.review}
      </Text>
    </View>
  </View>
);

const Rating = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Rating overview</Text>
      <View style={styles.ratingContainer}>
        <View style={styles.ratingRightContainer}>
          <Text style={styles.ratingPoint}>
            {props.rating == null ? 0 : props.rating}/<Text style={{fontSize: normalize(18)}}>5</Text>
          </Text>
          <View style={styles.ratingStarsContainer}>
            {[1, 2, 3, 4, 5].map(item => {
              if (props.rating >= item) {
                return (
                  <Ionicons
                    key={item}
                    name="star"
                    color={'#FFB400'}
                    size={normalize(16)}
                  />
                );
              } else {
                return (
                  <Ionicons
                    key={item}
                    name="star"
                    color={Colors.colorGrey}
                    size={normalize(16)}
                  />
                );
              }
            })}
          </View>
          <Text style={styles.reviewCountText}>
            {props.reviewCount} Reviews
          </Text>
        </View>
        <View style={{flex: 0.8, height: normalize(125)}}>
          <FastImage
            source={Images.ratingChart}
            style={{height: '100%', width: '100%'}}
            resizeMode="contain"
          />
        </View>
      </View>
      <Spacing height={normalize(10)} />
      <FlatList
        data={props.reviewList}
        renderItem={renderReviewItem}
        keyExtractor={(_, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={styles.horizontalLine} />}
        ListEmptyComponent={() => {
          if (!props.reviewLoading) {
            return (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View
                  style={{
                    height: verticalScale(120),
                    width: verticalScale(120),
                  }}>
                  <FastImage
                    source={Images.noData}
                    style={{height: '100%', width: '100%'}}
                    resizeMode="cover"
                  />
                </View>
              </View>
            );
          } else {
            return (
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size={'large'} color={Colors.blackColor} />
              </View>
            );
          }
        }}
      />
      <Spacing height={normalize(10)} />
      {/* <TouchableOpacity
        activeOpacity={0.8}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: normalize(10),
          alignSelf: 'flex-end',
        }}>
        <Text
          style={{
            color: '#157B11',
            fontSize: normalize(16),
            fontFamily: Fonts.roboto.medium,
            textAlign: 'right',
          }}>
          See more reviews
        </Text>
        <Ionicons name="arrow-forward" color="#157B11" size={normalize(20)} />
      </TouchableOpacity> */}
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  container: {
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(8),
    marginHorizontal: normalize(15),
    marginVertical: normalize(15),
    borderRadius: normalize(8),
    backgroundColor: '#FFF',
    elevation: 4,
  },
  heading: {
    color: Colors.blackColor,
    fontSize: normalize(16),
    fontFamily: Fonts.roboto.medium,
  },
  ratingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ratingRightContainer: {
    // flex: 0.1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  ratingPoint: {
    color: Colors.blackColor,
    fontSize: normalize(36),
    fontFamily: Fonts.roboto.medium,
  },
  ratingStarsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(2),
  },
  reviewCountText: {
    color: '#B3B3B3',
    fontSize: normalize(14),
    fontFamily: Fonts.roboto.regular,
  },
  horizontalLine: {
    height: verticalScale(1),
    backgroundColor: '#D0D0D0',
    marginVertical: normalize(12),
    width: width - normalize(30),
    alignSelf: 'center',
  },
});
