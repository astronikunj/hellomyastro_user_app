// components/CustomTabBar.tsx
import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors, Fonts, Images} from '@/assets';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {normalize} from '@/utils/normalize';

const iconsMap: Record<string, string> = {
  home: 'home',
  'chat-astrologer': 'chatbubbles',
  'live-astrologers': 'radio',
  'audio-call': 'call',
  remedies: 'diamond',
};

const labelMap: any = {
  home: 'Home',
  'chat-astrologer': 'Chat',
  'live-astrologers': 'Unlimited Chat',
  'audio-call': 'Call',
  remedies: 'Remedies',
};

const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const inset = useSafeAreaInsets();
  return (
    <View style={[styles.container, {paddingBottom: inset.bottom}]}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const iconName = iconsMap[route.name] || 'circle';
        const label = labelMap[route.name] || route.name;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tabButton}>
            {label == 'Remedies' ? (
              <Image
                source={Images.namaste}
                style={{height: normalize(25), width: normalize(25)}}
                tintColor={isFocused ? Colors.colorOrange : '#666'}
              />
            ) : (
              <Icon
                name={isFocused ? iconName : `${iconName}-outline`}
                size={normalize(22)}
                color={isFocused ? Colors.colorOrange : '#666'}
              />
            )}
            <Text style={[styles.label, isFocused && styles.activeLabel]}>
              {label.replace(/-/g, '\n')}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    justifyContent: 'space-around',
  },
  tabButton: {
    alignItems: 'center',
    flex: 1,
  },
  label: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
    fontFamily: Fonts.medium,
  },
  activeLabel: {
    color: Colors.colorOrange,
    fontWeight: '600',
  },
});

export default CustomTabBar;
