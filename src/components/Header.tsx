import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {normalize} from '@/utils/normalize';
import {Colors, Fonts} from '@/assets';
import { StatusBar } from 'expo-status-bar';

type Props = {
  title: string;
  onPress?: () => void;
  headerStyle?: any
};

const Header = (props: Props) => {
  const {title, onPress, headerStyle} = props;
  return (
    <View style={[styles.headerContainer, headerStyle && headerStyle]}>
      <StatusBar backgroundColor={Colors.orangeColor} />
      {onPress && (
        <Ionicons
          onPress={onPress}
          name="arrow-back"
          size={normalize(22)}
          color="black"
          style={{fontWeight: 'bold'}}
        />
      )}
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.headerText}>
        {title}
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: Colors.orangeColor,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
  },
  headerText: {
    color: Colors.blackColor,
    fontSize: normalize(16.5),
    fontFamily: Fonts.semibold,
    includeFontPadding: false,
    paddingLeft: 10,
    maxWidth: normalize(250),
  },
});
