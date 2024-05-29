import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import MyAsyncStorage from '~/utils/MyAsyncStorage';
import StorageKey from '~/constants/StorageKey';
import { getPendingOrderAPI, getDeliveredOrderAPI } from '../apiServices/OrdersService';
import HTTPStatus from '../constants/HTTPStatusCodes';
import { ProfileEndpoint } from '../constants/API_Endpoints';

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  BASE_URL = 'http://10.0.2.2:8080/api';
  // BASE_URL = 'https://d100-116-110-43-242.ngrok-free.app/api';

  const [userInfo, setUserInfo] = useState({});
  const [accessToken, setAccessToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAppFirstLaunch, setIsAppFirstLaunch] = useState(null);

  const [pendingOrderList, setPendingOrderList] = useState({});
  const [deliveredOrderList, setDeliveredOrderList] = useState({});

  const logout = async () => {
    // setIsLoading(true);
    try {
      const refreshToken = await MyAsyncStorage.getItem(StorageKey.REFRESH_TOKEN);

      axios.post(`${BASE_URL}${ProfileEndpoint.LOG_OUT}`, null, {
        headers: { Authorization: 'Bearer ' + refreshToken },
      });

      MyAsyncStorage.removeItem(StorageKey.USER_INFO);
      MyAsyncStorage.removeItem(StorageKey.ACCESS_TOKEN);
      MyAsyncStorage.removeItem(StorageKey.REFRESH_TOKEN);

      setUserInfo({});
      setAccessToken('1');
    } catch (err) {
      console.log('Error when logging out: ' + err);
    }
    // const response = await fetch('https://d100-116-110-43-242.ngrok-free.app/api');
    // console.log(await response.json());

    // setIsLoading(false);
  };

  const getPendingOrder = async () => {
    try {
      const response = await getPendingOrderAPI();
      if (response.status === HTTPStatus.OK) {
        setPendingOrderList(response.data.content);
        // console.log('Successfully');
      } else {
        console.log('Unexpected error when fetching user pending order');
      }
    } catch (err) {
      console.log('Unexpected error when fetching user pending order ' + err);
    }
  };

  const getDeliveredOrder = async () => {
    try {
      const response = await getDeliveredOrderAPI();
      if (response.status === HTTPStatus.OK) {
        setDeliveredOrderList(response.data.content);
        // console.log('Successfully');
      } else {
        console.log('Unexpected error when fetching user delivered order');
      }
    } catch (err) {
      console.log('Unexpected error when fetching user delivered order ' + err);
    }
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
        deliveredOrderList,
        setDeliveredOrderList,

        //API calls
        getPendingOrder,
        getDeliveredOrder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
