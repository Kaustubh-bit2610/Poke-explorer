// src/App.js
import React, { useState, useEffect } from 'react';
import { fetchPokemons } from './api'; // Import the function to fetch data
import PokemonCard from './PokemonCard'; // Import the PokemonCard component
import './App.css'; // Import the CSS file

const App = () => {
  const [pokemons, setPokemons] = useState([]); // State for storing Pokémon data
  const [loading, setLoading] = useState(true); // State for loading
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [filterType, setFilterType] = useState(''); // State for filter type

  // Fetch Pokémon data when the component mounts
  useEffect(() => {
    const getPokemons = async () => {
      const data = await fetchPokemons(); // Fetch data from API
      setPokemons(data); // Store the data in the state
      setLoading(false); // Set loading to false once data is fetched
    };
    getPokemons();
  }, []);

  // Filter Pokémon by name and type
  const filteredPokemons = pokemons.filter((pokemon) => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType
      ? pokemon.types.some((type) => type.type.name === filterType)
      : true; // If no filter type is selected, show all
    return matchesSearch && matchesType;
  });

  return (
    <div className="app">
      <h1>Pokémon Explorer</h1>

      {/* Search Input with Label */}
      <div className="filter-group">
        <label htmlFor="search" className="search-label">
          Search Pokémon by name:
        </label>
        <input
          id="search"
          type="text"
          placeholder="Search Pokémon"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Filter by Type Dropdown with Label */}
      <div className="filter-group">
        <label htmlFor="type-filter" className="filter-label">
          Filter by Type:
        </label>
        <select
          id="type-filter"
          onChange={(e) => setFilterType(e.target.value)}
          value={filterType}
        >
          <option value="">All Types</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
          <option value="electric">Electric</option>
          <option value="fighting">Fighting</option>
          <option value="poison">Poison</option>
          <option value="ground">Ground</option>
          <option value="flying">Flying</option>
          <option value="psychic">Psychic</option>
          <option value="bug">Bug</option>
          <option value="rock">Rock</option>
          <option value="ghost">Ghost</option>
          <option value="dragon">Dragon</option>
          <option value="steel">Steel</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      {/* Loading State */}
      {loading ? (
        <p>Loading Pokémon...</p>
      ) : (
        <div className="pokemon-container">
          {filteredPokemons.length > 0 ? (
            filteredPokemons.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))
          ) : (
            <p>No Pokémon found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
