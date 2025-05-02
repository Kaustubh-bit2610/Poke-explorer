// src/utils/fetchPokemons.js

export const fetchPokemons = async (page, itemsPerPage, sortBy, filterTypes) => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${(page - 1) * itemsPerPage}`;
    const response = await fetch(url);
    const data = await response.json();
  
    // Sorting and filtering logic
    let pokemons = data.results;
  
    // Example filter: You would need to adjust this based on your API response structure
    if (filterTypes.length > 0) {
      pokemons = pokemons.filter(pokemon => {
        // Add your filtering logic based on types (assuming the API provides 'types')
        return filterTypes.every(type => pokemon.types.includes(type));
      });
    }
  
    if (sortBy === 'name') {
      pokemons.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'id') {
      pokemons.sort((a, b) => a.id - b.id);
    }
  
    return pokemons;
  };
  