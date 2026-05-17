import { Colors, Fonts, Images } from '@/assets';
import { normalize, verticalScale } from '@/utils/normalize';
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

type Props = {
  visible: boolean;
  onClose: () => void;
  walletScreen: () => void;
};

const ChatWarningAlert: React.FC<Props> = ({ visible, onClose, walletScreen }) => {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      backdropOpacity={0.6}
      animationIn="zoomIn"
      animationOut="zoomOut"
      useNativeDriver
    >
      <View style={styles.container}>
        {/* Coin Icon */}
        <View style={styles.iconWrapper}>
          <Image
            source={Images.Coin} // <-- replace with your coin icon
            style={styles.icon}
          />
        </View>

        {/* Title */}
        <Text style={styles.title}>Chat Requires Recharge</Text>

        {/* Description */}
        <Text style={styles.description}>
          Your current balance is <Text style={styles.bold}>₹0</Text>. To start your
          conversation with the astrologer, you need a minimum of{' '}
          <Text style={styles.highlight}>₹25</Text>. Tap below to top up your wallet.
        </Text>

        {/* Buttons */}
        <TouchableOpacity style={styles.button} onPress={walletScreen}>
          <Text style={styles.buttonText}>Recharge Now</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onClose}>
          <Text style={styles.viewText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.whiteColor,
    borderRadius: normalize(14),
    padding: normalize(22),
    alignItems: 'center',
  },
  iconWrapper: {
    backgroundColor: Colors.whiteColor,
    borderRadius: normalize(50),
    padding: normalize(14),
    marginBottom: normalize(15),
  },
  icon: {
    width: verticalScale(48),
    height: verticalScale(48),
    resizeMode: 'contain',
  },
  title: {
    fontSize: normalize(20),
    color: Colors.blackColor,
    fontFamily: Fonts.semibold,
    marginBottom: 12,
  },
  description: {
    fontSize: normalize(14),
    color: Colors.colorGrey,
    fontFamily: Fonts.regular,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  bold: {
    fontFamily: Fonts.bold,
    color: Colors.blackColor,
  },
  highlight: {
    color: Colors.colorOrange,
    fontFamily: Fonts.bold,
  },
  button: {
    backgroundColor: Colors.colorOrange,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontFamily: Fonts.semibold,
    fontSize: normalize(15),
  },
  viewText: {
    color: Colors.blackColor,
    fontSize: normalize(13),
    textDecorationLine: 'underline',
  },
});

export default ChatWarningAlert;
