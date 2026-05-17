import {Fonts} from '@/assets';
import {normalize} from '@/utils/normalize';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ToastMessage from './ToastMessage';

type Props = {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: ({rating, review}: any) => void;
};

const ReviewModal = ({isVisible, onClose, onSubmit}: Props) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const renderStars = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: normalize(10),
      }}>
      {[1, 2, 3, 4, 5].map(item => (
        <TouchableOpacity key={item} onPress={() => setRating(item)}>
          <Icon
            name={item <= rating ? 'star' : 'star-border'}
            size={normalize(32)}
            color={item <= rating ? '#FFD700' : '#aaa'}
            style={{marginHorizontal: normalize(5)}}
          />
        </TouchableOpacity>
      ))}
    </View>
  );

  const handleSubmit = () => {
    if (rating === 0 || review.trim() === '') {
      ToastMessage({message: 'Rating and review both required!'});
      return;
    }
    onSubmit({rating, review});
    setRating(0);
    setReview('');
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      avoidKeyboard={true} // 👈 react-native-modal ka prop
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.4}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1, justifyContent: 'center'}}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 20,
              padding: normalize(18),
              shadowColor: '#000',
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 5,
            }}>
            <Text
              style={{
                fontSize: normalize(17),
                fontFamily: Fonts.semibold,
                includeFontPadding: false,
                lineHeight: normalize(22),
                textAlign: 'center',
              }}>
              Write a Review
            </Text>

            {renderStars()}

            <TextInput
              value={review}
              onChangeText={setReview}
              placeholder="Write your review..."
              placeholderTextColor="#888"
              multiline
              style={{
                borderWidth: 1,
                borderColor: '#ddd',
                borderRadius: normalize(10),
                padding: normalize(10),
                minHeight: 100,
                textAlignVertical: 'top',
                marginVertical: normalize(10),
                fontFamily: Fonts.medium,
                includeFontPadding: false,
                lineHeight: normalize(22),
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: normalize(15),
              }}>
              <TouchableOpacity onPress={onClose} style={styles.btnContainer}>
                <Text style={[styles.btnText, styles.cancel]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSubmit}
                style={[styles.btnContainer, styles.submitBtn]}>
                <Text style={[styles.btnText, styles.submit]}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ReviewModal;

const styles = StyleSheet.create({
  btnContainer: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingVertical: normalize(12),
    borderRadius: normalize(12),
    marginRight: normalize(10),
    alignItems: 'center',
  },
  btnText: {
		fontSize: normalize(13),
    fontFamily: Fonts.semibold,
    includeFontPadding: false,
    lineHeight: normalize(22),
  },
  cancel: {
    color: '#333',
  },
  submit: {
    color: '#fff',
  },
  submitBtn: {
    backgroundColor: '#4CAF50',
  },
});
