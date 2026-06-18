import {Fonts} from '@/assets';
import CustomSafeArea from '@/components/CustomSafeArea';
import Header from '@/components/Header';
import {normalize} from '@/utils/normalize';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from 'react-native';

const RefundPolicyScreen = () => {
	const navigation = useNavigation();
  return (
    <CustomSafeArea>
			<Header title="Refund & Cancellation" onPress={() => navigation.goBack()} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}>

        <Text style={styles.subheading}>24 Hours Money Back Guarantee</Text>
        <Text style={styles.paragraph}>
          If you are not satisfied with our services, claim your refund within
          24 hours of the payment done by you on
          <Text
            style={styles.link}
            onPress={() => Linking.openURL('mailto:hellomyastro@gmail.com')}>
            {' '}
            hellomyastro@gmail.com
          </Text>
          . It will be either credited to your HelloMyAstro wallet or original
          payment source within 7 working days. Please note that refund will be
          processed only once for each user and no repetitive refund queries
          will be entertained. If you have claimed your refund once, then you
          will not be liable for any refund for further use of any of our
          services. It will be the sole discretion of HelloMyAstro to determine
          the credibility of a refund request and we hold the absolute right to
          accept or deny the same depending upon the nature of request.
        </Text>

        <Text style={styles.paragraph}>
          We are dedicated to delivering high-quality astrological consultation
          services. As these services are personalized and time-bound,
          replacements are not applicable.
        </Text>

        <Text style={styles.paragraph}>
          No refund or cancellation shall be processed in case the User provides
          incorrect information. The User agrees to be careful when providing
          any information related to their concern and re-check before they
          submit their concern and hire our Astrologers.
        </Text>

        <Text style={styles.paragraph}>
          We shall not process any refund or cancellation if the User provides a
          wrong contact number when opting for our ‘Talk To Astrologer’ feature.
          Our users are advised to keep their mobile numbers in full coverage
          area and answer the call when received. HelloMyAstro, in any way,
          will not be liable for any refund or cancellation for any call that
          gets connected.
        </Text>

        <Text style={styles.paragraph}>
          As of now ‘Talk to Astrologer’ service is only available in India,
          non-residents of India cannot claim any refund if they add money to
          their HelloMyAstro wallet to avail this service. HelloMyAstro holds
          no liability in such a case.
        </Text>

        <Text style={styles.paragraph}>
          Members/Users should not rely on or make any legal, health, financial
          or other important decisions based on the guidance provided by an
          Astrologer. HelloMyAstro holds no liability or responsibility about
          the accuracy and effects of the Astrological remedies suggested to you
          by the Astrologers. Taking the advice and consultation of the
          Astrologers on HelloMyAstro is completely on the Users' will and
          discretion. It is recommended for the members/users to use their
          discretion in such circumstances; HelloMyAstro will not issue any
          refund on such grounds.
        </Text>

        <Text style={styles.paragraph}>
          In case of payment failure or timeout due to any server or network
          related issues on Anytime Astro’ website/app or on the payment gateway
          page that is associated with HelloMyAstro, the User is required to
          check his/her bank account for any amount debited. If the amount is
          debited, then you should contact us at
          <Text
            style={styles.link}
            onPress={() => Linking.openURL('mailto:hellomyastro@gmail.com')}>
            {' '}
            hellomyastro@gmail.com
          </Text>
          to notify and confirm your payment. In case, the amount is not
          debited, you can try to process your payment request again.
        </Text>

        <Text style={styles.paragraph}>
          HelloMyAstro holds no liability in case you make multiple payments
          for one session with an Astrologer and the exceeding amount will be
          credited to your HelloMyAstro wallet. You will be charged only as per
          the service you have requested.
        </Text>

        <Text style={styles.paragraph}>
          It is the complete discretion of HelloMyAstro to refuse or cancel any
          Chat/Call session request made by the User for any reason whatsoever.
          Your request might get cancelled due to several reasons which include,
          without limitation, update in the pricing terms, unavailability of the
          service, or any other glitch. If the User has paid for a said service
          and it is cancelled, then the deducted amount will be credited to the
          User’s HelloMyAstro wallet.
        </Text>

        <Text style={styles.paragraph}>
          In case any user or member uses any sort of abusive and offensive
          language on the website and when interacting with our Astrologers in
          any way including but not limited to chats, calls, and messages, it
          will result in the termination of your HelloMyAstro Account & seizing
          of the entire amount present in your HelloMyAstro wallet. You will
          not be liable for any refund or claim in such circumstances.
        </Text>

        <Text style={styles.paragraph}>
          If any Member/User of HelloMyAstro violates any of the terms
          mentioned in our Terms of Use, then the account of that User will be
          terminated with immediate effect and the amount in the User’s Anytime
          Astro wallet will be seized and not be refunded.
        </Text>

        <Text style={styles.subheading}>
          Store Refund & Cancellation Policy
        </Text>
        <Text
          style={styles.link}
          onPress={() =>
            Linking.openURL('https://www.hellomyastro.com/puja/refund/')
          }>
          For Puja Services
        </Text>
        <Text
          style={styles.link}
          onPress={() =>
            Linking.openURL('https://www.hellomyastro.com/store-return/')
          }>
          For Gemstones
        </Text>

        <Text style={styles.subheading}>Contact Us</Text>
        <Text style={styles.paragraph}>
          In case of any questions, you can contact us at our Registered Office:
        </Text>
        <Text style={styles.paragraph}>
          HelloMyAstro{'\n'}
          187, Pushp Vihar, Modipuram{'\n'}
          Meerut, Uttar Pradesh, India{'\n'}
          Support Email:
          <Text
            style={styles.link}
            onPress={() => Linking.openURL('mailto:hellomyastro@gmail.com')}>
            {' '}
            hellomyastro@gmail.com
          </Text>
        </Text>
      </ScrollView>
    </CustomSafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingHorizontal: normalize(12),
  },
  heading: {
    fontSize: normalize(22),
    fontFamily: Fonts.semibold,
    marginBottom: 16,
    color: '#333',
  },
  subheading: {
    fontSize: normalize(16),
    fontFamily: Fonts.medium,
    marginTop: 20,
    marginBottom: 8,
    color: '#333',
  },
  paragraph: {
    fontSize: normalize(13),
    fontFamily: Fonts.regular,
    lineHeight: 20,
    color: '#555',
    marginBottom: 12,
  },
  link: {
    color: '#1e90ff',
    textDecorationLine: 'underline',
  },
});

export default RefundPolicyScreen;
