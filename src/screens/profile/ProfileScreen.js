import { View, Text, Pressable } from 'react-native';
import { SubmitButton } from '~/components';
import { COLOR } from '~/constants/Colors';
import React, { useContext } from 'react';
import { AppContext } from '~/contexts/AppContext';

const ProfileScreen = () => {
  const { logout } = useContext(AppContext);

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: COLOR.background_color,
      }}
    >
      <Text>ProfileScreen</Text>
      <SubmitButton
        hoverColor={COLOR.button_press_primary_color}
        buttonColor={COLOR.button_primary_color}
        title="Log-out"
        style={{ width: 100, height: 100 }}
        onPressFunction={logout}
      />
    </View>
  );
};

export default ProfileScreen;
