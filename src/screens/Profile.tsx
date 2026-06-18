import {Alert, Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors} from '@/assets';
import Header from '@/components/Header';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import UserDetail from '@/components/profile/UserDetail';
import About from '@/components/profile/About';
import Rating from '@/components/profile/Rating';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  useFollowAstrologerMutation,
  useGetAstrologerByIdMutation,
  useGetReviewMutation,
  useUnFollowAstrologerMutation,
} from '@/redux/services/astroService';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/store';
import ToastMessage from '@/components/ToastMessage';
import LoaderModal from '@/components/LoaderModal';

type Props = {};

const {width} = Dimensions.get('window');

const Profile = (props: Props) => {
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();
  const route = useRoute();
  const {astrologerId} = route.params as any;
  const {isAuthenticated, user} = useSelector((state: RootState) => state.auth);
  const [getAstroReview, getAstroReviewRes] = useGetReviewMutation();
  const [reviewList, setReviewList] = React.useState<any[]>([]);
  const [addFollowAstro] = useFollowAstrologerMutation();
  const [astroData, setAstroData] = React.useState<any>(null);
  const [getAstroById, getAstroByIdRes] = useGetAstrologerByIdMutation();
  const [isFollowAstro, setIsFollowAstro] = React.useState(false);
  const [unFollow, unFollowRes] = useUnFollowAstrologerMutation();

  React.useEffect(() => {
    if (astrologerId) {
      getAstroById({
        astrologerId: astrologerId,
        userId: user?.id,
      })
        .unwrap()
        .then(res => {
          setAstroData(res?.recordList[0]);
          setIsFollowAstro(res?.recordList[0]?.isFollow);
        })
        .catch(error => {
          console.log(error);
        });
      getAstroReview({astrologerId: astrologerId})
        .unwrap()
        .then(res => {
          setReviewList(res.recordList);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [astrologerId]);

  const followAstro = (astroId: any) => {
    if (isAuthenticated) {
      addFollowAstro({
        astrologerId: astroId,
      })
        .unwrap()
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            ToastMessage({message: 'Follow successfully!'});
            setIsFollowAstro(true);
          }
        })
        .catch(error => {
          console.log('follow astro error', error);
        });
    } else {
      Alert.alert('Please login to follow your favourite astrologer.');
    }
  };

  const unFollowAstro = (astroId: any) => {
    unFollow({astrologerId: astroId})
      .unwrap()
      .then(res => {
        if (res.status == 200) {
          ToastMessage({message: 'Unfollow successfully!'});
          setIsFollowAstro(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View
      style={[
        styles.container,
        {paddingTop: inset.top, paddingBottom: inset.bottom},
      ]}>
      <Header title="Profile" onPress={() => navigation.goBack()} />
      <ScrollView style={styles.innerContainer}>
        <UserDetail astro={astroData} onPressFollow={followAstro} onPressUnfollow={unFollowAstro} isFollow={isFollowAstro} />
        <About bio={astroData?.loginBio} />
        <Rating
          rating={astroData?.rating}
          reviewCount={astroData?.reviews}
          reviewList={reviewList}
          reviewLoading={getAstroReviewRes?.isLoading}
        />
      </ScrollView>
      <LoaderModal loading={getAstroByIdRes?.isLoading} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.orangeColor,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
});
