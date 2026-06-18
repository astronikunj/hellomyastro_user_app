import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Colors, Fonts} from '@/assets';
import {normalize, verticalScale} from '@/utils/normalize';
import {useGetProductByIdMutation} from '@/redux/services/productService';
import {imgBaseurl} from '@/constants/constant';
import Spacing from '@/components/Spacing';
import LoaderModal from '@/components/LoaderModal';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {};

const {width} = Dimensions.get('window');
const WHATSAPP = '+919457759479';

const ProductDetail = (props: Props) => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const inset = useSafeAreaInsets();
  const {productId} = route.params as {productId: string};
  console.log('Product ID:', productId);
  const [productDetail, setProductDetail] = React.useState<any>([]);
  const [getProductById, getProductByIdRes] = useGetProductByIdMutation();
  const getProductByIdData = async () => {
    try {
      const response = await getProductById({
        id: productId,
      }).unwrap();
      console.log('Product Detail Response:', JSON.stringify(response));
      setProductDetail(response?.recordList[0]);
    } catch (error) {
      console.error('Error fetching product categories:', error);
    }
  };
  React.useEffect(() => {
    getProductByIdData();
  }, [productId]);
  return (
    <View style={[styles.container, {paddingTop: inset.top, paddingBottom: inset.bottom}]}>
      <View style={styles.headerContainer}>
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back"
          size={normalize(22)}
          color="black"
        />
        <Text style={styles.headerText}>Product Detail</Text>
      </View>
      <ScrollView contentContainerStyle={{paddingBottom: normalize(60)}}>
        <View>
          <View style={styles.imageContainer}>
            <Image
              source={{uri: `${imgBaseurl}${productDetail?.productImage}`}}
              style={{width: '100%', height: '100%'}}
              resizeMode="cover"
            />
          </View>
          <Spacing height={verticalScale(8)} />
          <View style={{paddingHorizontal: normalize(13)}}>
            <Text style={styles.productName}>{productDetail?.name}</Text>
            <Spacing height={verticalScale(2)} />
            <Text
              style={
                styles.productName
              }>{`\u20B9 ${productDetail?.amount}`}</Text>
            <Spacing height={verticalScale(2)} />
            <Text style={styles.productDesc}>{productDetail?.features}</Text>
            <View style={styles.divider} />
            <View style={{paddingTop: normalize(6)}}>
              {productDetail?.questionAnswer?.length > 0 && (
                <Text style={styles.faqHeading}>FAQs</Text>
              )}
              <Spacing height={verticalScale(6)} />
              {productDetail?.questionAnswer?.map(
                (item: any, index: number) => {
                  return (
                    <View key={index}>
                      <Text style={styles.questionStyle}>{`${index + 1}. ${
                        item?.question
                      }`}</Text>
                      <Text style={styles.productDesc}>{item?.answer}</Text>
                    </View>
                  );
                },
              )}
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={[styles.buttonContainer, {bottom: inset.bottom}]}>
        {/* <TouchableOpacity activeOpacity={0.8} style={styles.button}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity> */}
        <TouchableOpacity activeOpacity={0.8} style={styles.button}
        onPress={() =>
          Linking.openURL(`https://wa.me/${WHATSAPP.replace('+', '')}`)
        }
        >
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
      <LoaderModal loading={getProductByIdRes?.isLoading} />
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: Colors.whiteColor,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
  },
  headerText: {
    color: Colors.blackColor,
    fontSize: normalize(16.5),
    fontFamily: Fonts.semibold,
    includeFontPadding: false,
    paddingLeft: 10,
  },
  imageContainer: {
    width: width * 0.93,
    height: verticalScale(175),
    backgroundColor: Colors.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: normalize(12),
    overflow: 'hidden',
    marginTop: verticalScale(8),
    borderWidth: 0.5,
    borderColor: Colors.lightGrey,
  },
  productName: {
    color: Colors.blackColor,
    fontFamily: Fonts.medium,
    fontSize: normalize(16),
    includeFontPadding: false,
  },
  productDesc: {
    fontSize: normalize(14),
    color: Colors.colorGrey,
    fontFamily: Fonts.medium,
  },
  faqHeading: {
    color: Colors.blackColor,
    fontFamily: Fonts.regular,
    fontSize: normalize(16),
    fontWeight: '700',
    includeFontPadding: false,
  },
  questionStyle: {
    color: Colors.blackColor,
    fontSize: normalize(15),
    fontFamily: Fonts.medium,
    fontWeight: '600',
    includeFontPadding: false,
  },
  divider: {
    width: width - normalize(26),
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.colorGrey,
    marginVertical: normalize(4),
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.colorOrange,
    justifyContent: 'center',
    paddingVertical: verticalScale(7),
    width: width * 0.85,
    borderRadius: normalize(8),
    gap: normalize(10),
  },
  buttonText: {
    color: Colors.whiteColor,
    fontSize: normalize(16.5),
    fontFamily: Fonts.semibold,
    fontWeight: '600',
    includeFontPadding: false,
  },
  buttonContainer: {
    paddingHorizontal: normalize(10),
    paddingVertical: verticalScale(5),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.lightGrey,
    position: 'absolute',
    width: width,
  },
});
