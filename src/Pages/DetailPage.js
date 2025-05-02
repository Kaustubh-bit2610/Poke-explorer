import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function DetailPage() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) {
          throw new Error('Pokémon not found');
        }
        const data = await response.json();

        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();
        const evolutionChainUrl = speciesData.evolution_chain.url;
        const evolutionChainResponse = await fetch(evolutionChainUrl);
        const evolutionChainData = await evolutionChainResponse.json();

        setPokemon({
          ...data,
          evolutionChain: evolutionChainData.chain,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  if (loading) return <p>Loading Pokémon details...</p>;
  if (error) return <p>{error}</p>;
  if (!pokemon) return <p>Pokémon not found.</p>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', fontSize: '36px', color: '#ff6f61' }}>
        {capitalize(pokemon.name)}
      </h1>

      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        style={{
          width: '200px',
          height: '200px',
          display: 'block',
          margin: '0 auto',
          borderRadius: '50%',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      />

      <h3>Stats</h3>
      <ul>
        {pokemon.stats.map((stat) => (
          <li key={stat.stat.name}>
            <strong>{capitalize(stat.stat.name)}:</strong> {stat.base_stat}
          </li>
        ))}
      </ul>

      <h3>Abilities</h3>
      <ul>
        {pokemon.abilities.map((ability) => (
          <li key={ability.ability.name}>{capitalize(ability.ability.name)}</li>
        ))}
      </ul>

      <h3>Moves</h3>
      <ul>
        {pokemon.moves.slice(0, 10).map((move) => (
          <li key={move.move.name}>{capitalize(move.move.name)}</li>
        ))}
      </ul>

      <h3>Evolution Chain</h3>
      <ul>
        {pokemon.evolutionChain && renderEvolutionChain(pokemon.evolutionChain)}
      </ul>
    </div>
  );
}

const renderEvolutionChain = (chain) => {
  const evolutions = [];
  let current = chain;
  while (current) {
    evolutions.push(
      <li key={current.species.name}>{capitalize(current.species.name)}</li>
    );
    current = current.evolves_to?.[0] || null;
  }
  return evolutions;
};

export default DetailPage;
