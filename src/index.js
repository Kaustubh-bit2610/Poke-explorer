// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Use ReactDOM from 'react-dom/client'
import App from './App'; // Import the App component
import './index.css'; // Import any global styles

// Create a root and render the App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
