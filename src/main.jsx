// Import React library for building user interfaces
import React from 'react';
// Import ReactDOM for rendering React components to the DOM
import ReactDOM from 'react-dom/client';
// Import global CSS styles
import './index.css';
// Import the main App component
import App from './App.jsx';

// Create a root element for the React application
// This connects React to the HTML element with id 'root'
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside React.StrictMode
// StrictMode helps identify potential problems in the application during development
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
