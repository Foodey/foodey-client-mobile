import { createContext, useState, useContext } from 'react';
import HTTPStatus from '../constants/HTTPStatusCodes';
import { getSellerBrandAPI, getShopOfBrandAPI } from '../apiServices/SellerService';

export const SellerContext = createContext({});

export const SellerProvider = ({ children }) => {
  const [brandList, setBrandList] = useState({});
  const [shopList, setShopList] = useState({});

  const getBrands = async () => {
    try {
      const response = await getSellerBrandAPI(5);
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
        console.log('Error when fetching seller brand list');
      }
    } catch (err) {
      console.log('Error when fetching seller brand list ' + err);
    }
  };

  return (
    <SellerContext.Provider
      value={{
        brandList,
        setBrandList,
        shopList,
        setShopList,

        getBrands,
        getShops,
      }}
    >
      {children}
    </SellerContext.Provider>
  );
};
