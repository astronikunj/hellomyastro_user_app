import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import React from 'react';
import { Colors, Fonts, Sizes } from '@/assets';
import { normalize, verticalScale } from '@/utils/normalize';

type Props = {
  label: string;
  buttonStyle?: any;
  buttonTextStyle?: TextStyle;
  onPress: () => void;
  disabled?: boolean;
};

const CommonButton = (props: Props) => {
  const { label, onPress, buttonStyle, buttonTextStyle } = props;
  const disabled = props.disabled ?? false;
  return (
    <TouchableOpacity disabled={disabled} activeOpacity={0.8} onPress={onPress} style={[styles.container, {...buttonStyle}]}>
      <Text style={[styles.text, {...buttonTextStyle}]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CommonButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.colorOrange,//"#e52d27"
    width: '95%',
    marginVertical: verticalScale(Sizes.base),
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    // elevation: 2,
  },
  text: {
    fontSize: normalize(16),
    color: '#fff',
    fontFamily: Fonts.semibold,
    textAlign: 'center',
    includeFontPadding: false,
  },
});
