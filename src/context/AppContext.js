import React, { createContext, useState, useEffect } from 'react';
import { getData, saveData, removeData } from '../utils/storage';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const token = await getData('userToken');
      const savedOrders = await getData('orders');

      if (token) setUserToken(token);
      if (savedOrders) setOrders(savedOrders);
    };
    loadData();
  }, []);

  // login
 const login = async (email, password) => {
  if (email === 'test@example.com' && password === '123456') {
    const token = 'dummy-token';
    setUserToken(token);
    await saveData('userToken', token);
    return true;
  }
  return false;
};


  // logout condition
  const logout = async () => {
    setUserToken(null);
    setCartItems([]);
    await removeData('userToken');
  };

  // Cart operations
  const addToCart = (product) => setCartItems(prev => [...prev, product]);
  const removeFromCart = (index) =>
    setCartItems(prev => prev.filter((_, i) => i !== index));
  const clearCart = () => setCartItems([]);

  // Order operations
  const saveOrder = async (order) => {
    const updatedOrders = [order, ...orders];
    setOrders(updatedOrders);
    await saveData('orders', updatedOrders);
  };

  const clearOrders = async () => {
    setOrders([]);
    await removeData('orders');
  };

  return (
    <AppContext.Provider
      value={{
        userToken,
        login,
        logout,
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        orders,
        saveOrder,
        clearOrders,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
