import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import { Colors, Fonts, Sizes } from '@/assets';
import { normalize } from '@/utils/normalize';

type Props = {
	loading: boolean;
};

const LoaderModal = (props: Props) => {
  return (
    <View>
      <Modal isVisible={props.loading}>
        <View style={styles.container}>
          <ActivityIndicator size={35} color={Colors.colorOrange} />
          <Text style={styles.text}>please wait...</Text>
        </View>
      </Modal>
    </View>
  );
};

export default LoaderModal;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Sizes.xmedium,
    paddingVertical: normalize(14),
    borderRadius: normalize(24),
    width: '80%',
    alignSelf: 'center',
  },
  text: {
    color: Colors.blackColor,
    fontFamily: Fonts.regular,
    fontSize: normalize(14),
    includeFontPadding: false,
  },
});
