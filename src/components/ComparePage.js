// src/components/ComparePage.js
import React, { useState, useEffect } from 'react';

function ComparePage() {
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);

  const fetchPokemon = (id, setPokemon) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data));
  };

  useEffect(() => {
    if (pokemon1) {
      fetchPokemon(pokemon1, setPokemon2);
    }
  }, [pokemon1]);

  return (
    <div>
      <h1>Compare Pokémon</h1>
      <input
        type="text"
        placeholder="Enter Pokémon 1 name"
        onChange={(e) => setPokemon1(e.target.value)}
      />
      {pokemon1 && <p>Comparing: {pokemon1}</p>}

      <input
        type="text"
        placeholder="Enter Pokémon 2 name"
        onChange={(e) => setPokemon2(e.target.value)}
      />
      {pokemon2 && <p>Comparing: {pokemon2}</p>}

      {pokemon1 && pokemon2 && (
        <div>
          <h3>Stats Comparison</h3>
          <div>
            <p>Pokemon 1: {pokemon1.name}</p>
            <p>Pokemon 2: {pokemon2.name}</p>
            <p>Attack: {pokemon1.stats[1].base_stat} vs {pokemon2.stats[1].base_stat}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ComparePage;
