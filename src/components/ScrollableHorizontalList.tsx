import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {Colors, Fonts, Sizes} from '@/assets';
import {normalize, verticalScale} from '@/utils/normalize';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/redux/store';
import {updateChatFilter} from '@/redux/slices/globalSlice';

type Props = {
  categories: any[];
  chatFilter: any;
};

const ScrollableHorizontalList = (props: Props) => {
  const horizontalScrollViewRef = useRef(null);
  const dispatch = useDispatch();
  return (
    <ScrollView
      ref={horizontalScrollViewRef}
      showsHorizontalScrollIndicator={false}
      horizontal
      contentContainerStyle={{gap: Sizes.base,paddingStart: normalize(8), paddingEnd: normalize(8),}}>
      {props.categories.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            dispatch(updateChatFilter(item));
          }}
          style={[
            styles.button,
            {
              borderWidth: props.chatFilter?.name == item?.name ? 0 : 0.5,
              backgroundColor:
                props.chatFilter?.name == item?.name
                  ? Colors.colorOrange
                  : 'transparent',
            },
          ]}>
          <Text
            style={{
              color:
                props.chatFilter?.name == item?.name
                  ? Colors.whiteColor
                  : Colors.blackColor,
              fontFamily:
                props.chatFilter?.name == item?.name ? Fonts.semibold : Fonts.regular,
              fontSize: normalize(11.5),
              includeFontPadding: false,
            }}>
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default ScrollableHorizontalList;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 5,
    paddingHorizontal: 14,
    borderRadius: 24,
  },
});
