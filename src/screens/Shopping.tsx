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
import Header from '@/components/Header';
import {useGetLatestProductMutation} from '@/redux/services/productService';
import {imgBaseurl} from '@/constants/constant';
import {ThemedText} from '@/components/ThemedText';
import {Colors, Fonts, Images} from '@/assets';
import {normalize} from '@/utils/normalize';
import Spacing from '@/components/Spacing';
import LoaderModal from '@/components/LoaderModal';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const {width} = Dimensions.get('window');

type Props = {};

const ShoppingScreen = (props: Props) => {
  const navigation = useNavigation<any>();
  const inset = useSafeAreaInsets();
  const route = useRoute();
  const {name, categoryId} = route.params as {
    name: string;
    categoryId: string;
  };
  const [products, setProducts] = React.useState<any>([]);
  const [getProductByCategory, getProductByCategoryRes] =
    useGetLatestProductMutation();
  const getLatestProductData = async () => {
    try {
      const response = await getProductByCategory({
        productCategoryId: categoryId,
        startIndex: 0,
        fetchRecord: 8,
      }).unwrap();
      console.log('Category ID:', categoryId);
      setProducts(response?.recordList);
    } catch (error) {
      console.error('Error fetching latest product:', error);
    }
  };
  React.useEffect(() => {
    getLatestProductData();
  }, [categoryId]);

  const renderItem = ({item, index}: any) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('productDetail', {productId: item?.id})
        }
        activeOpacity={0.8}
        style={styles.productContainer}
        key={index}>
        <ImageBackground
          source={{uri: `${imgBaseurl}${item.productImage}`}}
          style={styles.imageStyle}
          resizeMode="cover">
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={{height: '100%'}}>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                padding: 10,
              }}>
              <ThemedText
                type="small"
                style={{color: Colors.whiteColor, fontSize: normalize(14)}}>
                {item?.name}
              </ThemedText>
              <ThemedText
                type="small"
                style={{
                  color: Colors.whiteColor,
                  fontSize: normalize(14),
                }}>{`\u20B9 ${item?.amount}`}</ThemedText>
            </View>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {paddingTop: inset.top, paddingBottom: inset.bottom},
      ]}>
      <Header title={name.toString()} onPress={() => navigation.goBack()} />
      <FlatList
        numColumns={2}
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item?.id}
        key={'category'}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: normalize(10)}}
        ListEmptyComponent={() => {
          if (getProductByCategoryRes?.isLoading) return null;
          if (getProductByCategoryRes?.error) return null;
          return (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Spacing height={normalize(100)} />
              <View style={{width: width * 0.8, height: width * 0.45}}>
                <Image
                  source={Images.noDataFound}
                  style={{width: '100%', height: '100%'}}
                  resizeMode="contain"
                  tintColor={Colors.colorGold}
                />
              </View>
              <ThemedText type="defaultSemiBold" style={styles.warning}>
                No Products Found For {'\n'} {name}
              </ThemedText>
            </View>
          );
        }}
        style={{backgroundColor: Colors.whiteColor, paddingTop: normalize(12)}}
      />
      <LoaderModal loading={getProductByCategoryRes?.isLoading} />
    </View>
  );
};

export default ShoppingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.orangeColor,
  },
  productContainer: {
    height: width * 0.6,
    width: width * 0.46,
    borderRadius: normalize(12),
    overflow: 'hidden',
    marginBottom: normalize(10),
  },
  imageStyle: {
    height: '100%',
    width: '100%',
  },
  warning: {
    color: Colors.blackColor,
    fontSize: normalize(16),
    textAlign: 'center',
    fontFamily: Fonts.semibold,
    textAlignVertical: 'center',
  },
});
