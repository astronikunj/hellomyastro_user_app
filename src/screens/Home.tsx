import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Colors, Fonts, homeCategory, Images, Sizes} from '@/assets';
import {ThemedText} from '@/components/ThemedText';
import {normalize, verticalScale} from '@/utils/normalize';
import Spacing from '@/components/Spacing';
import CarouselView from '@/components/Crousel';
import AstroCard from '@/components/AstroCard';
import HomeHeader from '@/components/HomeHeader';
import SelectLanguage from '@/components/SelectLanguage';
import {useTranslation} from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {
  useActiveAstrologerCategoryMutation,
  useChangeStatusMutation,
  useCheckUserAlreadyInChatReqMutation,
  useGetActiveBlogsMutation,
  useGetAstrologersMutation,
  useGetBannerMutation,
  useGetPopUpAdMutation,
} from '@/redux/services/astroService';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/redux/store';
import FastImage from 'react-native-fast-image';
import {imgBaseurl} from '@/constants/constant';
import {
  updateChatFilter,
  updateFreeSessionBanner,
  updateIsHideAd,
} from '@/redux/slices/globalSlice';
import {HtmlText} from '@e-mine/react-native-html-text';
import AdBanner from '@/components/AdBanner';
import {StatusBar} from 'expo-status-bar';
import ToastMessage from '@/components/ToastMessage';
import LoaderModal from '@/components/LoaderModal';
import ChatWarningAlert from '@/components/ChatWarning';

type Props = {};

const categorySize = Dimensions.get('window').width / 4 - 20;

