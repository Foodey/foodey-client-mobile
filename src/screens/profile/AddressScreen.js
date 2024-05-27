import { View, Text, StyleSheet, SafeAreaView, StatusBar, FlatList } from 'react-native';
import React from 'react';
import { COLOR } from '../../constants/Colors';
import { AddressCard, BackButton, SubmitButton } from '../../components';
import { deliveryInformation } from '../../constants/TempData';

const AddressScreen = ({ navigation }) => {
  const onBackPressFunction = () => {
    navigation.goBack();
  };

  const onAddNewAddrFunction = () => {
    navigation.navigate('AddEditAddress_Screen', {
      name: '',
      phoneNumber: '',
      address: '',
      type: '',
      isNewAddress: true,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <View style={styles.header_container}>
        <BackButton style={styles.back_button} onPressFunction={onBackPressFunction} />
        <Text style={styles.header_text}>Delivery Address</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={deliveryInformation}
        renderItem={({ item }) => (
          <AddressCard
            style={{ marginHorizontal: 21 }}
            title={item?.type}
            name={item?.name}
            phoneNumber={item?.phoneNumber}
            address={item?.address}
            onPressFunction={() => {
              navigation.navigate('AddEditAddress_Screen', {
                // id: item?.id,
                name: item?.name,
                phoneNumber: item?.phoneNumber,
                address: item?.address,
                type: item?.type,
                isNewAddress: false,
              });
            }}
          />
        )}
      />
      <SubmitButton
        style={{ height: '7%', margin: 21 }}
        title={'Add New Address'}
        buttonColor={COLOR.button_primary_color}
        hoverColor={COLOR.button_press_primary_color}
        onPressFunction={onAddNewAddrFunction}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.background_color,
  },

  header_container: {
    height: '18%',
    marginHorizontal: 21,
    // backgroundColor: "#ff0"
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
});

export default AddressScreen;
