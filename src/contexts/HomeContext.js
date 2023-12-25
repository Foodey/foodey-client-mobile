import axios from 'axios';
import { createContext, useState, useContext } from 'react';

import { categories, restaurants, offers } from '~/constants/TempData';
import { AppContext } from './AppContext';

export const HomeContext = createContext({});

export const HomeProvider = ({ children }) => {
  const { BASE_URL, userInfo, requestNewAccessToken } = useContext(AppContext);

  const [searchValue, setSearchValue] = useState('');
  const [categorySearchValue, setCategorySearchValue] = useState('');
  const [searchResultSelected, setSearchResultSelected] = useState('');

  const [categoriesList, setCategoriesList] = useState(categories);
  const [offersList, setOffersList] = useState(offers);
  const [restaurantsByCategoryList, setRestaurantsByCategoryList] = useState({});
  const [restaurantMenuList, setRestaurantMenuList] = useState({});
  const [cartInfo, setCartInfo] = useState({});

  const getAllCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/v1/product-categories`, {
        params: { page: 1, limit: 12 },
      });

      if (response.status === 200) {
        setCategoriesList(response.data);
      }
    } catch (err) {
      console.log('Fetch category: ' + err);
    }
  };

  const getRestaurantsByCategory = async (categoryID) => {
    try {
      const response = await axios.get(`${BASE_URL}/v1/branches/categories/${categoryID}`);

      if (response.status === 200) {
        setRestaurantsByCategoryList(response.data);
      }
    } catch (err) {
      console.log('Fetch category: ' + err);
    }
  };

  const getMenuByRestaurantID = async (restaurantID) => {
    try {
      const response = await axios.get(`${BASE_URL}/v1/branches/${restaurantID}/menus/0/products`);

      if (response.status === 200) {
        setRestaurantMenuList(response.data);
      }
    } catch (err) {
      console.log('Fetch category: ' + err);
    }
  };

  const addProductToCart = (restaurantID, productID, quantity) => {
    let isSuccess;
    axios
      .post(
        `${BASE_URL}/v1/shopcart/branches/${restaurantID}/products/${productID}?quantity=${quantity}`,
        null,
        {
          headers: { Authorization: 'Bearer ' + userInfo.accessToken },
        },
      )
      .then((response) => {
        console.log('Successfully adding ' + quantity + ' units to cart');
        isSuccess = true;
      })
      .catch((err) => {
        if (err.response.status === 401) {
          console.log('Error status: 401');
          isSuccess = false;
        } else {
          console.log('Unexpected error when calling adding to cart');
          isSuccess = false;
        }
      });
    return isSuccess;
  };

  const getCartInfoByResID = (restaurantID) => {
    axios
      .get(`${BASE_URL}/v1/shopcart/branches/${restaurantID}`, {
        headers: { Authorization: 'Bearer ' + userInfo.accessToken },
      })
      .then((response) => {
        setCartInfo(response.data);
        console.log(response.data.totalPrice);
      })
      .catch((err) => {
        console.log('Error status code: ' + err.response.status);
      });
  };

  const deleteAllCartInfoByResID = (restaurantID) => {
    axios
      .delete(`${BASE_URL}/v1/shopcart/branches/${restaurantID}`, {
        headers: { Authorization: 'Bearer ' + userInfo.accessToken },
      })
      .then(() => {
        setCartInfo({});
      })
      .catch((err) => {
        console.log('Error status code: ' + err.response.status);
      });
  };

  const placeOrder = (restaurantID, items, totalPrice) => {
    let isSuccess;

    axios
      .post(
        `${BASE_URL}/v1/orders`,
        {
          branchId: restaurantID,
          shippingAddress: '69 Tân Lập, Dĩ An, Bình Dương',
          items: items,
          payment: {
            method: 'CASH',
            status: 'UNPAID',
            price: totalPrice,
          },
        },
        {
          headers: { Authorization: 'Bearer ' + userInfo.accessToken },
        },
      )
      .then((response) => {
        isSuccess = true;
        console.log('Order place successfully');
      })
      .catch((err) => {
        isSuccess = false;
        console.log('Error when placing order: ' + err.response.status);
      });

    return isSuccess;
  };

  return (
    <HomeContext.Provider
      value={{
        //Search
        searchValue,
        setSearchValue,

        categorySearchValue,
        setCategorySearchValue,

        searchResultSelected,
        setSearchResultSelected,

        //Lists
        categoriesList,
        setCategoriesList,
        restaurantsByCategoryList,
        setRestaurantsByCategoryList,
        offersList,
        setOffersList,
        restaurantMenuList,
        setRestaurantMenuList,
        cartInfo,
        setCartInfo,

        //API calls
        getAllCategories,
        getRestaurantsByCategory,
        getMenuByRestaurantID,
        addProductToCart,
        getCartInfoByResID,
        deleteAllCartInfoByResID,
        placeOrder,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
