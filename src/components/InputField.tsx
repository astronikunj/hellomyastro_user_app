import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '@/assets';
import {normalize, verticalScale} from '@/utils/normalize';
import Icons from 'react-native-vector-icons/Ionicons';
import { ThemedText } from './ThemedText';

type Props = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  editable?: boolean | true;
  onPressIn?: () => void;
  errorMessage?: string;
  rightIconName?: any;
  disabled?: boolean | false;
};

const InputField = (props: Props) => {
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <Pressable onPress={props.onPressIn}>
      {/* <Text style={styles.label}>{props.label}</Text> */}
      <ThemedText type="default">
        {props.label}
      </ThemedText>
      <View
        style={{
          borderWidth: 0.4,
          borderColor: isFocused ? Colors.colorGold : Colors.colorGrey,
          borderRadius: 8,
          marginTop: 6,
          backgroundColor: Colors.whiteColor,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TextInput
          value={props.value}
          onChangeText={props.onChangeText}
          placeholder={props.placeholder}
          placeholderTextColor={Colors.colorGrey}
          style={styles.inputStyle}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={props.editable !== false && !props.disabled}
        />
        {props?.rightIconName && (
          <View style={{
            height: verticalScale(35),
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: normalize(14),
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
            backgroundColor: '#fffce6',
          }}>
            <Icons
              name={props?.rightIconName}
              size={normalize(24)}
              color={Colors.colorOrange}
            />
          </View>
        )}
      </View>
      <Text
        style={{
          color: Colors.lightRedColor,
          fontFamily: Fonts.regular,
          includeFontPadding: false,
        }}>
        {props?.errorMessage}
      </Text>
    </Pressable>
  );
};

export default InputField;

const styles = StyleSheet.create({
  inputStyle: {
    flex: 0.95,
    color: Colors.blackColor,
    fontFamily: Fonts.medium,
    fontSize: normalize(15),
    height: verticalScale(35),
    paddingStart: 12,
    includeFontPadding: false,
  },
  label: {
    color: Colors.colorGrey,
    fontSize: normalize(14.5),
    fontFamily: Fonts.bold,
    includeFontPadding: false,
    letterSpacing: 0.5,
  },
});
