import { Fonts } from '@/assets';
import CustomSafeArea from '@/components/CustomSafeArea';
import Header from '@/components/Header';
import { normalize } from '@/utils/normalize';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {ScrollView, Text, View, StyleSheet} from 'react-native';

const TermsAndConditionsScreen = () => {
  const navigation = useNavigation()
  return (
    <CustomSafeArea>
      <Header title='Terms & Conditions' onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Text style={styles.content}>
          The following outlines the terms and conditions under which we provide
          our services. By using our website, you ("Member," "you," or "your")
          agree to the terms and conditions described herein ("Terms and
          Conditions of our Services").
        </Text>

        <Text style={styles.heading}>Acceptance of Terms of Service:</Text>
        <Text style={styles.content}>
          Please read these Terms of Service carefully before using the services
          provided by us. By clicking the "I Agree" button, you signify your
          acceptance of these Terms of Service. These Terms of Service may be
          amended by us at any time at our discretion by posting the amended
          terms on our website. If you became a member before the posting of
          amended terms, the amended terms shall automatically take effect after
          being posted on our site. Your continued use of the website after such
          changes will signify your acceptance of the amended terms. This
          agreement may only be amended by a written agreement signed by both
          you and us.
        </Text>

        <Text style={styles.heading}>Description of Our Website Services</Text>
        <Text style={styles.content}>
          Our website provides expert content, reports, data, telephone, and
          email consultations ("Content"). Portions of the Content may be viewed
          simply by visiting our website ("Free Services" and "Paid Services").
          To access Paid Services, you may need to register as a member. The
          Free Services and Paid Services are collectively referred to as the
          "Services" in these Terms of Service.
        </Text>

        <Text style={styles.heading}>Consideration for Paid Services</Text>
        <Text style={styles.content}>
          In consideration for the Paid Services, you agree to:
          {'\n\n'}• Provide certain current, complete, and accurate information
          about yourself as prompted by us during registration.
          {'\n'}• Maintain and update this information as necessary to ensure it
          remains current, complete, and accurate. All information requested
          during initial sign- up and any updates are referred to as
          "Registration Data." Many Services and Content are provided by
          third-party suppliers in collaboration with us.
        </Text>

        <Text style={styles.heading}>Member Eligibility</Text>
        <Text style={styles.content}>
          The Services are available only to individuals who can form legally
          binding contracts under applicable law. The Services are not available
          to minors (under the age of 18 in most jurisdictions) or individuals
          temporarily or permanently suspended from our website.
          {'\n\n'}
          By using this website, you confirm that you are over 18 years of age
          and legally able to enter into a binding contract under the Indian
          Contract Act, 1872. We are not responsible for any misuse of our
          services by individuals, including minors. You may inquire about
          services related to minors in your family, in accordance with these
          Terms and Conditions.
          {'\n\n'}
          The Website does not permit the use of Services under the following
          conditions:
          {'\n\n'}• If the user resides in a jurisdiction where the use of the
          Services is prohibited.
          {'\n'}• If the user resides in a state, country, union territory, or
          capital where trade relations are legally restricted.
          {'\n\n'}
          We aim to foster a neutral environment where all users feel welcome to
          seek guidance, knowledge, and spiritual support, regardless of
          background. Our platform supports diversity, equality, and respect for
          all cultures and traditions.
        </Text>

        <Text style={styles.heading}>Call with Astrologer/Expert</Text>
        <Text style={styles.content}>
          The Website offers services that are available through
          telecommunication with the Astrologer/Expert listed and enrolled on
          the Website. By agreeing to these Terms of Usage, you give your
          unconditional consent for the Website to arrange a call with you on
          your mobile number, even if your number is registered with the Do Not
          Disturb (DND) service provided by your mobile service provider.
        </Text>

        <Text style={styles.heading}>Website Content</Text>
        <Text style={styles.content}>
          The Website and any individual websites accessible through external
          hyperlinks are private property.
          {'\n\n'}• All interactions on this Website, including guidance and
          advice received directly from the licensed expert, must comply with
          these Terms of Usage.
          {'\n'}• The User agrees not to post or transmit any material through
          this Website that violates or infringes upon the rights of others, or
          any material that is unlawful, abusive, defamatory, invasive of
          privacy, vulgar, obscene, profane, or otherwise objectionable. The
          User also agrees not to post content that encourages conduct that
          would constitute a criminal offense, give rise to civil liability, or
          violate any law.
          {'\n'}• The Website reserves the right to suspend or terminate access
          to the Website for any User who violates these terms. Such Users will
          not be able to access the Website.
          {'\n'}• The Website reserves the right to modify, change, or
          discontinue any aspect or feature of the Website, including, but not
          limited to, content, graphics, deals, offers, and settings.
          {'\n'}• Any information provided on the Website, other than the
          guidance and advice directly received from the Third-Party Service
          Provider (including registered Astrologers/Experts), such as
          educational content, graphics, and research, should not be considered
          medical advice.
          {'\n'}• The Website does not guarantee the medical advice, if any,
          provided by third-party service providers, including registered
          Astrologers/Experts. The User should always consult a qualified
          healthcare professional for diagnosis and treatment, including
          information regarding appropriate medications or treatments. The
          Content on the Website does not represent or warrant that any
          medication or treatment is safe, appropriate, or effective for you. We
          do not endorse any specific tests, medications, products, or
          procedures.
          {'\n'}• The Website does not guarantee any specific outcome after
          seeking services. The Website and the Service Provider offering advice
          are not liable for any untoward incidents or results that do not meet
          the User's expectations. Accessing the Website and using the services
          is at the User's own risk.
          {'\n'}• By using the Website, Application, or Services, the User
          agrees that any legal remedy or liability for actions or omissions by
          other Members, including the service providers registered with the
          Website or third parties linked to the Website, shall be limited to
          claims against the responsible party. The User agrees not to impose
          liability on or seek legal remedy from the Website for such actions or
          omissions.
        </Text>

        <Text style={styles.heading}>
          Disclaimer / Limitation of Liability / Warranty
        </Text>
        <Text style={styles.content}>
          The User expressly understands and agrees that, to the maximum extent
          permitted by applicable law, the Website does not provide warranties
          for its services. Astrological counseling provided through the Website
          is based on the cumulative or individual knowledge, experience, and
          interpretations of the Astrologers/Experts. As such, it may vary from
          one Expert to another.
          {'\n\n'}
          The Website offers services through a diverse panel of Experts, all
          duly verified by the Website. These service providers (Astrologers)
          may, from time to time, recommend the use of mantras, gemstones, or
          other remedies. Such recommendations are made in good faith by the
          Astrologers/Experts. However, the Website and its subsidiaries,
          affiliates, officers, employees, agents, partners, and licensors make
          no warranty that:
          {'\n\n'}• The service will meet your requirements.
          {'\n'}• The service will be uninterrupted, timely, secure, or
          error-free.
          {'\n'}• The results obtained from using the service will be accurate
          or reliable.
          {'\n'}• The quality of any products, services, information, or other
          materials purchased or obtained by you through the service will meet
          your expectations.
          {'\n\n'}
          You are required to fully disclose the emotional, mental, and physical
          state of the person seeking advice from the Website's
          Astrologers/Experts to enable informed judgments on the advice
          provided.
          {'\n\n'}
          To the maximum extent permitted by applicable law, the Website will
          not be liable for any User content arising under intellectual property
          rights, libel, privacy, publicity, obscenity, or other laws. The
          Website also disclaims all liability with respect to the misuse, loss,
          modification, or unavailability of any User content.
          {'\n\n'}
          The Website will not be liable for any loss incurred by the User due
          to unauthorized use of their account or account information in
          connection with the Website or any services or materials, either with
          or without the User's knowledge. While the Website has made efforts to
          ensure that all information is correct, it does not warrant or make
          any representations regarding the quality, accuracy, or completeness
          of any data, information, product, or service provided. The Website is
          not responsible for delays, inability to use the Website or its
          functionalities, or failures to provide functionalities or for any
          information, software, products, functionalities, and related graphics
          obtained through the Website.
          {'\n\n'}
          The Website will not be held liable for non-availability during
          scheduled maintenance or any unplanned suspension of access due to
          technical reasons or factors beyond the Website's control.
          {'\n\n'}
          The User understands and agrees that any material or data downloaded
          or otherwise obtained through the Website is done entirely at their
          own risk. The User is solely responsible for any damage to their
          computer systems or loss of data resulting from downloading such
          material or data.
          {'\n\n'}
          The Website accepts no liability for typographical errors, invalid
          coupon/discount links, or errors and omissions regarding information
          provided to you, whether by the Website or third parties.
          {'\n\n'}
          The Services provided by the Website are for entertainment purposes
          only. The Website, on behalf of itself and its suppliers, disclaims
          all warranties of any kind, express or implied, including without
          limitation, any warranty regarding the use of content or services, or
          the accuracy or reliability of any content obtained through the
          Website. The Website does not guarantee that the services will meet
          your requirements, be uninterrupted, timely, secure, or error-free. No
          advice or information obtained from the Website will create any
          warranty.
          {'\n\n'}
          The services may include, but are not limited to, all astrological
          content—Tarot readings, Vedic astrology, numerology, face reading,
          palmistry, psychic readings, KP system, Vaastu, Lal Kitab, live
          telephone consultations, life coaching, Nadi, Kundli Milan, Prashan
          Kundli, and other live services. The Website holds no responsibility
          for or liability regarding the reality or reliability of the
          astrological effects on human physiology resulting from the use of
          gemstones or any other products or services represented on the
          website. No advice or information, whether oral or written, obtained
          by you will create any warranty.
          {'\n\n'}
          The Astrologers/Experts are members of the site and not employees of
          the Website or its company. The Website verifies their qualifications,
          credentials, and background but does not endorse, recommend, verify,
          evaluate, or guarantee any advice, information, or services provided
          by them. The Website does not warrant the accuracy, completeness,
          safety, legality, quality, or applicability of any content or advice
          provided by the Astrologers/Experts.
          {'\n\n'}
          The Website is not a suicide helpline platform. If you are considering
          suicide or feel you are a danger to yourself or others, discontinue
          using the services immediately and notify the appropriate authorities
          or emergency medical personnel. If you are contemplating suicide,
          immediately call a suicide prevention helpline.
          {'\n\n'}
          The Website shall not be liable for any inaccuracies, errors, delays,
          or omissions in data or information, or the transmission or delivery
          of such data. Under no circumstances will the Website, its payment
          service providers, employees, directors, or third-party agents be
          liable for any direct, indirect, incidental, special, or consequential
          damages arising from the provision of services or resulting from
          unauthorized access, alteration of data transmissions, or the
          suspension or termination of services.
        </Text>

        <Text style={styles.heading}>
          Prohibition on Using Website Content for AI Model Training
        </Text>
        <Text style={styles.content}>
          By accessing or using this Website, you agree that you are expressly
          prohibited from utilizing any content, data, information, or materials
          from the Website for training or developing AI models or machine
          learning algorithms. This prohibition includes any form of data
          extraction, scraping, copying, or downloading content, whether
          automated or manual, for use as training data for AI models.
          {'\n\n'}
          Violating this clause may result in legal action, including but not
          limited to injunctive relief and monetary damages as deemed
          appropriate by applicable laws and regulations. The Website reserves
          the right to monitor and enforce compliance with this prohibition, and
          any unauthorized use will be considered a breach of these terms.
          {'\n\n'}
          If you disagree with this clause or any other terms outlined in these
          Terms and Conditions, you are advised to immediately cease using the
          Website.
        </Text>

        <Text style={styles.heading}>Limitation of Liability</Text>
        <Text style={styles.content}>
          Notwithstanding anything to the contrary, the Website's liability to
          you for any cause whatsoever will be limited to the amount paid, if
          any, by you to the Website for the service during the term of your
          membership.
        </Text>

        <Text style={styles.heading}>Indemnification</Text>
        <Text style={styles.content}>
          You agree to indemnify, defend, and hold harmless the Website, its
          parent company, subsidiaries, affiliates, officers, directors,
          employees, suppliers, Astrologers/Experts, and agents from any
          third-party claims, liabilities, damages, and costs (including
          attorney's fees) arising from your use of the Services, your violation
          of the Privacy Policy, these Terms of Service, or any third-party
          rights, including intellectual property rights.
          {'\n\n'}
          These Terms of Service will benefit the Website's successors, assigns,
          and licensees.
        </Text>

        <Text style={styles.heading}>Proprietary Rights to Content</Text>
        <Text style={styles.content}>
          The User acknowledges that all Content on the Website, including but
          not limited to text, software, music, sound, photographs, video,
          graphics, and other materials contained in sponsor advertisements or
          distributed via email, as well as commercially produced information
          presented to the Member by the Website, its suppliers, and/or
          advertisers, is protected by copyrights, trademarks, service marks,
          patents, and/or other proprietary rights and laws.
          {'\n\n'}
          The User is not permitted to copy, use, reproduce, distribute,
          perform, display, or create derivative works from the Content unless
          expressly authorized by the Website, its suppliers, or advertisers.
          {'\n\n'}
          Additionally, content such as images, text, designs, etc., on the
          Website's portals may be sourced from various online platforms (e.g.,
          Google Images). The Website is not liable for any copyright
          infringement related to such content or data.
        </Text>

        <Text style={styles.heading}>Notices</Text>
        <Text style={styles.content}>
          Except as otherwise stated in these Terms of Service, all notices to
          any party must be in writing and can be made via email or traditional
          mail. Notices are deemed to be given 24 hours after an email is sent
          or 3 days after mailing via post to the address provided by the Member
          in their Registration Data.
          {'\n\n'}
          Notices should be sent via:
          {'\n'}Email: hellomyastro@gmail.com
        </Text>

        <Text style={styles.heading}>Restricted Content</Text>

        <Text style={styles.subHeading}>Child Endangerment</Text>
        <Text style={styles.content}>
          The Website prohibits users from creating, uploading, or distributing
          content that facilitates the exploitation or abuse of children.
          Violations will lead to immediate deletion of the account. This
          includes all forms of child sexual abuse material. The Website also
          prohibits the following:
          {'\n\n'}• Inappropriate interactions targeted at children (e.g.,
          groping, caressing).
          {'\n'}• Child grooming (e.g., befriending a child online to facilitate
          sexual contact, either online or offline).
          {'\n'}• Sexualization of minors (e.g., imagery that promotes or
          depicts the sexual abuse of children).
          {'\n'}• Sextortion (e.g., threatening or blackmailing a child using
          intimate images).
          {'\n'}• Trafficking of children (e.g., solicitation for commercial
          sexual exploitation).
          {'\n\n'}
          The Website will take immediate action upon discovering any content
          involving child sexual abuse material.
          {'\n\n'}
          Content that appeals to children but contains adult themes is also
          strictly prohibited, including but not limited to:
          {'\n\n'}• Excessive violence, blood, and gore.
          {'\n'}• Harmful or dangerous activities.
          {'\n'}• Disclosure of a child's sex or prenatal predictions.
          {'\n'}• Predictions about academic results, such as examination
          outcomes.
          {'\n'}• Betting-related predictions (e.g., sports events like cricket,
          tennis).
          {'\n'}• Share market predictions.
          {'\n'}• Promotion of negative body image, including apps depicting
          plastic surgery, weight loss, and cosmetic adjustments.
          {'\n'}• Abuse or mistreatment of astrologers/experts. Users are
          expected to behave respectfully; if dissatisfied with a consultation,
          they may switch to another astrologer/expert. Inappropriate behavior
          or misconduct should be reported to customer support for resolution.
          Continued misbehavior may result in the user being blocked from
          accessing the Website and its services.
        </Text>

        <Text style={styles.subHeading}>Inappropriate Content</Text>
        <Text style={styles.content}>
          To maintain a safe and respectful platform, the Website has
          established standards defining and prohibiting harmful or
          inappropriate content:
          {'\n\n'}Sexual Content and Profanity
          {'\n'}We don't allow accounts that contain or promote sexual content
          or profanity, including pornography, or any content or services
          intended to be sexually gratifying. We don't allow app content that
          appears to promote or solicit a sexual act in exchange for
          compensation. We don't allow content that contain or promote content
          associated with sexually predatory behaviour or distribute
          non-consensual sexual content.
          {'\n\n'}
          If an account contains content that violates this policy, it gives the
          absolute right to the owner to delete the account with immediate
          effect.
          {'\n\n'}
          Here are some examples of common violations:
          {'\n\n'}• Depictions of sexual nudity or sexually suggestive poses
          where the subject is nude, blurred, or minimally clothed.
          {'\n'}• Depictions, animations, or illustrations of sex acts, sexual
          poses, or the sexual depiction of body parts.
          {'\n'}• Content related to sex aids, sex guides, illegal sexual
          themes, and fetishes.
          {'\n'}• Content that is lewd or profane, including profanity, explicit
          text, or adult/sexual keywords.
          {'\n'}• Content depicting or encouraging bestiality.
          {'\n'}• Content promoting sex-related services, such as escort
          services or "sugar dating" (where one participant is expected to
          provide financial support for sexual arrangements).
          {'\n'}• Content that degrades or objectifies people (e.g., apps that
          claim to undress people or see through clothing, even as pranks).
          {'\n'}• Content or behavior that attempts to exploit or threaten
          people in a sexual manner, including non-consensual content created
          using technology like deepfake.
          {'\n\n'}Consequences for Violations
          {'\n'}If an account is found to violate these standards, the Website
          reserves the right to delete the account with immediate effect.
        </Text>

        <Text style={styles.subHeading}>Hate Speech</Text>
        <Text style={styles.content}>
          We do not allow users to promote violence or incite hatred against
          individuals or groups based on race or ethnic origin, religion,
          disability, age, nationality, veteran status, sexual orientation,
          gender, gender identity, caste, immigration status, or any other
          characteristic associated with systemic discrimination or
          marginalization.
          {'\n\n'}
          Examples of Common Violations:
          {'\n\n'}• Content or speech asserting that a protected group is
          inhuman, inferior, or worthy of hatred.
          {'\n'}• Hateful slurs, stereotypes, or theories about a protected
          group possessing negative characteristics (e.g., malicious, corrupt,
          evil).
          {'\n'}• Content that encourages others to believe that people should
          be hated or discriminated against based on their membership in a
          protected group.
          {'\n'}• Content promoting hate symbols (e.g., flags, insignias,
          paraphernalia) or behaviors associated with hate groups.
          {'\n'}• Discussions about the Kundli of children under the age of 5
          are completely restricted.
        </Text>

        <Text style={styles.subHeading}>Violence</Text>
        <Text style={styles.content}>
          We do not allow content that depicts or facilitates gratuitous
          violence or other dangerous activities.
          {'\n\n'}
          Examples of Common Violations:
          {'\n\n'}• Graphic depictions or descriptions of realistic violence or
          violent threats to any person or animal.
          {'\n'}• Content that promotes self-harm, suicide, eating disorders,
          choking games, or other activities where serious injury or death may
          result.
        </Text>

        <Text style={styles.subHeading}>Terrorist Content</Text>
        <Text style={styles.content}>
          We prohibit content related to terrorist organizations for any
          purpose, including recruitment.
          {'\n\n'}
          We do not allow content promoting terrorist acts, inciting violence,
          or celebrating terrorist attacks.
        </Text>

        <Text style={styles.subHeading}>
          Dangerous Organizations and Movements
        </Text>
        <Text style={styles.content}>
          We do not allow content from movements or organizations that have
          engaged in, prepared for, or claimed responsibility for acts of
          violence against civilians. This includes content related to planning,
          preparing, or glorifying violence against civilians.
          {'\n\n'}
          Content related to any political party or election campaigns should be
          refrained from.
        </Text>

        <Text style={styles.subHeading}>Sensitive Events</Text>
        <Text style={styles.content}>
          We do not allow content that capitalizes on or is insensitive to
          sensitive events with significant social, cultural, or political
          impact, such as civil emergencies, natural disasters, public health
          crises, conflicts, deaths, or other tragic events.
          {'\n\n'}
          Examples of Common Violations:
          {'\n\n'}• Insensitivity regarding the death of real individuals due to
          suicide, overdose, natural causes, etc.
          {'\n'}• Denial of well-documented, major tragic events.
          {'\n'}• Appearing to profit from a sensitive event without any benefit
          to the victims.
        </Text>

        <Text style={styles.subHeading}>Bullying and Harassment:</Text>
        <Text style={styles.content}>
          We do not allow content that facilitates threats, harassment, or
          bullying.
          {'\n\n'}
          Examples of Common Violations:
          {'\n\n'}• Bullying victims of international or religious conflicts.
          {'\n'}• Content that seeks to exploit others, including extortion,
          blackmail, etc.
          {'\n'}• Posting content to publicly humiliate someone.
          {'\n'}• Harassing victims, or their friends and families, of a tragic
          event.
        </Text>

        <Text style={styles.subHeading}>Dangerous Products</Text>
        <Text style={styles.content}>
          We do not allow content that promotes dangerous products or
          activities, including explosives, firearms, and certain firearm
          accessories.
          {'\n\n'}
          Content that provides instructions for manufacturing explosives,
          firearms, ammunition, or restricted firearm accessories, including
          converting firearms to automatic or simulated automatic capabilities,
          is prohibited.
        </Text>

        <Text style={styles.subHeading}>Psychotropic Drugs</Text>
        <Text style={styles.content}>
          We do not allow content facilitating the use of marijuana, tobacco
          (including e-cigarettes and vape pens), or psychotropic drugs,
          regardless of legality. This includes encouraging the illegal or
          inappropriate use of alcohol or tobacco, as well as drugs regulated by
          the Drugs and Cosmetics Act and Rules 1945.
        </Text>

        <Text style={styles.subHeading}>
          Black Magic, Witchcraft, Voodoo, and Tantras
        </Text>
        <Text style={styles.content}>
          We strictly prohibit any involvement in black magic, witchcraft,
          voodoo, and tantrism. If we become aware that a user is intentionally
          or unintentionally engaging in such activities, we reserve the right
          to delete their account.
        </Text>

        <Text style={styles.heading}>Our Services</Text>
        <Text style={styles.content}>
          These Terms of Service apply to all users of our Website. Please note
          that the Website may contain links to third-party websites that we do
          not own or control. We do not assume any responsibility for the
          content, privacy policies, or practices of third-party websites.
          {'\n\n'}
          We are not liable for any mistakes, misinterpretation of law,
          defamation, omissions, falsehoods, obscenity, pornography, or
          profanity in third-party content, whether from users or other sources.
          We cannot censor or edit third-party content.
          {'\n\n'}
          By using our services, you acknowledge that we are not responsible for
          any damages, claims, or other liabilities arising from your use of
          third-party content or websites. Opinions expressed in third-party
          content do not reflect our beliefs.
        </Text>

        <Text style={styles.heading}>
          Errors, Corrections, and Right to Modify or Discontinue Services and
          Sites
        </Text>
        <Text style={styles.content}>
          We do not guarantee that our Website will be error-free, free of
          viruses, or other harmful components. We also do not represent or
          warrant that the information available on our Website will be
          accurate, timely, or reliable. We reserve the right to make changes to
          the features, functionality, or content of our Website at any time.
          {'\n\n'}
          We may modify or discontinue, temporarily or permanently, the Services
          or Sites, with or without notice. We are not liable to you or any
          third party for any modification, suspension, or discontinuance of the
          Services or Sites.
        </Text>

        <Text style={styles.heading}>Governing Law and Jurisdiction</Text>
        <Text style={styles.content}>
          Arbitration:
          {'\n'}Any dispute, claim, or controversy arising out of or relating to
          these Terms of Use, including the determination of the scope or
          applicability of these Terms of Use, or your use of the Application or
          information, shall be resolved through arbitration in India. The
          arbitration will be conducted by a sole arbitrator mutually appointed
          by the Members and Website, following the Arbitration and Conciliation
          Act, 1996. The seat of arbitration shall be Tis Hazari Court, New
          Delhi. All arbitration proceedings, including awards, will be
          conducted in English or Hindi. The award shall be final and binding on
          both parties.
          {'\n\n'}
          Interim Relief:
          {'\n'}Notwithstanding the above, either party may seek interim or
          preliminary relief from a court of competent jurisdiction in India to
          protect their rights pending the completion of arbitration. Both
          parties agree to submit to the exclusive jurisdiction of the courts
          located in Tis Hazari Court, New Delhi. If either party files an
          action contrary to this provision, the other party may recover
          attorney's fees and costs up to One Lakh Rupees (INR).
          {'\n\n'}
          Governing Law:
          {'\n'}These Terms of Use will be governed by and construed in
          accordance with the laws of India, excluding its rules on conflicts of
          laws. If a court of competent jurisdiction finds any provision of
          these Terms to be unenforceable or invalid, such provision shall be
          amended to reflect the intent of the provision while the remainder of
          the Terms will remain in full force.
          {'\n\n'}
          Entire Agreement:
          {'\n'}These Terms of Use constitute the entire agreement between the
          parties regarding the subject matter, superseding all prior or
          contemporaneous agreements. Any waiver of these Terms will be
          effective only if in writing and signed by both parties.
        </Text>

        <Text style={styles.heading}>User Account Access</Text>
        <Text style={styles.content}>
          The Website shall have access to the account and the information
          created by the User for ensuring and maintaining the high-quality
          services provided by the Website and for addressing the need of the
          customer in the most effective manner. User hereby consents for the
          unconditional access of the account by the Website, its employees,
          agents, and other appointed person in such regard. For the purpose of
          addressing the complaints (if any received) and any suspected abuse
          reported, the Website shall investigate on a case-to- case basis from
          the records available. The User is directed to read the terms provided
          in the Privacy Policy as regards such records.
          {'\n\n'}
          In order to ensure that we are able to provide high quality services,
          respond to customer needs, and comply with laws, you hereby consent to
          our employees and agents being able to access Your account and records
          on a case-by-case basis to investigate complaints or other allegations
          or suspected abuse.
        </Text>

        <Text style={styles.heading}>Member Registration Data:</Text>
        <Text style={styles.content}>
          Upon registration, you will receive an identification (EMAIL ID) and a
          password. You are entirely responsible for maintaining the
          confidentiality of your EMAIL ID and password. You are responsible for
          all uses of your account, whether authorized or not. You must notify
          us immediately of any unauthorized use of your account or breach of
          security known to you.
        </Text>

        <Text style={styles.heading}>DND Number:</Text>
        <Text style={styles.content}>
          By agreeing to the Terms of Usage, you unconditionally consent to the
          platform talkndheal contacting you via call, SMS, WhatsApp messages,
          or email on your DND-registered number, even if your number is listed
          under the DND (Do Not Disturb) service with your mobile service
          provider. Your DND number will be listed and registered on our
          platform.
        </Text>

        <Text style={styles.heading}>Updation of Terms</Text>
        <Text style={styles.content}>
          The Website may update/amend/modify these Terms of Usage from time to
          time. The User is responsible to check the Terms of Usage periodically
          to remain in compliance with these terms.
        </Text>

        <Text style={styles.heading}>Resolution of Issue:</Text>
        <Text style={styles.content}>
          To convey any issue /problem to the customer care team, please raise a
          ticket by clicking on the raise ticket option.
          {'\n\n'}• You have to click the create ticket option to send your
          concern
          {'\n'}• Once your ticket is closed and the issue is resolved, the
          ticket will be closed from the support team.
          {'\n'}• You can always check the status of your ticket by clicking on
          all options.
        </Text>

        <Text style={styles.heading}>
          Additional Terms and Conditions (talk to astrologer/ chat with
          astrologer/ live astrologer)
        </Text>
        <Text style={styles.content}>
          You understand that we only provide a platform where astrologers can
          give astrology services to users, and we do not have any direct,
          indirect control over the conversation that happens between the
          astrologer and users. you use the services at your own risk, and you
          will be responsible for any loss, harm incurred due to such
          conversation/recommendation. in no case or any of its directors/
          officials will be liable for any such loss/harm.
          {'\n\n'}
          example, we don't make any warranties about:
          {'\n\n'}• the recommendation provided through the service.
          {'\n'}• the specific features of the service, or its accuracy,
          reliability, availability, or ability to meet your needs
          {'\n\n'}
          Recommendations are being made in good faith by the
          Astrologers/Experts and the website and its subsidiaries, affiliates,
          officers, employees, agents, partners, and licensors make no warranty
          that:
          {'\n\n'}• the service will meet your requirements.
          {'\n'}• the service will be uninterrupted, timely, secure or error -
          free
          {'\n'}• the results that may be obtained from the use of the service
          will be accurate or reliable
          {'\n\n'}
          you will not exchange any personal contact information with any
          astrologer/astrologer/expert for any purpose, which may include making
          offline payment or in-personal meetings. you must not share any
          personal information about yourself, your friends, acquaintances,
          family members, or anybody else with whom you may or may not be
          associated. Contact numbers, bank account numbers, e-mail addresses,
          websites, personalized pages, blogs, and social media profiles
          [including but not limited to Facebook, WhatsApp, telegram, messenger,
          SMS, and others] are all examples of personal information. You also do
          not induce Astrologers/Experts for offline meetings.
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
    includeFontPadding: false,
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

export default TermsAndConditionsScreen;
