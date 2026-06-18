import React from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {WebView} from 'react-native-webview';

type Props = {
  url?: any;
};

const PaymentScreen = (props: Props) => {
  const inset = useSafeAreaInsets();
  return (
    <View style={{flex: 1, paddingTop: inset.top, paddingBottom: inset.bottom}}>
      <WebView source={{uri: 'https://www.hellomyastro.com/payment?payid=34'}} style={{flex: 1}} />
    </View>
  );
};

export default PaymentScreen;
