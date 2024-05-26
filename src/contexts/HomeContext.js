import axios from 'axios';
import { createContext, useState, useContext } from 'react';

import { categories, restaurants, offers } from '~/constants/TempData';
import { AppContext } from './AppContext';

export const HomeContext = createContext({});

export const HomeProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState('');
  const [categorySearchValue, setCategorySearchValue] = useState('');
  const [searchResultSelected, setSearchResultSelected] = useState('');

  const [categoriesList, setCategoriesList] = useState(categories);
  const [offersList, setOffersList] = useState(offers);
  const [restaurantsByCategoryList, setRestaurantsByCategoryList] = useState({});
  const [restaurantMenuList, setRestaurantMenuList] = useState({});
  const [cartInfo, setCartInfo] = useState({});

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
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
