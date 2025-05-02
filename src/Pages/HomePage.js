import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function HomePage() {
  const [pokemonList, setPokemonList] = useState([]); // To store fetched Pokémon data
  const [itemsPerPage, setItemsPerPage] = useState(20); // Set default to 20 items per page
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch Pokémon data from the API
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000'); // Adjust the API URL for pagination
        const data = await response.json();

        // Now we need to fetch additional details for each Pokémon to get their images
        const pokemonsWithImages = await Promise.all(
          data.results.map(async (pokemon) => {
            const pokemonDetail = await fetch(pokemon.url);
            const pokemonData = await pokemonDetail.json();
            return {
              id: pokemonData.id, // Add Pokémon ID
              name: pokemon.name,
              image: pokemonData.sprites.front_default, // The image URL
            };
          })
        );

        console.log("Fetched Pokémon data with images and IDs: ", pokemonsWithImages); // Debugging: Check the data structure

        setPokemonList(pokemonsWithImages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        setLoading(false);
      }
    };
    fetchPokemons();
  }, []);

  // Handle page size change
  const handlePageSizeChange = (event) => {
    const newItemsPerPage = Number(event.target.value);
    setItemsPerPage(newItemsPerPage);

    // Calculate the total number of pages
    const totalPages = Math.ceil(pokemonList.length / newItemsPerPage);

    // Prevent current page from exceeding total pages
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  };

  // Handle page navigation (prev, next)
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate which Pokémon to display based on current page and items per page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPokemons = pokemonList.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f3f3f3', minHeight: '100vh', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', fontSize: '36px', marginBottom: '20px', color: '#ff6f61' }}>Pokémon List</h1>
      
      {/* 20 items per page filter */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <select
          onChange={handlePageSizeChange}
          value={itemsPerPage}
          style={{
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ddd',
            cursor: 'pointer',
          }}
        >
          <option value={10}>10 items per page</option>
          <option value={20}>20 items per page</option>
          <option value={50}>50 items per page</option>
        </select>
      </div>
      
      {/* Display loading text while fetching data */}
      {loading && <p style={{ textAlign: 'center', fontSize: '18px' }}>Loading Pokémon data...</p>}
      
      {/* Display Pokémon list */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {currentPokemons.length > 0 ? (
          currentPokemons.map((pokemon) => (
            <div
              key={pokemon.id} // Use Pokémon ID as the key for each item
              style={{
                width: '200px',
                margin: '15px',
                padding: '15px',
                backgroundColor: '#fff',
                borderRadius: '10px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              {/* Ensure that the image is being fetched and displayed */}
              {pokemon.image ? (
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  style={{
                    width: '100px',
                    height: '100px',
                    marginBottom: '10px',
                    borderRadius: '50%',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
                  }}
                />
              ) : (
                <p>No image available</p>
              )}
              <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>{pokemon.name}</p>
              <p style={{ fontSize: '14px', color: '#888' }}>ID: {pokemon.id}</p> {/* Display Pokémon ID */}
              
              {/* Add a Link to the DetailPage */}
              <Link to={`/pokemon/${pokemon.id}`} style={{ color: '#ff6f61', textDecoration: 'none' }}>
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', fontSize: '18px' }}>No Pokémon to display.</p>
        )}
      </div>

      {/* Pagination controls */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            margin: '0 10px',
            backgroundColor: '#ff6f61',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Previous
        </button>
        <span style={{ fontSize: '18px', margin: '0 10px' }}>Page {currentPage}</span>
        <button
          disabled={currentPage === Math.ceil(pokemonList.length / itemsPerPage)}
          onClick={() => handlePageChange(currentPage + 1)}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            margin: '0 10px',
            backgroundColor: '#ff6f61',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default HomePage;
