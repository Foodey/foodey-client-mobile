import { createContext, useState } from 'react';

export const HomeContext = createContext({});

export const HomeProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState('');
  const [categorySearchValue, setCategorySearchValue] = useState('');
  const [searchResultSelected, setSearchResultSelected] = useState('');

  return (
    <HomeContext.Provider
      value={{
        searchValue,
        setSearchValue,

        categorySearchValue,
        setCategorySearchValue,

        searchResultSelected,
        setSearchResultSelected,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
