// src/PokemonCard.js
import React from 'react';
import './PokemonCard.css'; // Import the CSS for styling

const PokemonCard = ({ pokemon }) => {
  const { name, id, sprites, types } = pokemon;

  // Get the types as a comma-separated list
  const typeList = types.map((type) => type.type.name).join(', ');

  return (
    <div className="pokemon-card">
      <img src={sprites.front_default} alt={name} />
      <h3>{name}</h3>
      <p>ID: {id}</p>
      <p>Types: {typeList}</p>
    </div>
  );
};

export default PokemonCard;
