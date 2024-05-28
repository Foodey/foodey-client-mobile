import React, { createContext, useRef, useContext } from 'react';

const BottomTabNavigatorContext = createContext();

export const BottomTabNavigatorProvider = ({ children }) => {
  const navigationRef = useRef();

  return (
    <BottomTabNavigatorContext.Provider value={navigationRef}>
      {children}
    </BottomTabNavigatorContext.Provider>
  );
};

export const useNavigationRef = () => useContext(BottomTabNavigatorContext);
