// src/Pages/FavoritesPage.js
import React, { useContext } from 'react';
import { FavoritesContext } from '../contexts/FavoritesContext';

const FavoritesPage = () => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <div>
      <h1>Favorite Pokémon</h1>
      <ul>
        {favorites.map(pokemon => (
          <li key={pokemon.name}>
            <p>{pokemon.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

// This is the key part: default export
export default FavoritesPage;
