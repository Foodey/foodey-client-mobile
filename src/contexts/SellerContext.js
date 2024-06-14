import { createContext, useState, useContext } from 'react';
import HTTPStatus from '../constants/HTTPStatusCodes';
import {
  getSellerBrandAPI,
  getShopOfBrandAPI,
  getShopOrderByOrderStatusAPI,
} from '../apiServices/SellerService';
import { getMenuByRestaurantAPI } from '../apiServices/HomeService';

export const SellerContext = createContext({});

export const SellerProvider = ({ children }) => {
  const [brandList, setBrandList] = useState([]);
  const [shopList, setShopList] = useState([]);

  const [pendingOrderList, setPendingOrderList] = useState([]);
  const [confirmedOrderList, setConfirmedOrderList] = useState([]);
  const [completedOrderList, setCompletedOrderList] = useState([]);
  const [deliveredOrderList, setDeliveredOrderList] = useState([]);

  const [contextShopLocation, setContextShopLocation] = useState({});

  const [productList, setProductList] = useState([]);

  const getBrands = async () => {
    try {
      const response = await getSellerBrandAPI(20);
      if (response.status === HTTPStatus.OK) {
        setBrandList(response.data.content);
      } else {
        console.log('Error when fetching seller brand list');
      }
    } catch (err) {
      console.log('Error when fetching seller brand list ' + err);
    }
  };

  const getShops = async (brandID) => {
    try {
      const response = await getShopOfBrandAPI(brandID);
      if (response.status === HTTPStatus.OK) {
        setShopList(response.data.content);
      } else {
        console.log('Error when fetching seller shop list');
      }
    } catch (err) {
      console.log('Error when fetching seller shop list ' + err);
    }
  };

  const getPendingOrderOfShop = async (shopID) => {
    try {
      const response = await getShopOrderByOrderStatusAPI(shopID, 'PENDING');
      if (response.status === HTTPStatus.OK) {
        setPendingOrderList(response?.data?.content);
      } else {
        console.log('Error when fetching shop pending order list');
      }
    } catch (err) {
      console.log('Error when fetching shop pending order list ' + err);
    }
  };

  const getConfirmedOrderOfShop = async (shopID) => {
    try {
      const response = await getShopOrderByOrderStatusAPI(shopID, 'STORE_CONFIRMED');
      if (response.status === HTTPStatus.OK) {
        setConfirmedOrderList(response?.data?.content);
      } else {
        console.log('Error when fetching shop confirmed order list');
      }
    } catch (err) {
      console.log('Error when fetching shop confirmed order list ' + err);
    }
  };

  const getDeliveredOrderOfShop = async (shopID) => {
    try {
      const response = await getShopOrderByOrderStatusAPI(shopID, 'DELIVERED');
      if (response.status === HTTPStatus.OK) {
        setDeliveredOrderList(response?.data?.content);
      } else {
        console.log('Error when fetching shop delivered order list');
      }
    } catch (err) {
      console.log('Error when fetching shop delivered order list ' + err);
    }
  };

  const getCompletedOrderOfShop = async (shopID) => {
    try {
      const deliveringResponse = await getShopOrderByOrderStatusAPI(shopID, 'DELIVERING');
      const deliveredResponse = await getShopOrderByOrderStatusAPI(shopID, 'DELIVERED');
      const canceledResponse = await getShopOrderByOrderStatusAPI(shopID, 'CANCELED');

      if (
        deliveredResponse.status === HTTPStatus.OK &&
        deliveringResponse.status === HTTPStatus.OK &&
        canceledResponse.status === HTTPStatus.OK
      ) {
        const completedOrders = [
          ...deliveredResponse?.data?.content,
          ...deliveringResponse?.data?.content,
          ...canceledResponse?.data?.content,
        ];
        // console.log(completedOrders.length);
        setCompletedOrderList(completedOrders);
      }
    } catch (err) {
      console.log('Error when fetching shop order list ' + err);
    }
  };

  const getProductList = async (brandID, shopID) => {
    try {
      const response = await getMenuByRestaurantAPI(brandID, shopID);
      if (response.status === HTTPStatus.OK) {
        setProductList(response.data.products);
      }
    } catch (err) {
      console.log('Error when getting product list: ' + err);
    }
  };

  return (
    <SellerContext.Provider
      value={{
        brandList,
        setBrandList,
        shopList,
        setShopList,
        pendingOrderList,
        setPendingOrderList,
        confirmedOrderList,
        setConfirmedOrderList,
        completedOrderList,
        setCompletedOrderList,
        deliveredOrderList,
        setDeliveredOrderList,
        contextShopLocation,
        setContextShopLocation,
        productList,
        setProductList,

        //APIs
        getBrands,
        getShops,

        getPendingOrderOfShop,
        getConfirmedOrderOfShop,
        getCompletedOrderOfShop,
        getDeliveredOrderOfShop,
        getProductList,
      }}
    >
      {children}
    </SellerContext.Provider>
  );
};
