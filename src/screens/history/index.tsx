import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors, Fonts, Images} from '@/assets';
import Header from '@/components/Header';
import {useGetHistoryMutation} from '@/redux/services/astroService';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/store';
import {useNavigation} from '@react-navigation/native';
import LoaderModal from '@/components/LoaderModal';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {imgBaseurl} from '@/constants/constant';
import {normalize, verticalScale} from '@/utils/normalize';
import TabHeader from '@/components/TabHeader';
import moment from 'moment';

type Props = {};

const UserHistory = (props: Props) => {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const user = useSelector((state: RootState) => state.auth.user);
  const [getHistory, getHistoryRes] = useGetHistoryMutation();
  const [activeTab, setActiveTab] = useState('Chat');
  const [chatHistoryData, setChatHistoryData] = useState([]);
  const [callHistoryData, setCallHistoryData] = useState([]);
  const [walletHistoryData, setWalletHistoryData] = useState([]);
  const [giftsHistoryData, setGiftsHistoryData] = useState([]);
  const [orderHistoryData, setOrderHistoryData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  const getUserHistory = async () => {
    try {
      const body = {
        userId: user.id,
        startIndex: startIndex,
        fetchRecord: 20,
      };
      const res = await getHistory(body).unwrap();
      const chatHistory = res.recordList[0]['chatRequest']['chatHistory'];
      const callHistory = res.recordList[0]['callRequest']['callHistory'];
      const walletHistory = res.recordList[0]['walletTransaction']['wallet'];
      const giftHistory = res.recordList[0]['sendGifts']['gifts'];
      const orderHistory = res.recordList[0]['orders']['order'];
      if (chatHistory.length > 0) {
        setChatHistoryData(chatHistory);
      }
      if (callHistory.length > 0) {
        setCallHistoryData(callHistory);
      }
      if (walletHistory.length > 0) {
        setWalletHistoryData(walletHistory);
      }
      if (giftHistory.length > 0) {
        setGiftsHistoryData(giftHistory);
      }
      if (orderHistory.length > 0) {
        setOrderHistoryData(orderHistory);
      }
    } catch (error) {
      console.log('Error while fetching details', error);
    }
  };

  useEffect(() => {
    const sub = navigation.addListener('focus', () => {
      getUserHistory();
    });
    return () => sub();
  }, []);

  const onReadChat = (
    chatId: any,
    astrologerId: any,
    profileImage: any,
    name: any,
  ) => {
    navigation.navigate('chatHistory', {
      chatId: chatId,
      astrologerId: astrologerId,
      astroProfile: profileImage,
      astrologerName: name,
    });
  };

  const ChatItem = ({item}: any) => {
    const minutes = Math.floor(item.chat_duration / 60);
    return (
      <View style={styles.card}>
        <FastImage
          source={{uri: `${imgBaseurl}${item.profileImage}`}}
          style={styles.avatar}
        />
        <View style={styles.content}>
          <Text style={styles.name}>{item.astrologerName}</Text>

          <View style={styles.row}>
            <MaterialIcons name="chat" size={16} color="#6b7280" />
            <Text style={styles.info}>Status: {item.chatStatus}</Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="time-outline" size={16} color="#6b7280" />
            <Text style={styles.info}>Duration: {item?.totalMin} min</Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="wallet-outline" size={16} color="#6b7280" />
            <Text style={[styles.info, item.isFreeSession && styles.freeText]}>
              {item.isFreeSession ? 'Free Session' : `₹${item.deduction}`}
            </Text>
          </View>

          <View style={styles.content}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                onReadChat(
                  item.chatId,
                  item.astrologerId,
                  item.profileImage,
                  item.astrologerName,
                )
              }>
              <Text style={styles.buttonText}>Read Chat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const WalletItem = ({item}: any) => {
    return (
      <View style={[styles.card, {flexDirection: 'column'}]}>
        {/* Top Row: Name + Transaction Type */}
        <View style={styles.row}>
          <Text style={styles.name}>{item.name}</Text>
          <Text
            style={[styles.type, item.isCredit ? styles.credit : styles.debit]}>
            {item.transactionType}
          </Text>
        </View>

        {/* Middle Row: Amount */}
        <Text style={styles.amount}>
          {item.isCredit ? `+₹${item.amount}` : `-₹${item.amount}`}
        </Text>

        {/* Bottom Row: Date & Order ID */}
        <View style={styles.row}>
          <Text style={styles.date}>
            { moment(item.created_at).format('DD MMMM, YYYY')}{' '}
            {moment(item.created_at).format('HH:mm A')}
          </Text>
          <Text style={styles.orderId}>Order #{item.orderId}</Text>
        </View>
      </View>
    );
  };

  const CallItem = ({item}: any) => {
    return (
      <View>

      </View>
    )
  }

  const GiftItem = ({item}: any) => {
    return (
      <View>
        
      </View>
    )
  }

  const OrderItem = ({item}: any) => {
    return (
      <View>
        
      </View>
    )
  }

  const renderItem = ({item}: any) => {
    if (activeTab === 'Chat') return <ChatItem item={item} />;
    if (activeTab === 'Call') return <CallItem item={item} />;
    if (activeTab === 'Gift') return <GiftItem item={item} />;
    if (activeTab === 'Wallet') return <WalletItem item={item} />;
    if (activeTab === 'Orders') return <OrderItem item={item} />;
    return null;
  };

  const data =
    activeTab === 'Chat'
      ? chatHistoryData
      : activeTab === 'Call'
      ? callHistoryData
      : activeTab === 'Gift'
      ? giftsHistoryData
      : activeTab === 'Wallet'
      ? walletHistoryData
      : activeTab === 'Orders'
      ? orderHistoryData
      : [];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.colorGold,
        paddingTop: inset.top,
        paddingBottom: inset.bottom,
      }}>
      <Header
        title="History"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.whiteColor,
        }}>
        <TabHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        <FlatList
          data={data}
          keyExtractor={(item: any) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{padding: 16}}
          ListEmptyComponent={() => {
            if (!getHistoryRes?.isLoading) {
              return (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <View
                    style={{
                      height: verticalScale(120),
                      width: verticalScale(120),
                    }}>
                    <FastImage
                      source={Images.noData}
                      style={{height: '100%', width: '100%'}}
                      resizeMode="cover"
                    />
                  </View>
                </View>
              );
            } else {
              return (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ActivityIndicator size={'large'} color={Colors.blackColor} />
                </View>
              );
            }
          }}
        />
      </View>
      <LoaderModal loading={getHistoryRes?.isLoading} />
    </View>
  );
};

