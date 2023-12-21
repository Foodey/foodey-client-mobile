import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  BASE_URL = 'http://10.0.2.2:8080/api';

  const [userInfo, setUserInfo] = useState({});
  const [accessToken, setAccessToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAppFirstLaunch, setIsAppFirstLaunch] = useState(null);

  const logout = () => {
    // setIsLoading(true);
    AsyncStorage.removeItem('userInfo');
    AsyncStorage.removeItem('accessToken');
    // setIsLoading(false);
    setAccessToken('1');
  };

  // const isLoggedIn = async () => {
  //   try {
  //     let userInfo = await AsyncStorage.getItem('userInfo');
  //     let accessToken = await AsyncStorage.getItem('accessToken');
  //     userInfo = JSON.parse(userInfo);

  //     if (userInfo) {
  //       setAccessToken(accessToken);
  //       setUserInfo(userInfo);
  //     }
  //   } catch (e) {
  //     console.log('Is logged in error ' + e);
  //   }
  // };

  //   useEffect(() => {
  //     isLoggedIn();
  //   }, []);

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
