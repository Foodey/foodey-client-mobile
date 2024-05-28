import { View, Text, StyleSheet, SafeAreaView, StatusBar, FlatList } from 'react-native';
import React from 'react';
import { COLOR } from '../../constants/Colors';
import { AddressCard, BackButton, SubmitButton } from '../../components';
import { deliveryInformation } from '../../constants/TempData';
import { ProfileScreenHeader } from '../../components/profile';

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
      <ProfileScreenHeader title="Delivery Address" onBackPressFunction={onBackPressFunction} />
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
});

export default AddressScreen;