export default UserHistory;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: normalize(10),
    borderWidth: 0.3,
    borderColor: '#333',
    padding: normalize(12),
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#aaa',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 3},
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
    backgroundColor: '#e5e7eb',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: normalize(16),
    marginBottom: 4,
    color: Colors.blackColor,
    fontFamily: Fonts.medium,
    includeFontPadding: false,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  info: {
    marginLeft: normalize(6),
    color: '#6b7280',
    fontSize: normalize(14),
    fontFamily: Fonts.regular,
    includeFontPadding: false,
  },
  freeText: {
    color: '#10b981', // emerald green for free sessions
    fontWeight: '500',
  },
  button: {
    marginTop: 10,
    backgroundColor: Colors.colorOrange, // Indigo
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontSize: normalize(12),
    fontFamily: Fonts.medium,
    includeFontPadding: false,
  },
  type: {
    marginLeft: normalize(12),
    fontSize: normalize(12),
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(2),
    borderRadius: normalize(22),
    fontFamily: Fonts.semibold,
    includeFontPadding: false,
    lineHeight: normalize(22)
  },
  credit: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  debit: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
  },
  amount: {
    fontSize: normalize(18),
    color: Colors.blackColor,
    fontFamily: Fonts.semibold,
    includeFontPadding: false,
    lineHeight: normalize(22)
  },
  date: {
    fontSize: normalize(12),
    color: '#666',
    fontFamily: Fonts.medium,
    includeFontPadding: false,
    lineHeight: normalize(22)
  },
  orderId: {
    marginLeft: normalize(12),
    fontSize: normalize(12),
    fontFamily: Fonts.medium,
    includeFontPadding: false,
    lineHeight: normalize(22),
    color: '#007bff',
  },
});
