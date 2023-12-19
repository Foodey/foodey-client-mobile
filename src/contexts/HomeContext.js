import { createContext, useState } from 'react';

import { categories, restaurants, offers } from '~/constants/TempData';

export const HomeContext = createContext({});

export const HomeProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState('');
  const [categorySearchValue, setCategorySearchValue] = useState('');
  const [searchResultSelected, setSearchResultSelected] = useState('');

  const [categoriesList, setCategoriesList] = useState(categories);
  const [restaurantsList, setRestaurantsList] = useState(restaurants);
  const [offersList, setOffersList] = useState(offers);

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
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
