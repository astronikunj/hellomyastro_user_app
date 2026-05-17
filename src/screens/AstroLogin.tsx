import React from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {WebView} from 'react-native-webview';

const AstroLogin = () => {
  const inset = useSafeAreaInsets();
  return (
    <View style={{flex: 1, paddingTop: inset.top, paddingBottom: inset.bottom}}>
      <WebView
        source={{uri: 'https://hellomyastro.com/astrologer/login'}}
        style={{flex: 1}}
      />
    </View>
  );
};

export default AstroLogin;
