import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CartContext = createContext();

const STORAGE_KEY = 'CART_STATE';

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        setCart(JSON.parse(saved));
      }
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = item => {
    setCart(prev => [...prev, item]);
  };

  const removeFromCart = uniqueId => {
    setCart(prev => prev.filter(i => i.uniqueId !== uniqueId));
  };

  const isAdded = uniqueId => {
    return cart.some(i => i.uniqueId === uniqueId);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, isAdded }}>
      {children}
    </CartContext.Provider>
  );
};
