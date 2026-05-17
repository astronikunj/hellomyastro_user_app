// SupportScreen.tsx
import {Colors, Fonts} from '@/assets';
import Header from '@/components/Header';
import { navigationRef } from '@/navigation/NavigationService';
import {normalize} from '@/utils/normalize';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Linking,
  Platform,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {
  onBack?: () => void; // optional, wire to navigation.goBack()
};

const PHONE = '+919457759479';
const EMAIL = 'hellomyastro@gmail.com';
const WHATSAPP = '+919457759479';

const SupportScreen: React.FC<Props> = () => {
  const inset = useSafeAreaInsets();
  const route = useRoute() as any;
  const navigation = useNavigation<any>();
  const [tab, setTab] = useState<'customer' | 'assistant'>('customer');

  React.useEffect(() => {
    if (route.params?.initialTab) {
      setTab(route.params.initialTab);
    }
  }, [route.params]);

  return (
    <View
      style={[
        styles.screen,
        {paddingTop: inset.top, paddingBottom: inset.bottom},
      ]}>
      <Header title="Support" onPress={() => navigation.goBack()} />
      {/* Tabs */}
      <View style={styles.tabsRow}>
        <Pressable
          style={[styles.tabBtn, tab === 'customer' && styles.tabActive]}
          onPress={() => setTab('customer')}>
          <Text
            style={[
              styles.tabText,
              tab === 'customer' && styles.tabTextActive,
            ]}>
            Customer Support
          </Text>
        </Pressable>

        <Pressable
          style={[styles.tabBtn, tab === 'assistant' && styles.tabActive]}
          onPress={() => setTab('assistant')}>
          <Text
            style={[
              styles.tabText,
              tab === 'assistant' && styles.tabTextActive,
            ]}>
            Astrologer Assistant
          </Text>
        </Pressable>
      </View>
      {/* Content */}
      {tab === 'customer' ? <CustomerSupport /> : <AstrologerAssistant />}
    </View>
  );
};

const CustomerSupport = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tell us how we can help</Text>
      <Text style={styles.subtitle}>
        Our crew members are standing by service & support!
      </Text>

      <Card
        title="Phone Call"
        subtitle="Call us 24x7, we will answer you!"
        actionText={PHONE}
        onPress={() => Linking.openURL(`tel:${PHONE}`)}
      />

      <Card
        title="Email"
        subtitle="Get solutions beamed to your inbox!"
        actionText={EMAIL}
        onPress={() => Linking.openURL(`mailto:${EMAIL}`)}
      />

      <Card
        title="WhatsApp Chat"
        subtitle="Start a conversation on WhatsApp now!"
        actionText={WHATSAPP}
        onPress={() =>
          Linking.openURL(`https://wa.me/${WHATSAPP.replace('+', '')}`)
        }
      />

      <Text style={styles.footerText}>
        Still in need of assistance? Please feel free to reach out to the
        Support Team and we will be happy to assist!
      </Text>

      <Pressable style={styles.callbackButton} onPress={() => navigationRef.navigate('raise-ticket')}>
        <Text style={styles.callbackText}>Raised a ticket</Text>
      </Pressable>
    </ScrollView>
  );
};

const AstrologerAssistant = () => (
  <View style={styles.emptyTab}>
    <Text style={{color: '#777'}}>Coming soon…</Text>
  </View>
);

type CardProps = {
  title: string;
  subtitle: string;
  actionText: string;
  onPress: () => void;
};

const Card: React.FC<CardProps> = ({title, subtitle, actionText, onPress}) => (
  <Pressable style={styles.card} onPress={onPress}>
    <View style={{flex: 1}}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
      <Text style={styles.link}>{actionText}</Text>
    </View>
    <Text style={styles.chevron}>›</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.orangeColor,
  },
  tabsRow: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e9e9e9',
    backgroundColor: Colors.whiteColor,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#111',
  },
  tabText: {
    fontSize: normalize(13),
    color: '#777',
    fontFamily: Fonts.semibold,
    includeFontPadding: false,
  },
  tabTextActive: {color: '#111'},
  container: {
    flex: 1,
    padding: normalize(13),
    backgroundColor: Colors.whiteColor,
  },
  title: {
    fontSize: normalize(20),
    textAlign: 'center',
    marginTop: 6,
    color: '#111',
    fontFamily: Fonts.bold,
    includeFontPadding: false,
  },
  subtitle: {
    fontSize: normalize(13),
    textAlign: 'center',
    color: '#777',
    marginTop: 4,
    marginBottom: normalize(16),
    fontFamily: Fonts.regular,
    includeFontPadding: false,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: normalize(14),
    borderRadius: normalize(6),
    marginBottom: normalize(12),
    ...(Platform.OS === 'android'
      ? {elevation: 3}
      : {
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 8,
          shadowOffset: {width: 0, height: 3},
        }),
  },
  cardTitle: {
    fontSize: normalize(16),
    color: '#111',
    fontFamily: Fonts.semibold,
    includeFontPadding: false,
    lineHeight: normalize(22),
  },
  cardSubtitle: {
    fontSize: normalize(14),
    color: '#777',
    fontFamily: Fonts.regular,
    includeFontPadding: false,
    lineHeight: normalize(22),
  },
  link: {
    fontSize: normalize(15),
    color: '#16a34a',
    marginTop: normalize(2),
    fontFamily: Fonts.medium,
    includeFontPadding: false,
    lineHeight: normalize(22),
  },
  chevron: {
    fontSize: normalize(30),
    marginLeft: normalize(10),
    color: '#999',
    lineHeight: normalize(30),
  },

  footerText: {
    fontSize: normalize(13),
    color: '#777',
    textAlign: 'center',
    marginVertical: normalize(18),
    fontFamily: Fonts.regular,
    includeFontPadding: false,
    lineHeight: normalize(18),
  },
  callbackButton: {
    backgroundColor: '#ff8c00',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  callbackText: {
    color: '#fff',
    fontSize: normalize(14),
    fontFamily: Fonts.semibold,
    includeFontPadding: false,
    lineHeight: normalize(22),
  },

  emptyTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.whiteColor,
  },
});

export default SupportScreen;
