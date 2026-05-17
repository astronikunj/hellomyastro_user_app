import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Header from '@/components/Header';
import {Colors, Fonts} from '@/assets';

type Props = {};

const LiveAstrologers = (props: Props) => {
  const inset = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        paddingTop: inset.top,
        backgroundColor: Colors.orangeColor,
      }}>
      <Header title="Live Stream" />
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.whiteColor,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: Colors.whiteColor,
            padding: 20,
            borderRadius: 10,
            elevation: 8,
          }}>
          <Text style={{
						fontSize: 20,
						fontFamily: Fonts.bold,
						color: Colors.blackColor,
						marginBottom: 10,
					}}>We are working on Live</Text>
					<Text style={{
						fontFamily: Fonts.regular,
						color: Colors.blackColor,
					}}>We are working on it, coming soon...</Text>
        </View>
      </View>
    </View>
  );
};

export default LiveAstrologers;

const styles = StyleSheet.create({});
