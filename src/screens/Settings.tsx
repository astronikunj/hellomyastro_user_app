import { Fonts } from '@/assets';
import CustomSafeArea from '@/components/CustomSafeArea';
import Header from '@/components/Header';
import {navigationRef} from '@/navigation/NavigationService';
import {logout} from '@/redux/slices/authSlice';
import { normalize } from '@/utils/normalize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useDispatch} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const list = [
    {id: 1, name: 'Terms & Conditions', route: 'term-condition'},
    {id: 2, name: 'Privacy Policy', route: 'privacy-policy'},
    {id: 3, name: 'Refund & Cancellation', route: 'refund-policy'},
  ];

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    dispatch(logout());
    navigation.reset({index: 0, routes: [{name: 'login'}]});
  };

  return (
    <CustomSafeArea>
      <View style={styles.container}>
        <Header title="Settings" onPress={() => navigationRef.goBack()} />

        <ScrollView>
          {/* List items */}
          {list.map((item, index) => (
            <TouchableOpacity
              onPress={() => navigationRef.navigate(item.route)}
              key={index}
              style={styles.item}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Ionicons name={'chevron-forward-outline'} size={20} color="#333"  />
            </TouchableOpacity>
          ))}

          {/* Logout */}
          <TouchableOpacity onPress={handleLogout} style={styles.item}>
            <Text style={[styles.itemText, {color: '#c62828'}]}>Logout</Text>
          </TouchableOpacity>

          {/* Delete account */}
          {/* <TouchableOpacity style={styles.deleteButton}>
            <Text style={styles.deleteText}>Delete my account</Text>
          </TouchableOpacity> */}
        </ScrollView>
      </View>
    </CustomSafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 60,
    backgroundColor: '#a5182f', // your red shade
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(13),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: normalize(14),
    fontFamily: Fonts.regular,
    color: '#333',
    includeFontPadding: false,
  },
  itemRight: {
    fontSize: 16,
    color: '#666',
  },
  deleteButton: {
    marginTop: 30,
    paddingVertical: 15,
    alignItems: 'center',
  },
  deleteText: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
