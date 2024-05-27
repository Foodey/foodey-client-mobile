import { View, Text, ScrollView, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { BackButton } from '../../components';
import { COLOR } from '../../constants/Colors';
import React from 'react';

// ** THIS SCREEN IS ONLY HARDCODED FOR NOW, NEED TO REFACTOR IT LATER
const PolicyScreen = ({ navigation }) => {
  const onBackPressFunction = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <View style={styles.header_container}>
        <BackButton style={styles.back_button} onPressFunction={onBackPressFunction} />
        <Text style={styles.header_text}>User Policy</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll_container}>
        <Text style={styles.updateTime_text}>Last Updated: 12/12/2023</Text>
        <Text style={[styles.normal_text, { marginTop: 30 }]}>
          Welcome to Foodey! We're delighted to have you as a user of our online food selling
          system. Before you proceed, please take a moment to read and understand our User Policy.
          By using Foodey, you agree to comply with the terms outlined below. If you have any
          questions or concerns, feel free to contact our support team.
        </Text>

        <Text style={styles.policyHeader_text}>1. Account Registration</Text>
        <Text style={styles.normal_text}>
          <Text style={{ fontWeight: 'bold' }}>1.1 </Text> To use Foodey, you must create an
          account. You are responsible for maintaining the confidentiality of your account
          information.
        </Text>
        <Text style={styles.normal_text}>
          <Text style={{ fontWeight: 'bold' }}>1.2 </Text> To use Foodey, you must create an
          account. You are responsible for maintaining the confidentiality of your account
          information.
        </Text>

        <Text style={styles.policyHeader_text}>2. User Conduct</Text>
        <Text style={styles.normal_text}>
          <Text style={{ fontWeight: 'bold' }}>2.1 </Text> Users must not engage in any unlawful or
          prohibited activities on Foodey.
        </Text>
        <Text style={styles.normal_text}>
          <Text style={{ fontWeight: 'bold' }}>2.2 </Text> Users must respect the rights and privacy
          of others, refraining from any form of harassment, abuse, or malicious behavior.
        </Text>

        <Text style={styles.policyHeader_text}>3. Ordering and Transactions</Text>
        <Text style={styles.normal_text}>
          <Text style={{ fontWeight: 'bold' }}>3.1 </Text> Users are responsible for reviewing and
          confirming their orders before completing transactions.
        </Text>
        <Text style={styles.normal_text}>
          <Text style={{ fontWeight: 'bold' }}>3.2 </Text> Foodey is not responsible for disputes
          arising from transactions between users and vendors. We encourage users to resolve issues
          directly with the involved parties.
        </Text>

        <Text style={styles.policyHeader_text}>4. Content Guidelines</Text>
        <Text style={styles.normal_text}>
          <Text style={{ fontWeight: 'bold' }}>4.1 </Text> Users must not upload, post, or share
          content that violates copyright, trademark, or intellectual property rights.
        </Text>
        <Text style={styles.normal_text}>
          <Text style={{ fontWeight: 'bold' }}>4.2 </Text> Foodey reserves the right to remove any
          content that violates our guidelines or is deemed
        </Text>

        <Text style={styles.policyHeader_text}>5. Privacy and Security</Text>
        <Text style={styles.normal_text}>
          <Text style={{ fontWeight: 'bold' }}>5.1 </Text> Foodey takes user privacy seriously. We
          employ security measures to protect your personal information.
        </Text>
        <Text style={styles.normal_text}>
          <Text style={{ fontWeight: 'bold' }}>5.2 </Text> Users are encouraged to review our
          Privacy Policy to understand how we collect, use, and safeguard your data.
        </Text>

        <Text style={styles.policyHeader_text}>6. Reviews and Feedback</Text>
        <Text style={styles.normal_text}>
          <Text style={{ fontWeight: 'bold' }}>6.1 </Text> Users are encouraged to provide honest
          and constructive feedback on vendors and the Foodey platform.
        </Text>
        <Text style={styles.normal_text}>
          <Text style={{ fontWeight: 'bold' }}>6.2 </Text> Reviews must be respectful and adhere to
          our content guidelines. Foodey reserves the right to remove reviews that violate these
          guidelines.
        </Text>

        <Text style={styles.policyHeader_text}>7. Prohibited Items</Text>
        <Text style={styles.normal_text}>
          <Text style={{ fontWeight: 'bold' }}>7.1 </Text> Users must not sell or purchase illegal
          or prohibited items through Foodey.
        </Text>
        <Text style={styles.normal_text}>
          <Text style={{ fontWeight: 'bold' }}>7.2 </Text> Foodey reserves the right to remove any
          listings or accounts associated with the sale of prohibited items.
        </Text>

        <Text style={styles.policyHeader_text}>8. Termination of Account</Text>
        <Text style={styles.normal_text}>
          <Text style={{ fontWeight: 'bold' }}>8.1 </Text> Foodey reserves the right to terminate
          user accounts for violations of this User Policy.
        </Text>
        <Text style={styles.normal_text}>
          <Text style={{ fontWeight: 'bold' }}>8.2 </Text> Users may terminate their accounts at any
          time by following the provided procedures.
        </Text>

        <Text style={styles.policyHeader_text}>9. Changes to User Policy</Text>
        <Text style={styles.normal_text}>
          <Text style={{ fontWeight: 'bold' }}>9.1 </Text> Foodey may update this User Policy
          periodically. Users will be notified.
        </Text>
        <Text style={styles.normal_text}>
          <Text style={{ fontWeight: 'bold' }}>9.2 </Text> Continued use of Foodey after policy
          updates constitutes acceptance of the revised terms.
        </Text>

        <Text style={[styles.normal_text, { marginTop: 30 }]}>
          Thank you for choosing Foodey! We appreciate your cooperation in making our platform a
          safe and enjoyable place for everyone. If you have any questions or concerns, please
          contact our support team at{' '}
          <Text style={{ fontWeight: 'bold' }}>[support@foodey.com]</Text>.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.background_color,
  },

  scroll_container: {
    paddingHorizontal: 21,
  },

  header_container: {
    height: '18%',
    marginHorizontal: 21,
  },
  header_text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 36,
    color: COLOR.text_primary_color,
    flex: 2.5,
    marginTop: 20,
  },

  back_button: {
    flex: 1,
    alignItems: 'center',
  },

  updateTime_text: {
    fontFamily: 'Manrope-Bold',
    fontSize: 20,
    color: COLOR.text_primary_color,
  },

  normal_text: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    color: COLOR.text_primary_color,
    textAlign: 'justify',
  },

  policyHeader_text: {
    fontFamily: 'Manrope-Bold',
    fontSize: 18,
    color: COLOR.text_blue_color,
    marginTop: 30,
  },
});

export default PolicyScreen;
