import { Text, type TextProps, StyleSheet } from 'react-native';

import { Colors, Fonts, Sizes } from '@/assets';
import { normalize } from '@/utils/normalize';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'small';
};

export function ThemedText({
  style,
  type = 'default',
  ...rest
}: ThemedTextProps) {

  return (
    <Text
      style={[
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'small' ? styles.small : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: normalize(14),
    fontFamily: Fonts.medium,
    color: Colors.colorGrey,
    letterSpacing: 0.5,
  },
  defaultSemiBold: {
    fontSize: normalize(Sizes.medium),
    lineHeight: 24,
    fontFamily: Fonts.medium,
  },
  title: {
    fontSize: normalize(Sizes.extraLarge),
    fontFamily: Fonts.bold,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: normalize(Sizes.medium),
    fontFamily: Fonts.semibold,
  },
  link: {
    lineHeight: 30,
    fontSize: normalize(Sizes.xmedium),
    color: Colors.lightRedColor,
    fontFamily: Fonts.regular,
  },
  small: {
    fontSize: normalize(11.5),
    fontFamily: Fonts.regular,
  },
});
