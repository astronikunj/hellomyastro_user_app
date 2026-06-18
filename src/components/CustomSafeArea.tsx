import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/assets';

const CustomSafeArea = ({children}: any) => {
    const inset = useSafeAreaInsets();
  return (
    <View style={{
        flex: 1,
        backgroundColor: Colors.orangeColor,
        paddingTop: inset.top,
        paddingBottom: inset.bottom,
    }}>
      {children}
    </View>
  );
};

export default CustomSafeArea;

const styles = StyleSheet.create({});
