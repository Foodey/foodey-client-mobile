import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import MyAsyncStorage from '~/utils/MyAsyncStorage';
import StorageKey from '~/constants/StorageKeys';

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  BASE_URL = 'http://10.0.2.2:8080/api';

  const [userInfo, setUserInfo] = useState({});
  const [accessToken, setAccessToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAppFirstLaunch, setIsAppFirstLaunch] = useState(null);

  const [pendingOrderList, setPendingOrderList] = useState({});

  const logout = async () => {
    // setIsLoading(true);
    try {
      axios.post(`${BASE_URL}/v1/auth/logout`, null, {
        headers: { Authorization: 'Bearer ' + userInfo.refreshToken },
      });
      MyAsyncStorage.removeItem(StorageKey.USER_INFO);
      MyAsyncStorage.removeItem(StorageKey.ACCESS_TOKEN);
      setUserInfo({});
      setAccessToken('1');
    } catch (err) {
      console.log('Error when logging out: ' + err);
    }

    // setIsLoading(false);
  };

  const requestNewAccessToken = () => {
    let isSuccess;
    axios
      .post(`${BASE_URL}/v1/auth/refresh-token`, null, {
        headers: { Authorization: 'Bearer ' + userInfo.refreshToken },
      })
      .then((response) => {
        let tempUserInfo = response.data;
        setUserInfo(tempUserInfo);
        setAccessToken(tempUserInfo.accessToken);

        AsyncStorage.setItem('userInfo', JSON.stringify(tempUserInfo));
        AsyncStorage.setItem('accessToken', tempUserInfo.accessToken);

        console.log('Setting new accessToken successful');
        isSuccess = true;
      })
      .catch((err) => {
        console.log('Error status: ' + err.response.status);
        isSuccess = false;
      });
    return isSuccess;
  };

  const getPendingOrder = () => {
    axios
      .get(`${BASE_URL}/v1/orders?page=3&status=PENDING`, {
        headers: { Authorization: 'Bearer ' + userInfo.accessToken },
      })
      .then((response) => {
        setPendingOrderList(response.data);
        console.log('Success getting pending order');
      })
      .catch((err) => {
        console.log('Error status code: ' + err.response.status);
      });
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

        pendingOrderList,
        setPendingOrderList,

        //API calls
        requestNewAccessToken,
        getPendingOrder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
