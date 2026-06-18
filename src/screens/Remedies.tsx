import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
	Image,
	ImageBackground,
} from 'react-native';
import React from 'react';
import { Colors, Fonts } from '@/assets';
import {
  useGetLatestProductMutation,
  useGetProductCategoriesMutation,
} from '@/redux/services/productService';
import { imgBaseurl } from '@/constants/constant';
import { normalize, verticalScale } from '@/utils/normalize';
import LoaderModal from '@/components/LoaderModal';
import { ThemedText } from '@/components/ThemedText';
import Spacing from '@/components/Spacing';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '@/components/Header';
type Props = {};

const { width } = Dimensions.get('window');

const RemediesScreen = (props: Props) => {
  const navigation = useNavigation<any>();
  const inset = useSafeAreaInsets();
  const [categories, setCategories] = React.useState<any>([]);
  const [latestProduct, setLatestProduct] = React.useState<any>([]);
  const [getProductCategories, getProductCategoriesRes] =
    useGetProductCategoriesMutation();
  const [getLatestProduct, getLatestProductRes] = useGetLatestProductMutation();
  const getProductCategoriesData = async () => {
    try {
      const response = await getProductCategories({
        startIndex: 0,
        fetchRecord: 20,
      }).unwrap();
      setCategories(response?.recordList);
    } catch (error) {
      console.error('Error fetching product categories:', error);
    }
  };
  const getLatestProductData = async () => {
    try {
      const response = await getLatestProduct({
        startIndex: 0,
        fetchRecord: 6,
      }).unwrap();
      setLatestProduct(response?.recordList);
    } catch (error) {
      console.error('Error fetching latest product:', error);
    }
  };
  React.useEffect(() => {
    getProductCategoriesData();
    getLatestProductData();
  }, []);
  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('shopping', { categoryId: item?.id, name: item?.name })
        }
        activeOpacity={0.8}
        key={item?.id}
        style={styles.categoryContainer}
      >
        <View style={styles.categoryImageContainer}>
          <Image
            source={{uri: `${imgBaseurl}${item?.categoryImage}`}}
            style={styles.imageStyle}
            resizeMode="cover"
            alt="categoryImage"
          />
        </View>
        <Text numberOfLines={2} style={styles.categoryName}>
          {item?.name}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderHeader = () => {
    return (
      <View>
        <Header title="Shopping Mall" />
        <ThemedText type="defaultSemiBold" style={styles.headingText}>
          Most Popular
        </ThemedText>
        <Spacing height={verticalScale(8)} />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {latestProduct?.map((item: any, index: number) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('productDetail', { productId: item?.id })
                }
                activeOpacity={0.8}
                style={styles.productContainer}
                key={index}
              >
                <ImageBackground
                  source={{uri: `${imgBaseurl}${item.productImage}`}}
                  style={styles.imageStyle}
                  resizeMode="cover"
                >
                  <LinearGradient
                    // Background Linear Gradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={{ height: '100%' }}
                  >
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        padding: 10,
                      }}
                    >
                      <ThemedText
                        type="small"
                        style={{ color: Colors.whiteColor }}
                      >
                        {item?.name}
                      </ThemedText>
                      <ThemedText
                        type="small"
                        style={{ color: Colors.whiteColor }}
                      >{`\u20B9 ${item?.amount}`}</ThemedText>
                    </View>
                  </LinearGradient>
                </ImageBackground>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <Spacing height={verticalScale(8)} />
        <ThemedText type="defaultSemiBold" style={styles.headingText}>
          Explore all categories
        </ThemedText>
      </View>
    );
  };
  return (
    <View style={{ backgroundColor: Colors.orangeColor, flex: 1, paddingTop: inset.top  }}>
      <FlatList
        numColumns={3}
        key={3}
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item?.id}
        contentContainerStyle={{
          paddingHorizontal: normalize(0),
        }}
        columnWrapperStyle={{
          gap: normalize(10),
          paddingStart: normalize(10),
        }}
        style={{backgroundColor: Colors.whiteColor}}
        ListHeaderComponent={renderHeader}
      />
      <LoaderModal loading={getProductCategoriesRes.isLoading} />
    </View>
  );
};

export default RemediesScreen;

const styles = StyleSheet.create({
  categoryContainer: {
    backgroundColor: Colors.whiteColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(8),
    height: width * 0.3,
    width: width * 0.3,
    borderWidth: 0.3,
    borderColor: Colors.lightGrey,
    borderRadius: 10,
    elevation: 2,
  },
  categoryImageContainer: {
    height: width * 0.2,
    width: width * 0.2,
    borderRadius: width * 0.2,
    overflow: 'hidden',
  },
  categoryName: {
    color: Colors.blackColor,
    fontSize: normalize(12),
    fontFamily: Fonts.regular,
    fontWeight: '500',
    maxWidth: width * 0.3,
  },
  imageStyle: {
    height: '100%',
    width: '100%',
  },
  headingText: {
    paddingStart: normalize(8),
    paddingTop: 10,
    fontSize: normalize(16),
    color: Colors.blackColor,
    fontFamily: Fonts.regular,
    fontWeight: '600',
  },
  scrollContainer: {
    gap: 10,
    paddingStart: normalize(8),
    paddingEnd: normalize(8),
  },
  productContainer: {
    height: width * 0.55,
    width: width * 0.4,
    borderRadius: normalize(12),
    overflow: 'hidden',
  },
});
