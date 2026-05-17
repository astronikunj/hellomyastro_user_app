import {Images} from '@/assets';
import {normalize} from '@/utils/normalize';
import React, {useState} from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  isAdVisible: boolean;
  closeModal: () => void;
  imageUrl: any;
};

export default function AdBanner(props: Props) {
  const [loading, setLoading] = useState(true);
  return (
    <Modal
      isVisible={props.isAdVisible}
      animationIn="zoomIn"
      animationOut="zoomOut"
      backdropOpacity={loading ? 0 : 0.5}>
      <View style={styles.modalContent}>
        {!loading && (
          <TouchableOpacity
            style={styles.closeButton}
            onPress={props.closeModal}>
            <Ionicons name="close-circle" size={35} color="#ff4444" />
          </TouchableOpacity>
        )}
        <View style={styles.imageContainer}>
          <FastImage
            source={{uri: props.imageUrl}}
            style={styles.image}
            resizeMode={FastImage.resizeMode.contain}
            onLoadStart={() => setLoading(true)}
            onProgress={() => setLoading(true)} // optional
            onLoadEnd={() => setLoading(false)}
            onError={() => setLoading(false)}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    borderRadius: normalize(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: normalize(4),
    right: normalize(2),
    zIndex: 1,
  },
  imageContainer: {
    width: '100%',
    height: normalize(405),
    borderRadius: normalize(8),
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: normalize(8),
  },
});
