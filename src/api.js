// src/api.js
export const fetchPokemons = async () => {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=150'; // Fetch the first 150 Pokémon
    try {
      const response = await fetch(url);
      const data = await response.json();
      // Fetch detailed data for each Pokémon (including type and sprite)
      const detailedData = await Promise.all(
        data.results.map(async (pokemon) => {
          const pokeDetail = await fetch(pokemon.url);
          return pokeDetail.json();
        })
      );
      return detailedData; // Return the detailed data for all Pokémon
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
      return []; // Return an empty array if the fetch fails
    }
  };
  