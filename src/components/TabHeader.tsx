import {Colors, Fonts} from '@/assets';
import {normalize} from '@/utils/normalize';
import React, {Dispatch, SetStateAction, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';

type Props = {
  activeTab: String;
  setActiveTab: Dispatch<SetStateAction<string>>
};

export const TABS = ['Chat', 'Call', 'Gift', 'Wallet', 'Orders'];

export default function TabHeader(props: Props) {
  const {activeTab, setActiveTab} = props;

  return (
    <View style={styles.container}>
      <FlatList
        data={TABS}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item}
        contentContainerStyle={styles.tabContainer}
        renderItem={({item}) => {
          const isActive = activeTab === item;
          return (
            <TouchableOpacity
              style={[styles.tab, isActive && styles.activeTab]}
              onPress={() => setActiveTab(item)}>
              <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: normalize(10),
    elevation: 2,
  },
  tabContainer: {
    paddingHorizontal: normalize(12),
  },
  tab: {
    paddingVertical: normalize(6),
    paddingHorizontal: normalize(20),
    borderRadius: normalize(20),
    backgroundColor: '#f2f2f2',
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: Colors.orangeColor,
  },
  tabText: {
    fontSize: normalize(14),
    color: '#555',
    fontFamily: Fonts.medium,
    includeFontPadding: false,
    lineHeight: normalize(22),
  },
  activeTabText: {
    fontSize: normalize(13),
    color: Colors.blackColor,
    fontFamily: Fonts.medium,
    includeFontPadding: false,
  },
});
