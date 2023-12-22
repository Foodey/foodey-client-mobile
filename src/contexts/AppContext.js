import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  BASE_URL = 'http://10.0.2.2:8080/api';

  const [userInfo, setUserInfo] = useState({});
  const [accessToken, setAccessToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAppFirstLaunch, setIsAppFirstLaunch] = useState(null);

  const logout = async () => {
    // setIsLoading(true);
    try {
      axios.post(`${BASE_URL}/v1/auth/logout`, null, {
        headers: { Authorization: 'Bearer ' + userInfo.refreshToken },
      });
      AsyncStorage.removeItem('userInfo');
      AsyncStorage.removeItem('accessToken');
      setUserInfo({});
      setAccessToken('1');
    } catch (err) {
      console.log('Error when logging out: ' + err);
    }

    // setIsLoading(false);
  };

  return (
    <AppContext.Provider
      value={{
        BASE_URL,

        userInfo,
        setUserInfo,

        accessToken,
        setAccessToken,

        isLoading,
        setIsLoading,

        logout,
        // isLoggedIn,
        isAppFirstLaunch,
        setIsAppFirstLaunch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
