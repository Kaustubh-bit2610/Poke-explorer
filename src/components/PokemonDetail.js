// src/components/PokemonDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();
      setPokemon(data);
    };

    fetchPokemon();
  }, [id]);

  if (!pokemon) return <div>Loading...</div>;

  return (
    <div>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <div>
        <h2>Stats</h2>
        {pokemon.stats.map((stat) => (
          <div key={stat.stat.name}>
            <strong>{stat.stat.name}:</strong> {stat.base_stat}
          </div>
        ))}
      </div>
      <div>
        <h2>Abilities</h2>
        {pokemon.abilities.map((ability) => (
          <div key={ability.ability.name}>
            {ability.ability.name}
          </div>
        ))}
      </div>
      <div>
        <h2>Moves</h2>
        {pokemon.moves.slice(0, 5).map((move) => (
          <div key={move.move.name}>
            {move.move.name}
          </div>
        ))}
      </div>
      <div>
        <h2>Evolution Chain</h2>
        {/* Here you can implement the evolution chain logic */}
      </div>
    </div>
  );
};

export default PokemonDetail;
