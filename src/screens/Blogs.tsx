import {Colors, Fonts} from '@/assets';
import Header from '@/components/Header';
import Spacing from '@/components/Spacing';
import {imgBaseurl} from '@/constants/constant';
import {useGetActiveBlogsMutation} from '@/redux/services/astroService';
import {normalize, verticalScale} from '@/utils/normalize';
import {HtmlText} from '@e-mine/react-native-html-text';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Blogs = () => {
  const navigation = useNavigation<any>();
  const inset = useSafeAreaInsets();
  const [blogs, setBlogs] = React.useState<any[]>([]);
  const [getBlogs] = useGetActiveBlogsMutation();
  const [isLoadMore, setIsLoadMore] = React.useState(false);
  const [isLoadMoreData, setIsLoadMoreData] = React.useState(false);
  const [startIndex, setStartIndex] = React.useState(0);
  const [fetchRecord, setFetchRecord] = React.useState(5);
  React.useEffect(() => {
    blogData(startIndex, fetchRecord);
  }, []);
  const blogData = (startIndex: number, fetchRecord: number) => {
    getBlogs({
      startIndex: startIndex,
      fetchRecord: fetchRecord,
    })
      .unwrap()
      .then(res => {
        console.log('blogs ', res);
        if (res?.recordList.length == 0) {
          setIsLoadMore(false);
          setIsLoadMoreData(false);
        } else {
          setBlogs(prev => [...prev, ...res?.recordList]);
          setIsLoadMore(true);
          setIsLoadMoreData(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const loadMoreData = () => {
    if (isLoadMore) {
      setIsLoadMoreData(true);
      blogData(startIndex + 5, fetchRecord);
      setStartIndex(prev => prev + 5);
    }
  };
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
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.orangeColor,
        paddingTop: inset.top,
        paddingBottom: inset.bottom,
      }}>
      <Header title="Blogs" onPress={() => navigation.goBack()} />

      <View
        style={{
          flex: 1,
          backgroundColor: Colors.whiteColor,
          paddingHorizontal: normalize(8),
        }}>
        <Spacing height={normalize(8)} />
        <FlatList
          data={blogs}
          renderItem={renderBlogs}
          contentContainerStyle={{gap: normalize(12)}}
          ListFooterComponent={() => {
            if (isLoadMoreData) {
              return (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ActivityIndicator
                    size={'large'}
                    color={Colors.orangeColor}
                  />
                </View>
              );
            }
            return null;
          }}
					onEndReached={loadMoreData}
					onEndReachedThreshold={0.8}
        />
        <Spacing height={normalize(8)} />
      </View>
    </View>
  );
};

export default Blogs;

const styles = StyleSheet.create({
  blogCard: {
    borderWidth: 0.3,
    borderColor: Colors.colorGrey,
    borderRadius: normalize(12),
  },
  blogImage: {
    height: verticalScale(120),
    width: '100%',
    borderTopRightRadius: normalize(12),
    borderTopLeftRadius: normalize(12),
    overflow: 'hidden',
  },
  blogTitle: {
    color: Colors.blackColor,
    fontSize: normalize(13.5),
    fontFamily: Fonts.semibold,
    includeFontPadding: false,
    textAlign: 'center',
    lineHeight: normalize(20),
  },
  blogDesc: {
    color: Colors.colorGrey,
    fontSize: normalize(11.5),
    fontFamily: Fonts.regular,
    includeFontPadding: false,
    textAlign: 'left',
    lineHeight: normalize(20),
    paddingHorizontal: normalize(8),
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
});
