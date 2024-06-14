import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import MyAsyncStorage from '../utils/MyAsyncStorage';
import StorageKey from '../constants/StorageKey';
import {
  getPendingOrderAPI,
  getStoreConfirmedOrderAPI,
  getDeliveringOrderAPI,
  getDeliveredOrderAPI,
  getCanceledOrderAPI,
  // getFavoriteMealsAPI,
  getFavoriteRestaurantsAPI,
  addFavoriteRestaurantsAPI,
  removeFavoriteRestaurantsAPI,
} from '../apiServices/UserService';
import HTTPStatus from '../constants/HTTPStatusCodes';
import { ProfileEndpoint } from '../constants/API_Endpoints';

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  BASE_URL = 'http://10.0.2.2:8080/api';
  // BASE_URL = 'https://705f-115-78-100-76.ngrok-free.app/api';

  const [userInfo, setUserInfo] = useState({});
  const [accessToken, setAccessToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAppFirstLaunch, setIsAppFirstLaunch] = useState(null);

  const [pendingOrderList, setPendingOrderList] = useState([]);
  const [deliveredOrderList, setDeliveredOrderList] = useState([]);
  const [storeConfirmedOrderList, setStoreConfirmedOrderList] = useState([]);
  const [deliveringOrderList, setDeliveringOrderList] = useState([]);
  const [canceledOrderList, setCanceledOrderList] = useState([]);

  const [favoriteRestaurants, setFavoriteRestaurants] = useState({});
  const [favoriteMeals, setFavoriteMeals] = useState({});
  const [searchHistory, setSearchHistory] = useState([]);

  const logout = async () => {
    // setIsLoading(true);
    try {
      const refreshToken = await MyAsyncStorage.getItem(StorageKey.REFRESH_TOKEN);

      const response = await axios.post(`${BASE_URL}${ProfileEndpoint.LOG_OUT}`, null, {
        headers: { Authorization: 'Bearer ' + refreshToken },
      });

      console.log(response.status);

      await MyAsyncStorage.removeItem(StorageKey.USER_INFO);
      await MyAsyncStorage.removeItem(StorageKey.ACCESS_TOKEN);
      await MyAsyncStorage.removeItem(StorageKey.REFRESH_TOKEN);
      await MyAsyncStorage.removeItem(StorageKey.FAVORITE_RESTAURANTS);
      // await MyAsyncStorage.removeItem(StorageKey.FAVORITE_MEALS);
      await MyAsyncStorage.removeItem(StorageKey.SEARCH_HISTORY);

      setUserInfo({});
      setFavoriteRestaurants({});
      // setFavoriteMeals({});
      setSearchHistory([]);
      setPendingOrderList({});
      setDeliveredOrderList({});

      setAccessToken('1'); //logout here.
    } catch (err) {
      console.log('Error when logging out: ' + err);
    }
    // setIsLoading(false);
  };

  const getPendingOrder = async () => {
    try {
      const response = await getPendingOrderAPI();
      if (response.status === HTTPStatus.OK) {
        // console.log('Pending Order: ' + response.data.content);
        setPendingOrderList(response.data.content);
        // console.log('Successfully');
      } else {
        console.log('Unexpected error when fetching user pending order');
      }
    } catch (err) {
      console.log('Unexpected error when fetching user pending order ' + err);
    }
  };

  const getStoreConfirmedOrder = async () => {
    try {
      const response = await getStoreConfirmedOrderAPI();
      if (response.status === HTTPStatus.OK) {
        // console.log('Store confirmed Order: ' + response.data.content);
        setStoreConfirmedOrderList(response.data.content);
        // console.log('Successfully');
      } else {
        console.log('Unexpected error when fetching user store confirmed order');
      }
    } catch (err) {
      console.log('Unexpected error when fetching user store confirmed order ' + err);
    }
  };

  const getDeliveringOrder = async () => {
    try {
      const response = await getDeliveringOrderAPI();
      if (response.status === HTTPStatus.OK) {
        // console.log('Delivering Order: ' + response.data.content);
        setDeliveringOrderList(response.data.content);
        // console.log('Successfully');
      } else {
        console.log('Unexpected error when fetching user delivering order');
      }
    } catch (err) {
      console.log('Unexpected error when fetching user delivering order ' + err);
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

  const getCanceledOrder = async () => {
    try {
      const response = await getCanceledOrderAPI();
      if (response.status === HTTPStatus.OK) {
        setCanceledOrderList(response.data.content);
        // console.log('Successfully');
      } else {
        console.log('Unexpected error when fetching user canceled order');
      }
    } catch (err) {
      console.log('Unexpected error when fetching user canceled order ' + err);
    }
  };

  const getFavoriteRestaurants = async () => {
    try {
      const response = await getFavoriteRestaurantsAPI();
      if (response.status === HTTPStatus.OK) {
        const tempData = response.data.content;

        MyAsyncStorage.setItem(StorageKey.FAVORITE_RESTAURANTS, JSON.stringify(tempData));
        setFavoriteRestaurants(tempData);
      } else {
        console.log('Unexpected error when fetching user favorite restaurants');
      }
    } catch (err) {
      console.log('Unexpected error when fetching user favorite restaurants ' + err);
    }
  };

  const addFavoriteRestaurants = async (restaurantID) => {
    try {
      const response = await addFavoriteRestaurantsAPI(restaurantID);

      if (response.status === HTTPStatus.NO_CONTENT) {
        // console.log('Success adding favorite restaurant');
        await getFavoriteRestaurants();
      } else {
        console.log('Unexpected error when adding favorites restaurant');
      }
    } catch (err) {
      console.log('Unexpected error when adding favorites restaurant ' + err);
    }
  };

  const removeFavoriteRestaurants = async (restaurantID) => {
    try {
      const response = await removeFavoriteRestaurantsAPI(restaurantID);

      if (response.status === HTTPStatus.NO_CONTENT) {
        // console.log('Success removing favorite restaurant');
        await getFavoriteRestaurants();
      } else {
        console.log('Unexpected error when removing favorites restaurant');
      }
    } catch (err) {
      console.log('Unexpected error when removing favorites restaurant ' + err);
    }
  };

  // const getFavoriteMeals = async () => {
  //   try {
  //     const response = await getFavoriteMealsAPI();
  //     if (response.status === HTTPStatus.OK) {
  //       const tempData = response.data.content;

  //       MyAsyncStorage.setItem(StorageKey.FAVORITE_MEALS, JSON.stringify(tempData));
  //       setFavoriteMeals(tempData);
  //     } else {
  //       console.log('Unexpected error when fetching user favorite meals');
  //     }
  //   } catch (err) {
  //     console.log('Unexpected error when fetching user favorite meals ' + err);
  //   }
  // };

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
        searchHistory,
        setSearchHistory,

        // isLoggedIn,
        isAppFirstLaunch,
        setIsAppFirstLaunch,

        pendingOrderList,
        setPendingOrderList,
        storeConfirmedOrderList,
        setStoreConfirmedOrderList,
        deliveringOrderList,
        setDeliveringOrderList,
        deliveredOrderList,
        setDeliveredOrderList,
        canceledOrderList,
        setCanceledOrderList,

        favoriteRestaurants,
        setFavoriteRestaurants,
        favoriteMeals,
        setFavoriteMeals,

        //API calls
        getPendingOrder,
        getDeliveredOrder,
        getStoreConfirmedOrder,
        getDeliveringOrder,
        getCanceledOrder,

        getFavoriteRestaurants,
        // getFavoriteMeals,
        addFavoriteRestaurants,
        removeFavoriteRestaurants,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
