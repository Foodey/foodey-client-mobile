import { createContext, useState } from 'react';

export const HomeContext = createContext({});

export const HomeProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <HomeContext.Provider
      value={{
        searchValue,
        setSearchValue,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
