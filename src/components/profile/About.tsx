import {StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import {normalize} from '@/utils/normalize';
import {Colors, Fonts} from '@/assets';

type Props = {
  bio: any;
};

const About = (props: Props) => {
	
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>About Me</Text>
      <Text style={[styles.heading, {color: '#616161', lineHeight: normalize(20)}]}>
        {props.bio}
      </Text>
			{/* <Text style={[styles.heading, {fontSize: 16, marginTop: 8}]}>See more</Text> */}
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(8),
    marginHorizontal: normalize(15),
    marginTop: normalize(15),
    borderRadius: normalize(8),
    backgroundColor: '#FFF1CC',
    borderWidth: 2,
    borderColor: '#FFD565',
    elevation: 4,
  },
  heading: {
    fontFamily: Fonts.roboto.regular,
    fontWeight: '600',
    fontSize: normalize(14),
    color: Colors.blackColor,
    textAlign: 'center',
  },
});
