// src/contexts/FavoritesContext.js
import React, { createContext, useState } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (pokemon) => {
    setFavorites([...favorites, pokemon]);
  };

  const removeFromFavorites = (pokemon) => {
    setFavorites(favorites.filter(fav => fav.id !== pokemon.id));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
