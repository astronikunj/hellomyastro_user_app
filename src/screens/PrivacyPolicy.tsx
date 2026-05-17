import { Fonts } from '@/assets';
import CustomSafeArea from '@/components/CustomSafeArea';
import Header from '@/components/Header';
import { normalize } from '@/utils/normalize';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {ScrollView, Text, View, StyleSheet} from 'react-native';

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation()
  return (
    <CustomSafeArea>
      <Header title="Privacy Policy" onPress={() => navigation.goBack()} />
      <ScrollView style={styles.container}>

        <Text style={styles.content}>
          HelloMyAstro (also known as www.hellomyastro.com) is committed
          to protecting the privacy of its users. Please read this privacy
          policy carefully to understand how we use the information you provide.
          {'\n\n'}
          This Privacy Policy is published in accordance with:
          {'\n\n'}• The Information Technology (Intermediaries Guidelines)
          Rules, 2011
          {'\n'}• The Information Technology (Reasonable Security Practices and
          Procedures and Sensitive Personal Data or Information) Rules, 2011
          {'\n\n'}
          These rules require the publication of a privacy policy for the
          collection, use, storage, and transfer of sensitive personal data or
          information.
        </Text>

        <Text style={styles.heading}>User's Consent</Text>
        <Text style={styles.content}>
          This Privacy Policy, which may be updated or amended from time to
          time, covers the collection of personal identification, contact
          details, birth details, personal information, work information, and
          any forecasts made using the supplied information. By accessing and
          using the website, you indicate that you understand and consent to
          this privacy policy. If you do not agree with the terms, please do not
          use this website.
          {'\n\n'}
          Your continued use of the website confirms your unconditional consent
          to the collection, maintenance, use, processing, and disclosure of
          your personal and other information as described in this Privacy
          Policy.
          {'\n\n'}
          This Privacy Policy should be read in conjunction with the respective
          Terms of Use or other terms and conditions as provided on the Website.
        </Text>

        <Text style={styles.heading}>Collection of Personal Information</Text>
        <Text style={styles.content}>
          Creating a user profile with us involves providing specific
          information. The mandatory details include your phone number for OTP
          (One-Time Password) verification, necessary for securing the
          registration process. Additionally, you are required to provide your
          first name, last name, date of birth (DOB), and place of birth. The
          date of birth is optional and not mandatory for registration.
        </Text>

        <Text style={styles.heading}>
          Purpose and Use of Data/Information Collection
        </Text>
        <Text style={styles.content}>
          The information collected is used to create a personalized user
          profile tailored to your specific needs and preferences. If you choose
          not to provide your date of birth or email ID, it will not hinder the
          registration process, and you will still be able to access the
          services offered using your verified phone number.
        </Text>

        <Text style={styles.heading}>Sign-out Option</Text>
        <Text style={styles.content}>
          If you wish to hide or deactivate your profile, you can simply sign
          out. Once signed out, your profile will become invisible and will no
          longer be used on the platform. We ensure that your profile data will
          not be accessed, and your information will remain secure.
        </Text>

        <Text style={styles.heading}>Unused and Unlogged Profiles</Text>
        <Text style={styles.content}>
          Any profile that remains unused or unlogged for six months will be
          automatically deleted by us.
        </Text>

        <Text style={styles.heading}>COMMITMENT</Text>
        <Text style={styles.content}>
          We are committed to protecting the privacy of all users, whether
          registered or visiting. It is recommended that all users understand
          what types of personally identifiable information are collected. While
          we use this information for certain predictions, we guarantee that no
          direct or indirect use of such information will be made, except for
          the purpose of communicating horoscopes, predictions, or other
          relevant information to the user.
          {'\n\n'}
          The Website does not sell or rent the information provided by users.
          {'\n\n'}
          The Website does not offer solutions or treatment for users
          experiencing mental health issues, including thoughts of suicide or
          self-harm. Such users are advised to immediately stop using the
          website. Continued use is at the user's own risk, and the Website
          accepts no liability for any adverse outcomes. In such cases, we may
          share information with law enforcement authorities as required, and
          such information is not protected by confidentiality agreements.
          {'\n\n'}
          The Website makes no guarantees regarding the accuracy of predictions
          or solutions provided by astrologers or experts. We do not take
          responsibility for the reliability or authenticity of gems or other
          items sold on the website, and no warranties or guarantees are
          provided for these services.
        </Text>

        <Text style={styles.heading}>Information Collected by Website</Text>

        <Text style={styles.subHeading}>
          Personally Identifiable Information
        </Text>
        <Text style={styles.content}>
          Information qualifies as personal in nature when it identifies a
          specific user. The website may collect this information during the
          following actions:
          {'\n\n'}
          Creating an account/Registration data: When accessing the website,
          users may be required to create an account. The personal information
          requested during this process may include, but is not limited to, full
          name, address, telephone number, email address, date of birth, gender,
          location, photograph, and any other items classified as "sensitive
          personal data or information" as defined under the Information
          Technology (Reasonable Security Practices and Procedures and Sensitive
          Personal Data or Information) Rules, 2011, enacted under the
          Information Technology Act, 2000. Any other required details during
          registration will also be collected.
          {'\n\n'}
          Users are informed that their email address or phone number, together
          with a password or OTP, will be used to secure their profile and
          implement the personalized email and SMS services provided by the
          website. If a user does not complete registration, the website may be
          unable to provide services due to the lack of personal identifiable
          information.
          {'\n\n'}
          Refilling the wallet: The minimum recharge amount for the wallet is
          Rs. 25/-, and the recharge value cannot be less than this. When
          refilling the wallet, personal information collected may include
          financial information, such as bank account details, credit or debit
          card details, or other payment instrument information through a secure
          third-party gateway, IP address, and any other information necessary
          to book paid services on the website. All payments comply with
          specific government rules and regulations to ensure security and
          privacy, including but not limited to the Personal Data Protection
          Bill (PDPB) 2019, RBI Guidelines on Digital Payments, PCI-DSS, and the
          Information Technology Act, 2000.
          {'\n\n'}
          Log Files, IP Address, and Cookies: The website collects information
          stored by your browser on your computer's hard drive, known as
          cookies. Additionally, the website logs generic information about your
          internet connection (Session Data). The website may store temporary or
          permanent cookies on your computer, which allow the server to
          recognize your computer each time you return, including details like
          time and date of visits, pages viewed, and verification of
          registration or password information. Cookies are typically only read
          by the server that places them, and users can choose to block these
          cookies. However, doing so may prevent users from using certain
          website features. The website uses cookies to personalize the user
          experience and display advertisements according to user preferences.
          Some services provided by the website may direct users to third-party
          platforms. Information provided by the user on these platforms will be
          handled according to the privacy policies of those platforms. The
          website disclaims any liability for the use or misuse of such
          information by third parties.
          {'\n\n'}
          User Feedback and Comments: We collect details such as user feedback,
          comments, etc., that may be shared on articles, blogs, forums, or
          other pages accessed on the website. Users are advised to exercise
          discretion when disclosing information on public domains, as it is
          susceptible to misuse.
          {'\n\n'}
          Miscellaneous Activities (If required): The website may collect
          additional information mandatory for disclosure or received through
          email or other methods, including contracts related to specific
          services. Such information may not be part of the user profile but
          will be used only to address specific needs or concerns.
        </Text>

        <Text style={styles.subHeading}>
          NON-PERSONALLY IDENTIFIABLE INFORMATION
        </Text>
        <Text style={styles.content}>
          Information is considered non-personal when it does not identify a
          specific user. This information is collected during visits to the
          website and may include:
          {'\n\n'}• URL of the previous website visited before this one, or the
          URL visited after leaving the website.
          {'\n'}• Internet service provider, IP address, or telecom service
          provider.
          {'\n'}• Type of browser used to access the website.
          {'\n'}• Geographical location.
          {'\n\n'}
          This non-personal information is used for purposes such as
          troubleshooting connection problems, administering the website,
          analyzing trends, gathering demographic data, tracking website visit
          frequency, and complying with applicable laws. The website may share
          this information with third-party service providers and advertisers to
          measure the effectiveness of online advertising, content, programming,
          and other legitimate purposes.
          {'\n\n'}
          Users confirm that the information they provide is authentic, correct,
          current, and up-to-date. The website is not responsible for the
          authenticity of the information users provide, and users shall be
          personally liable for any inaccuracies, indemnifying the website in
          case of a breach.
        </Text>

        <Text style={styles.heading}>Security Measures:</Text>
        <Text style={styles.content}>
          The security of personal information is a priority for the website. We
          take reasonable steps, including physical and electronic security
          measures, to protect against unauthorized access to the information.
          Personal information is collected on secure servers, and payment
          details are entered on secure SSL pages via payment gateways. Data is
          transferred between the bank and payment gateways in an encrypted
          manner.
          {'\n\n'}
          However, no data transmission is entirely secure. Users are advised to
          take precautions when sharing details, including login credentials.
          The website is not responsible for the security or confidentiality of
          communications sent over the internet, such as email messages.
        </Text>

        <Text style={styles.heading}>Usage of the Information</Text>
        <Text style={styles.content}>
          The information collected by the website may be used for any purpose
          permissible under applicable law, including but not limited to the
          following:
          {'\n\n'}
          Personalized browsing experience: While ensuring the anonymity of the
          user, the personal information collected under the "Personally
          Identifiable Information" clause may be used for research purposes,
          improving marketing and promotional efforts, analyzing usage,
          enhancing website content, improving product offerings, and
          customizing the website layout to meet the needs of its users.
          {'\n\n'}
          IP tracking details and cookie data: The website will use this
          information solely to facilitate the use of the website and provide a
          personalized experience. Any sensitive information will not be shared
          with third parties without the user's consent.
          {'\n\n'}
          Retention of information: All information (and copies thereof),
          including personal information, user data, and other details related
          to your access and use of the services offered by the website, may be
          retained for as long as necessary. This may include compliance with
          statutory or legal obligations, tax laws, evidentiary purposes, and
          other reasonable purposes, such as managing your access and use of
          services or resolving disputes.
          {'\n\n'}
          Seamless user experience: To ensure a smooth experience on the website
          and maximize user comfort, the website may use data collected from
          cookies, log files, device identifiers, location data, and clear gifs
          for the following purposes:
          {'\n\n'}• Remembering information so users will not need to re-enter
          it during subsequent visits.
          {'\n'}• Providing custom, personalized content and advertising.
          {'\n'}• Monitoring the effectiveness of services offered by the
          website.
          {'\n'}• Tracking aggregate metrics such as total visitors, traffic,
          usage, and demographic patterns.
          {'\n'}• Diagnosing or fixing technology problems.
          {'\n'}• Enhancing and planning for future services.
          {'\n\n'}
          Third-party analytics tools: The website uses third-party analytics
          tools to measure traffic and usage trends for its services. These
          tools collect information that is not personal or sensitive, such as
          web pages visited, add-ons used, and other details that help improve
          services. This information is collected in anonymized logs, ensuring
          that it cannot be used to identify individual users.
        </Text>

        <Text style={styles.heading}>Confidentiality</Text>
        <Text style={styles.content}>
          The website is committed to protecting any information provided by
          users that may be classified as confidential. Confidential information
          that is not required to be disclosed to the website is specifically
          excluded from the definition of personal information and will not be
          collected or used. The confidential information of users will not be
          disclosed or shared by the website, its employees, agents, or
          third-party contractors, including experts, either orally or in
          writing, except in the following circumstances:
          {'\n\n'}• If the website believes there is a significant, real, or
          imminent threat to the user's health, safety, or life, or to the
          health, safety, or life of another person or the public.
          {'\n'}• If such confidential information is required to be shared by
          law, including during investigations, court summons, or judicial
          proceedings.
          {'\n'}• To protect and defend the rights or property of the website.
        </Text>

        <Text style={styles.heading}>Children's Privacy Policy:</Text>
        <Text style={styles.content}>
          The website requires that users accessing and using its services be
          above 18 years of age. However, some service information is accessible
          to children under the age of 18. It is important to emphasize that the
          website is not designed or intended to attract or be used by children
          under the age of 13, and no personally identifiable information from
          children below 13 is knowingly collected. If you are under 13 years of
          age, please do not use any of the services provided by the website at
          any time or in any manner. If a parent or guardian becomes aware that
          information of a child under 13 has been shared, they should contact
          the website immediately. We will take appropriate steps to delete such
          data from the website's systems.
        </Text>

        <Text style={styles.heading}>Safety and Security</Text>
        <Text style={styles.content}>
          We employ best practices to secure users' personal information, such
          as birth details, address, and financial details, including credit
          card or debit card transaction information. We use the latest
          encryption technologies to ensure secure transactions, encouraging our
          clients to use their credit/debit cards on Talkndheal.com with full
          confidence. Our aim is to provide a safe and secure experience for
          users. Your online transactions are protected by the highest levels of
          transaction security available, using secure encryption technology to
          keep your transaction details confidential at all times.
          {'\n\n'}
          Multiple Payment Methods: The company offers the convenience of
          choosing from various payment methods. Whether you prefer credit
          cards, debit cards, net banking, or other online modes of payment,
          we've got you covered.
          {'\n\n'}
          Secure Encryption Technology: Regardless of the payment method you
          select, the company ensures your transaction details remain
          confidential. We achieve this through advanced encryption technology
          that safeguards your information throughout the entire payment
          process.
          {'\n\n'}
          Trusted Payment Gateway Partners: We collaborate with trusted payment
          gateway partners who are renowned for their reliability and security.
          These partners work with leading banks to process your payments
          securely.
          {'\n\n'}
          Highest Levels of Transaction Security: When making an online
          transaction through the company, you benefit from the highest levels
          of security available on the internet. This ensures that your
          sensitive financial information is protected against unauthorized
          access and misuse.
          {'\n\n'}
          Confidentiality Assurance: Your privacy and security are our top
          priorities. You can shop and transact online with confidence, knowing
          that your personal and financial data is handled with the utmost care
          and confidentiality.
        </Text>

        <Text style={styles.heading}>Disclaimer</Text>
        <Text style={styles.content}>
          The website is not responsible for any communication or transaction
          that occurs between the user and third-party websites. Users are
          strongly encouraged to read and understand the privacy policy and
          terms of use of any third-party website they visit. The inclusion of
          links to third-party websites does not imply endorsement or
          responsibility for the content or practices of these external sites.
          The website shall not be held liable for any actions or damages
          arising from user interactions with third-party websites.
        </Text>

        <Text style={styles.heading}>Raise a Ticket:</Text>
        <Text style={styles.content}>
          For any issues, the support team can be contacted through the "Raise a
          Ticket" option. All tickets will be responded to within 24 hours of
          receipt of the query.
        </Text>
      </ScrollView>
    </CustomSafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: normalize(12),
    paddingTop: normalize(8),
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: normalize(17),
    fontFamily: Fonts.semibold,
    marginTop: 16,
    marginBottom: 8,
    color: '#333',
  },
  subHeading: {
    fontSize: normalize(15),
    fontFamily: Fonts.semibold,
    marginTop: 12,
    marginBottom: 6,
    color: '#555',
  },
  content: {
    fontSize: normalize(13),
    fontFamily: Fonts.regular,
    lineHeight: 20,
    color: '#666',
    marginBottom: 12,
  },
});

export default PrivacyPolicyScreen;