const HomeScreen = (props: Props) => {
  const {t} = useTranslation();
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const {isAuthenticated: isLoggedIn, user} = useSelector(
    (state: RootState) => state.auth,
  );
  const {showFreeSessionBanner, isHideAd} = useSelector(
    (state: RootState) => state.global,
  );
  const [getBanner] = useGetBannerMutation();
  const [getAstrologers, getAstrologersRes] = useGetAstrologersMutation();
  const [checkUserAlreadyInChatReq, checkUserAlreadyInChatReqRes] =
    useCheckUserAlreadyInChatReqMutation();
  const [getCategories, getCategoriesRes] =
    useActiveAstrologerCategoryMutation();
  const [changeStatus] = useChangeStatusMutation();
  const [getBlogs] = useGetActiveBlogsMutation();
  const [astroData, setAstroData] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [banners, setBanners] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isSelectLanguageModalOpen, setIsSelectLanguageModalOpen] =
    useState(false);
  const [getPopUpAd] = useGetPopUpAdMutation();
  const [popupAd, setPopUpAd] = useState(null);
  const [chatWarning, setChatWarning] = useState(false);

  const renderHeader = useCallback(() => {
    return (
      <>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('search')}
            style={styles.searchContainer}>
            <Ionicons
              name="search-outline"
              color={Colors.colorGrey}
              size={verticalScale(13)}
            />
            <Text style={styles.searchPlaceholder}>
              Search by name, language, category
            </Text>
          </TouchableOpacity>
          <Spacing height={normalize(16)} />
          {getCategoriesRes?.isLoading ? (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size={'large'} color={Colors.blackColor} />
            </View>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollContainer}>
              {categories?.map((item, index) => (
                <Pressable
                  onPress={() => {
                    dispatch(updateChatFilter(item));
                    navigation.navigate('drawer', {
                      screen: 'tab',
                      params: {
                        screen: 'chat-astrologer',
                        params: {category: item},
                      },
                    });
                  }}
                  key={item.id}
                  style={[styles.categoryWrapper, {borderWidth: 0}]}>
                  <FastImage
                    source={{uri: `${imgBaseurl}${item.image2}`}}
                    style={styles.categoryIcon}
                    resizeMode="contain"
                  />
                  <Text numberOfLines={1} style={styles.categoryName}>
                    {item.name}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          )}
          <Spacing height={normalize(14)} />
        </View>
        <Spacing height={Sizes.small} />
        <View style={{marginHorizontal: Sizes.small}}>
          <CarouselView images={banners} />
        </View>
        <Spacing height={Sizes.base} />
        <View style={styles.headingWrapper}>
          <ThemedText type="subtitle" style={styles.heading}>
            {t('Our')} {t('Astrologers')}
          </ThemedText>
          <Pressable
            onPress={() => {
              dispatch(updateChatFilter(undefined));
              navigation.navigate('drawer', {
                screen: 'tab',
                params: {
                  screen: 'chat-astrologer',
                  params: {category: undefined},
                },
              });
            }}>
            <Text style={styles.viewAllBtn}>View All</Text>
          </Pressable>
        </View>
      </>
    );
  }, [banners, categories]);

  const renderBlogs = ({item}: any) => {
    return (
      <View style={styles.blogCard}>
        <View style={styles.blogImage}>
          <FastImage
            source={{uri: `${imgBaseurl}${item.previewImage}`}}
            style={{height: '100%', width: '100%'}}
            resizeMode="cover"
          />
        </View>
        <Spacing height={8} />
        <Text numberOfLines={2} style={styles.blogTitle}>
          {item?.title}
        </Text>
        <Spacing height={10} />
        {/* <Text numberOfLines={2} style={styles.blogDesc}>
        {item?.description}
      </Text> */}
        <HtmlText
          style={styles.blogDesc}
          numberOfLines={2}
          ellipsizeMode="tail">
          {item?.description}
        </HtmlText>
        <TouchableOpacity
          onPress={() => navigation.navigate('blog', {data: item})}
          style={styles.buttonContainer}>
          <Text style={styles.chatText}>Read More</Text>
          <Ionicons
            name="arrow-forward-outline"
            color={Colors.colorOrange}
            size={normalize(22)}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderFooter = useCallback(() => {
    return (
      <>
        <ThemedText type="subtitle" style={styles.heading}>
          {t('All')} {t('Categories')}
        </ThemedText>
        <FlatList
          data={categories}
          horizontal
          renderItem={({item}) => (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.itemContainer}
              onPress={() => {
                dispatch(updateChatFilter(item));
                navigation.navigate('drawer', {
                  screen: 'tab',
                  params: {
                    screen: 'chat-astrologer',
                    params: {category: item},
                  },
                });
              }}>
              <View style={styles.iconWrapper}>
                <FastImage
                  source={{uri: `${imgBaseurl}${item.image}`}}
                  style={styles.icon}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.label}>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={{padding: 10}}
          showsHorizontalScrollIndicator={false}
        />

        <View style={styles.headingWrapper}>
          <ThemedText type="subtitle" style={styles.heading}>
            {t('Our')} {t('Blogs')}
          </ThemedText>
          <Pressable
            onPress={() => {
              navigation.navigate('blogs');
            }}>
            <Text style={styles.viewAllBtn}>View All</Text>
          </Pressable>
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={blogs}
          renderItem={renderBlogs}
          contentContainerStyle={{
            gap: normalize(12),
            paddingStart: normalize(12),
            paddingEnd: normalize(12),
          }}
        />
        <Spacing height={20} />
      </>
    );
  }, [categories, blogs]);

  useEffect(() => {
    let bodyContent: any = {
      startIndex: 0,
      fetchRecord: 5,
    };
    let popupBody: any = {};
    if (user) {
      bodyContent = {
        userId: user.id,
        ...bodyContent,
      };
      popupBody = {
        userId: user.id,
      };
    }
    getPopUpAd(popupBody)
      .unwrap()
      .then(res => {
        setPopUpAd(res?.recordList[0]?.PopupImage);
      })
      .catch(error => {
        console.log(error);
      });
    getAstrologers(bodyContent)
      .unwrap()
      .then(res => {
        setAstroData(res?.recordList || []);
      })
      .catch(err => {
        console.error('Error fetching astrologers data', err);
      });
    getCategories({})
      .unwrap()
      .then(res => {
        setCategories(res?.recordList || []);
      })
      .catch(err => {
        console.error('Error fetching categories', err);
      });
    getBanner({})
      .unwrap()
      .then(res => {
        setBanners(res?.recordList);
      })
      .catch(error => {
        console.log(error);
      });
    getBlogs({
      startIndex: 0,
      fetchRecord: 5,
    })
      .unwrap()
      .then(res => {
        setBlogs(res?.recordList);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const onPressChat = useCallback(async (item: any) => {
    if (!isLoggedIn) {
      navigation.navigate('login');
      return;
    } else {
      const userWalletAmount = user?.totalWalletAmount || 0;
      const isEligible =
        item.charge * 5 <= userWalletAmount || item.isFreeAvailable;
      if (item.isFreeAvailable && userWalletAmount == 0) {
        setChatWarning(true);
        return;
      }
      if (!isEligible) {
        Alert.alert(
          'Warning!',
          'Your wallet balance is low recharge your wallet.',
          [
            {
              text: 'Cancel',
              onPress: () => null,
              style: 'cancel',
            },
            {
              text: 'YES',
              onPress: () => null, //navigation.navigate('wallet')
            },
          ],
        );
        return;
      }
      const resultInChatReq = await checkUserAlreadyInChatReq({
        astorlogerId: item.id,
      }).unwrap();
      const isUserAlreadyInChatReq = resultInChatReq.recordList;
      if (isUserAlreadyInChatReq == false) {
        if (item.chatStatus?.toLowerCase() == 'online') {
          // og check is item.chatStatus == 'Online'
          if (item.chatWaitTime != null) {
            const waitTimeDiff =
              new Date(item.chatWaitTime).getTime() - Date.now();
            if (waitTimeDiff < 0) {
              await changeStatus({
                astrologerId: item.id,
                status: 'Online',
                waitTime: null,
              });
            }
          }
          navigation.navigate('chatForm', {
            astrologerId: item.id,
            astrologerName: item.name,
            astrologerImage: item.profileImage,
            isFreeAvailable: item.isFreeAvailable,
            freeChatDuration: item?.freeChatDuration,
            rate: item.charge,
            type: 'Chat',
          });
        } else {
          // Alert.alert(
          //   t('Chat Unavailable'),
          //   t('This astrologer is currently unavailable for chat.'),
          // );
          ToastMessage({
            message: 'This astrologer is currently unavailable for chat.',
          });
          return;
        }
      }
    }
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.whiteColor,
        paddingBottom: isHideAd ? 0 : normalize(82),
      }}>
      <StatusBar backgroundColor={Colors.orangeColor} />
      <HomeHeader
        openLanguageModal={setIsSelectLanguageModalOpen}
        walletAmount={user?.totalWalletAmount || 0}
        name={user?.name}
      />
      <FlatList
        data={astroData}
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
            onPressChat={() => onPressChat(item)}
            onPressProfile={() =>
              navigation.navigate('profile', {astrologerId: item.id})
            }
            chatWaitTime={item?.chatWaitTime}
            chatStatus={item?.chatStatus}
            callWaitTime={item?.callWaitTime}
            callStatus={item?.callStatus}
          />
        )}
        contentContainerStyle={{gap: Sizes.base}}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={() => {
          if (getAstrologersRes?.isLoading) {
            return (
              <ActivityIndicator
                size="large"
                color={Colors.colorOrange}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            );
          } else {
            return (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts.medium,
                    fontSize: Sizes.xmedium,
                    color: Colors.blackColor,
                  }}>
                  {t('No Astrologers found')}
                </Text>
              </View>
            );
          }
        }}
      />
      <SelectLanguage
        closeModal={setIsSelectLanguageModalOpen}
        isOpen={isSelectLanguageModalOpen}
      />
      {!isHideAd && (
        <View style={styles.bottomAdStyle}>
          <Ionicons
            name="close-circle-outline"
            size={normalize(26)}
            style={{position: 'absolute', top: 5, right: 10, zIndex: 999}}
            onPress={() => dispatch(updateIsHideAd())}
          />
          <View style={styles.appIconWrapper}>
            <FastImage
              source={Images.AppLogo}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          </View>
          <View style={{flex: 1, gap: 4}}>
            <Text style={styles.bottomAdText}>
              We <Text style={{color: Colors.colorOrange}}>Recommend</Text> our
              top Astrologers{'\n'}just for You at {'\u20B91'} only.
            </Text>
            <View style={{flexDirection: 'row', gap: verticalScale(12)}}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate('chats')}
                style={styles.adBtnContainer}>
                <Text style={styles.adBtnText}>chat now</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate('call')}
                style={styles.adBtnContainer}>
                <Text style={styles.adBtnText}>call now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      {popupAd && (
        <AdBanner
          isAdVisible={showFreeSessionBanner}
          closeModal={() => {
            dispatch(updateFreeSessionBanner());
          }}
          imageUrl={`${popupAd}`}
        />
      )}
      {chatWarning && <ChatWarningAlert visible={chatWarning} onClose={() => setChatWarning(false)} walletScreen={() => navigation.navigate('wallet')} />}
      <LoaderModal loading={checkUserAlreadyInChatReqRes?.isLoading} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    borderColor: Colors.colorGrey,
    marginHorizontal: normalize(Sizes.small),
    paddingVertical: normalize(10),
    paddingStart: normalize(14),
    borderRadius: Sizes.large,
    alignItems: 'center',
    backgroundColor: Colors.whiteColor,
  },
  searchPlaceholder: {
    color: Colors.colorGrey,
    fontSize: normalize(12),
    fontFamily: Fonts.regular,
    marginLeft: normalize(8),
    includeFontPadding: false,
    paddingTop: normalize(2),
  },
  itemContainer: {
    width: categorySize,
    alignItems: 'center',
    margin: 10,
  },
  iconWrapper: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: categorySize - 25,
    height: categorySize - 25,
  },
  label: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
  },
  scrollContainer: {
    gap: normalize(16),
    paddingStart: normalize(12),
    paddingEnd: normalize(12),
  },
  categoryName: {
    fontFamily: Fonts.medium,
    fontSize: normalize(11),
    color: Colors.blackColor,
    includeFontPadding: false,
    maxWidth: normalize(90),
    textAlign: 'center',
  },
  headerContainer: {
    backgroundColor: Colors.orangeColor,
    borderBottomLeftRadius: normalize(24),
    borderBottomRightRadius: normalize(24),
  },
  categoryWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryIcon: {
    height: verticalScale(30),
    width: verticalScale(30),
  },
  heading: {
    color: Colors.blackColor,
    paddingHorizontal: Sizes.small,
    fontSize: normalize(Sizes.xmedium),
    fontFamily: Fonts.medium,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.45,
    borderColor: Colors.colorOrange,
    borderRadius: 28,
    paddingVertical: 6,
    gap: normalize(4),
    backgroundColor: Colors.whiteColor,
    marginHorizontal: normalize(20),
    marginVertical: normalize(10),
  },
  chatText: {
    color: Colors.colorOrange,
    fontSize: normalize(13),
    fontFamily: Fonts.medium,
    includeFontPadding: false,
  },
  blogTitle: {
    color: Colors.blackColor,
    fontSize: normalize(13.5),
    fontFamily: Fonts.semibold,
    includeFontPadding: false,
    textAlign: 'center',
    maxWidth: verticalScale(180),
    lineHeight: normalize(20),
  },
  blogDesc: {
    color: Colors.colorGrey,
    fontSize: normalize(11.5),
    fontFamily: Fonts.regular,
    includeFontPadding: false,
    textAlign: 'left',
    maxWidth: verticalScale(200),
    lineHeight: normalize(20),
    paddingHorizontal: normalize(8),
  },
  blogCard: {
    borderWidth: 0.3,
    borderColor: Colors.colorGrey,
    borderRadius: normalize(12),
  },
  blogImage: {
    height: verticalScale(120),
    width: verticalScale(200),
    borderTopRightRadius: normalize(12),
    borderTopLeftRadius: normalize(12),
    overflow: 'hidden',
  },
  viewAllBtn: {
    fontFamily: Fonts.regular,
    color: Colors.colorOrange,
    fontSize: normalize(12),
    includeFontPadding: false,
    marginRight: normalize(12),
  },
  bottomAdStyle: {
    width: '100%',
    backgroundColor: '#fffce6', //'#fffce6'
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: normalize(4),
    flexDirection: 'row',
    gap: verticalScale(12),
    alignItems: 'center',
    paddingStart: normalize(16),
  },
  bottomAdText: {
    textTransform: 'capitalize',
    fontFamily: Fonts.semibold,
    fontSize: normalize(12),
    color: Colors.blackColor,
    lineHeight: 20,
  },
  adBtnContainer: {
    backgroundColor: Colors.colorOrange,
    paddingHorizontal: Sizes.medium,
    paddingVertical: 6,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  adBtnText: {
    textTransform: 'uppercase',
    fontFamily: Fonts.semibold,
    fontSize: normalize(11.5),
    color: Colors.whiteColor,
    includeFontPadding: false,
  },
  headingWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appIconWrapper: {
    height: verticalScale(45),
    width: verticalScale(45),
    borderRadius: normalize(40),
    overflow: 'hidden',
  },
});
