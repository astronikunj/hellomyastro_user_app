import {Colors, Fonts} from '@/assets';
import Header from '@/components/Header';
import Spacing from '@/components/Spacing';
import {imgBaseurl} from '@/constants/constant';
import {normalize, verticalScale} from '@/utils/normalize';
import {HtmlText} from '@e-mine/react-native-html-text';
import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {};

const BlogDetail = (props: Props) => {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute();
  const {data} = route.params as any;
  return (
    <View
      style={[
        styles.main,
        {paddingTop: inset.top, paddingBottom: inset.bottom},
      ]}>
      <Header title={data?.title} onPress={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={{
          backgroundColor: Colors.whiteColor,
          paddingHorizontal: normalize(12),
        }}>
        <Spacing height={12} />
        <View
          style={{
            width: '100%',
            height: verticalScale(200),
            borderRadius: normalize(12),
            overflow: 'hidden',
          }}>
          <FastImage
            source={{uri: `${imgBaseurl}${data?.previewImage}`}}
            style={{height: '100%', width: '100%'}}
            resizeMode="cover"
          />
        </View>
        <Spacing height={12} />
        <Text style={styles.title}>{data?.title}</Text>
        <Spacing height={4} />
        <HtmlText style={styles.blogDesc}>{data?.description}</HtmlText>
      </ScrollView>
    </View>
  );
};

export default BlogDetail;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.orangeColor,
  },
  blogDesc: {
    color: Colors.colorGrey,
    fontSize: normalize(13),
    fontFamily: Fonts.regular,
    includeFontPadding: false,
    lineHeight: normalize(20),
    paddingHorizontal: normalize(8),
  },
  title: {
    color: Colors.blackColor,
    fontSize: normalize(15),
    fontFamily: Fonts.medium,
    includeFontPadding: false,
    paddingHorizontal: normalize(6),
  },
});
