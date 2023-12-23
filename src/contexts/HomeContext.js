import axios from 'axios';
import { createContext, useState, useContext } from 'react';

import { categories, restaurants, offers } from '~/constants/TempData';
import { AppContext } from './AppContext';

export const HomeContext = createContext({});

export const HomeProvider = ({ children }) => {
  const { BASE_URL } = useContext(AppContext);

  const [searchValue, setSearchValue] = useState('');
  const [categorySearchValue, setCategorySearchValue] = useState('');
  const [searchResultSelected, setSearchResultSelected] = useState('');

  const [categoriesList, setCategoriesList] = useState(categories);
  const [restaurantsList, setRestaurantsList] = useState(restaurants);
  const [offersList, setOffersList] = useState(offers);

  const fetchCategories = async () => {
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
        restaurantsList,
        setRestaurantsList,
        offersList,
        setOffersList,

        fetchCategories,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
