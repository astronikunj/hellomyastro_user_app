import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors, Fonts, Images, Sizes} from '@/assets';
import {normalize, verticalScale} from '@/utils/normalize';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/store';

type Props = {
  openLanguageModal: Function;
  walletAmount: String;
  name?: String;
};

const HomeHeader = (props: Props) => {
  const navigation = useNavigation<any>();
  const inset = useSafeAreaInsets();
  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  return (
    <View style={[styles.container, {paddingTop: inset.top}]}>
      <View style={styles.leftContainer}>
        <Ionicons
          name="menu-outline"
          color={Colors.blackColor}
          size={verticalScale(Sizes.large)}
          onPress={() => navigation.openDrawer()}
        />
        <Text style={styles.logoText}>
          Hi {props.name ? props.name : 'Guest,'}
        </Text>
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity
          onPress={() => {
            if (isLoggedIn) {navigation.navigate('wallet');}
            else {navigation.navigate('login');}
            Alert.alert('Message', 'This service is not available right now!');
          }}
          style={{flexDirection: 'row', gap: normalize(Sizes.base)}}
          activeOpacity={0.7}>
          <Ionicons
            name="wallet-outline"
            color={Colors.blackColor}
            size={verticalScale(Sizes.medium)}
          />
          <View style={styles.walletContainer}>
            <Text
              style={styles.walletText}>{`\u20B9 ${props.walletAmount}`}</Text>
          </View>
        </TouchableOpacity>
        <Ionicons
          onPress={() => props.openLanguageModal(true)}
          name="language"
          color={Colors.blackColor}
          size={verticalScale(Sizes.medium)}
        />
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.orangeColor,
    paddingVertical: verticalScale(Sizes.base),
    paddingHorizontal: normalize(Sizes.small),
  },
  logoText: {
    color: Colors.blackColor,
    fontSize: normalize(Sizes.medium),
    fontFamily: Fonts.semibold,
    marginLeft: normalize(Sizes.small),
    textTransform: 'capitalize',
  },
  walletText: {
    color: Colors.blackColor,
    fontSize: normalize(Sizes.small),
    fontFamily: Fonts.medium,
    includeFontPadding: false,
  },
  leftContainer: {flexDirection: 'row', alignItems: 'center'},
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(Sizes.base),
  },
  walletContainer: {
    // backgroundColor: '#1fe045',
    paddingVertical: Sizes.base / 2.5,
    paddingHorizontal: Sizes.base,
    borderRadius: normalize(8),
    // borderWidth: 0.5,
    borderColor: Colors.colorGrey,
  },
});
