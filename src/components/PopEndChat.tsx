import {Colors, Fonts} from '@/assets';
import {normalize, verticalScale} from '@/utils/normalize';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import Spacing from './Spacing';
import Ionicons from 'react-native-vector-icons/Ionicons';

type PopUpProps = {
  title?: string;
  description?: string;
  buttons?: any[];
  profileImage?: any;
};

const PopEndChat = (props: PopUpProps) => {
  const {title, description, buttons, profileImage} = props;
  const [isVisible, setIsVisible] = React.useState(true);
  return (
    <Modal
      isVisible={isVisible}
      // onBackdropPress={onClose}
      useNativeDriver
      hideModalContentWhileAnimating>
      <View style={styles.modalContainer}>
        <Spacing height={verticalScale(20)} />

        {/* <Ionicons
          name="close-circle-outline"
          size={verticalScale(24)}
          color={Colors.colorGrey}
          onPress={() => setIsVisible(false)}
          style={{
            position: 'absolute',
            top: verticalScale(10),
            right: verticalScale(10),
          }}
        /> */}
        {profileImage && (
          <View
            style={{
              borderWidth: 2,
              borderColor: Colors.lightRedColor,
              padding: 2,
              borderRadius: normalize(80),
            }}>
            <View
              style={{
                height: normalize(70),
                width: normalize(70),
                borderRadius: normalize(80),
                overflow: 'hidden',
              }}>
              <FastImage
                source={{
                  uri: profileImage,
                }}
                style={{height: '100%', width: '100%'}}
                resizeMode="cover"
              />
            </View>
          </View>
        )}
        <Spacing height={10} />
        <Text style={styles.title}>{title || 'Warning'}</Text>
        <Text style={styles.description}>{description || null}</Text>
        <View style={styles.buttonContainer}>
          {buttons?.map((btn, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.button, btn.style]}
              onPress={() => {
                btn.onPress();
                setIsVisible(false);
              }}>
              <Text style={styles.buttonText}>{btn.label}</Text>
            </TouchableOpacity>
          ))}
          {/* <TouchableOpacity
            style={[styles.button]}
            onPress={() => setIsVisible(false)}>
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity> */}
        </View>
        <Spacing height={10} />
      </View>
    </Modal>
  );
};

export default PopEndChat;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: normalize(17),
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: Fonts.semibold,
    includeFontPadding: false,
    textTransform: 'capitalize',
  },
  description: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: Fonts.regular,
    includeFontPadding: false,
  },
  buttonContainer: {
    gap: 6,
    width: '100%',
  },
  button: {
    backgroundColor: Colors.orangeColor,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: normalize(24),
    marginHorizontal: 5,
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.blackColor,
    fontSize: normalize(16),
    fontFamily: Fonts.semibold,
    includeFontPadding: false,
  },
});
