import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage'; // Homepage with Pokémon list
import DetailPage from './Pages/DetailPage'; // Detailed page for each Pokémon
import FavoritesPage from './Pages/FavoritesPage'; // Page showing favorite Pokémon
import ComparePage from './components/ComparePage'; // Page to compare two Pokémon
import { FavoritesProvider } from './contexts/FavoritesContext'; // Context for managing favorites
import ErrorBoundary from './contexts/ErrorBoundary'; // Error boundary to catch errors in any component

function App() {
  return (
    // Wrapping the entire app with FavoritesProvider and ErrorBoundary to manage state and errors
    <FavoritesProvider>
      <Router>
        {/* Wrapping Routes with ErrorBoundary to catch any errors in navigation or components */}
        <ErrorBoundary>
          <Routes>
            {/* HomePage: List of all Pokémon */}
            <Route path="/" element={<HomePage />} />
            
            {/* DetailPage: Display detailed information for a specific Pokémon */}
            <Route path="/pokemon/:id" element={<DetailPage />} />
            
            {/* FavoritesPage: List of Pokémon marked as favorites */}
            <Route path="/favorites" element={<FavoritesPage />} />
            
            {/* ComparePage: Compare stats of two selected Pokémon */}
            <Route path="/compare" element={<ComparePage />} />
          </Routes>
        </ErrorBoundary>
      </Router>
    </FavoritesProvider>
  );
}

export default App;
