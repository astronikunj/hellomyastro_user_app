import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import { Colors, Fonts, Sizes } from '@/assets';
import { ThemedText } from './ThemedText';
import { normalize, verticalScale } from '@/utils/normalize';
import Spacing from './Spacing';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LANGUAGE_PREFERENCE_KEY} from '@/i18n';

type Props = {
  closeModal: Function;
  isOpen: boolean;
};

const SelectLanguage = (props: Props) => {
  const { t, i18n } = useTranslation();

  const changeLanguagePreference = async (lang: string) => {
    await AsyncStorage.setItem(LANGUAGE_PREFERENCE_KEY, lang);
    i18n.changeLanguage(lang);
    props.closeModal(false);
  };
  return (
    <View style={{ flex: 1 }}>
      <Modal isVisible={props.isOpen}>
        <View style={styles.container}>
          <Ionicons
            onPress={() => props.closeModal(false)}
            name="close-circle-outline"
            color={Colors.blackColor}
            size={verticalScale(Sizes.medium)}
            style={styles.closeIcon}
          />
          <ThemedText
            type="subtitle"
            style={{ color: Colors.blackColor, textAlign: 'center' }}
          >
            Choose your app language
          </ThemedText>
          <Spacing height={Sizes.large} />
          <View style={styles.boxContainer}>
            <TouchableOpacity onPress={() => changeLanguagePreference('en')} style={styles.languageContainer}>
              <Text style={styles.englishName}>English</Text>
              <Text style={styles.language}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeLanguagePreference('hi')} style={styles.languageContainer}>
              <Text style={styles.englishName}>Hindi</Text>
              <Text style={styles.language}>हिंदी</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeLanguagePreference('ta')} style={styles.languageContainer}>
              <Text style={styles.englishName}>Tamil</Text>
              <Text style={styles.language}>தமிழ்</Text>
            </TouchableOpacity>
          </View>
          <Spacing height={Sizes.small} />
          <View style={styles.boxContainer}>
            <TouchableOpacity onPress={() => changeLanguagePreference('gu')} style={styles.languageContainer}>
              <Text style={styles.englishName}>Gujarati</Text>
              <Text style={styles.language}>ગુજરાતી</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeLanguagePreference('bn')} style={styles.languageContainer}>
              <Text style={styles.englishName}>Bengali</Text>
              <Text style={styles.language}>বাংলা</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeLanguagePreference('mi')} style={styles.languageContainer}>
              <Text style={styles.englishName}>Marathi</Text>
              <Text style={styles.language}>मराठी</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SelectLanguage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.whiteColor,
    paddingVertical: verticalScale(Sizes.large),
    paddingHorizontal: normalize(Sizes.small),
    borderRadius: Sizes.base,
  },
  boxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  languageContainer: {
    alignItems: 'center',
    borderWidth: 1,
    paddingVertical: verticalScale(Sizes.small),
    width: '32%',
    borderRadius: Sizes.base,
  },
  englishName: {
    color: Colors.colorGrey,
    fontSize: normalize(Sizes.xmedium),
    fontFamily: Fonts.regular,
  },
  language: {
    color: Colors.colorGrey,
    fontSize: normalize(Sizes.small),
    fontFamily: Fonts.regular,
  },
  closeIcon: {
    position: 'absolute',
    right: normalize(Sizes.base),
    top: normalize(Sizes.base),
  },
});
