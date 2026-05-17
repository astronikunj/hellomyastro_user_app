import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, Fonts, Images, Sizes} from '@/assets';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {normalize, verticalScale} from '@/utils/normalize';
import Spacing from '@/components/Spacing';
import AstroCard from '@/components/AstroCard';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSearchAstrologerMutation} from '@/redux/services/astroService';
import {ToastMessage} from '@/utils/helper';

type Props = {};

const SearchScreen = (props: Props) => {
  const navigation = useNavigation();
  const [astrologersList, setAstrologersList] = useState<any>([]);
  const [searchText, setSearchText] = useState('');
  const [searchAstrologer] = useSearchAstrologerMutation();
  const searchAstro = async () => {
    try {
      const body = {
        filterKey: 'astrologer',
        searchString: searchText,
        startIndex: 0,
        fetchRecord: 20,
        userId: null,
      };
      const response = await searchAstrologer(body).unwrap();
      if (response?.status == 200) {
        setAstrologersList(response?.recordList);
      } else {
        ToastMessage('Try again in sometime!');
      }
    } catch (error) {
      console.log('Astrologer Fetching Error: ', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          {/* <Image source={Images.back} style={styles.back} contentFit="contain" /> */}
          <Ionicons
            name="arrow-back"
            size={verticalScale(Sizes.large)}
            color={Colors.blackColor}
          />
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Search by name, language, category"
            placeholderTextColor={Colors.colorGrey}
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={() => searchAstro()}
          />
          <Ionicons
            name="close-circle-outline"
            size={verticalScale(18)}
            color={Colors.colorGrey}
            onPress={() => setSearchText('')}
          />
        </View>
      </View>
      {/* {searchText == '' && (
        <>
          <Spacing height={18} />
          <View style={{}}>
            <Text style={styles.searchTypeHeader}>Popular categories</Text>
            <View style={styles.searchTypeContainer}>
              {[
                'vedic',
                'kp',
                'tarot',
                'psychic',
                'vastu',
                'numerology',
                'palmistry',
              ].map(category => (
                <TouchableOpacity
                  key={category}
                  activeOpacity={0.7}
                  onPress={() => {
                    setSearchText(category)
                  }}
                  style={styles.searchTypeButton}>
                  <Text style={styles.searchTypeButtonText}>{category}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <Spacing height={18} />
          <View style={{}}>
            <Text style={styles.searchTypeHeader}>Search by language</Text>
            <View style={styles.searchTypeContainer}>
              {[
                'hindi',
                'english',
                'tamil',
                'kannada',
                'telgue',
                'bengali',
                'gujarati',
              ].map(lang => (
                <TouchableOpacity
                  key={lang}
                  activeOpacity={0.7}
                  onPress={() => setSearchText(lang)}
                  style={styles.searchTypeButton}>
                  <Text style={styles.searchTypeButtonText}>{lang}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <Spacing height={18} />
          <View style={{}}>
            <Text style={styles.searchTypeHeader}>Speciality</Text>
            <View style={styles.searchTypeContainer}>
              {[
                'love',
                'Carrer',
                'marriage',
                'health',
                'wealth',
                'business',
              ].map(lang => (
                <TouchableOpacity
                  key={lang}
                  activeOpacity={0.7}
                  onPress={() => setSearchText(lang)}
                  style={styles.searchTypeButton}>
                  <Text style={styles.searchTypeButtonText}>{lang}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </>
      )} */}
      {(astrologersList.length > 0 || searchText) && (
        <>
          <Spacing height={18} />
          <FlatList
            data={astrologersList}
            keyExtractor={item => item.id.toString()}
            renderItem={({item, index}) => (
              <AstroCard
                allSkills={item.allSkill}
                charge={item.charge}
                expInYears={item.experienceInYears}
                languages={item.languageKnown}
                name={item.name}
                primartSkills={item.primarySkill}
                profileImage={item.profileImage}
                rating={item.rating}
                onPressChat={() => {}}
              />
            )}
            contentContainerStyle={{gap: Sizes.base}}
          />
          <Spacing height={18} />
        </>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    gap: 8,
    marginTop: 8,
  },
  back: {
    height: verticalScale(24),
    width: verticalScale(24),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.97,
    paddingHorizontal: normalize(12),
    height: verticalScale(32),
    borderRadius: 8,
    backgroundColor: '#d7d7da',
  },
  inputStyle: {
    flex: 1,
    color: Colors.blackColor,
    fontSize: normalize(12.5),
    fontFamily: Fonts.medium,
    lineHeight: 24,
    includeFontPadding: false,
  },
  searchTypeHeader: {
    color: Colors.blackColor,
    paddingStart: Sizes.base,
    fontSize: normalize(16),
    fontFamily: Fonts.semibold,
    includeFontPadding: false,
  },
  searchTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Sizes.small,
    flexWrap: 'wrap',
    marginHorizontal: Sizes.base,
    marginTop: Sizes.small,
  },
  searchTypeButton: {
    borderWidth: 1,
    borderColor: '#888891',
    paddingVertical: 2,
    paddingHorizontal: Sizes.base,
    borderRadius: Sizes.large,
  },
  searchTypeButtonText: {
    textTransform: 'capitalize',
    fontSize: normalize(13),
    fontFamily: Fonts.medium,
    color: Colors.blackColor,
    includeFontPadding: false,
  },
});
