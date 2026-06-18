import {Colors, Images} from '@/assets';
import AstroCard from '@/components/AstroCard';
import Header from '@/components/Header';
import Spacing from '@/components/Spacing';
import ToastMessage from '@/components/ToastMessage';
import {
  useGetFollowedAstrologerMutation,
  useUnFollowAstrologerMutation,
} from '@/redux/services/astroService';
import {normalize, verticalScale} from '@/utils/normalize';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const FollowedAstrologer = () => {
  const navigation = useNavigation<any>();
  const inset = useSafeAreaInsets();
  const [getFollowedAstro, getFollowedAstroRes] =
    useGetFollowedAstrologerMutation();
  const [unFollow, unFollowRes] = useUnFollowAstrologerMutation();
  const [startIndex, setStartIndex] = useState(0);
  const [canLoadMore, setCanLoadMore] = useState(false);
  const [followedList, setFollowedList] = useState<any[]>([]);

  const getFollowedAstrologers = () => {
    let body = {
      startIndex: startIndex,
      fetchRecord: 10,
    };
    getFollowedAstro(body)
      .unwrap()
      .then(res => {
        console.log(res.recordList);
        if (startIndex == 0) {
          setFollowedList(res.recordList);
          if (res?.totalFollower > res.recordList.length) {
            setCanLoadMore(true);
          }
        } else if (res.recordList.length > 0) {
          setFollowedList(prev => [...prev, ...res.recordList]);
          if (
            res?.totalFollower >
            followedList.length + res.recordList.length
          ) {
            setCanLoadMore(true);
          } else {
            setCanLoadMore(false);
          }
        } else {
          setCanLoadMore(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getFollowedAstrologers();
    });
    return () => {
      setStartIndex(0);
      unsubscribe();
    };
  }, [startIndex]);

  const onReachEnd = () => {
    console.log('loading moree...');
    if (canLoadMore) {setStartIndex(prev => prev + 5);}
  };

  const unFollowAstro = (astroId: any) => {
    unFollow({astrologerId: astroId})
      .unwrap()
      .then(res => {
        if (res.status == 200) {
          ToastMessage({message: 'Unfollow successfully!'});
          let astroList = [...followedList];
          let astroIndex = astroList.findIndex(ele => ele.id == astroId);
          astroList.splice(astroIndex, 1);
          setFollowedList(astroList);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.orangeColor,
        paddingTop: inset.top,
        paddingBottom: inset.bottom,
      }}>
      <Header title="My Following" onPress={() => navigation.goBack()} />
      <View style={styles.listWrapper}>
        <FlatList
          data={followedList}
          renderItem={({item}) => (
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
              onPressProfile={() =>
                navigation.navigate('profile', {astrologer: item})
              }
              onPressUnfollow={() => unFollowAstro(item.id)}
            />
          )}
          contentContainerStyle={{marginTop: normalize(12), gap: normalize(12), paddingBottom: normalize(24)}}
          ListEmptyComponent={() => {
            if (!getFollowedAstroRes?.isLoading) {
              return (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <View
                    style={{
                      height: verticalScale(120),
                      width: verticalScale(120),
                    }}>
                    <FastImage
                      source={Images.noData}
                      style={{height: '100%', width: '100%'}}
                      resizeMode="cover"
                    />
                  </View>
                </View>
              );
            } else {
              return (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ActivityIndicator size={'large'} color={Colors.blackColor} />
                </View>
              );
            }
          }}
          onEndReached={onReachEnd}
          onEndReachedThreshold={0.8}
        />
      </View>
    </View>
  );
};

export default FollowedAstrologer;

const styles = StyleSheet.create({
  listWrapper: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
});
