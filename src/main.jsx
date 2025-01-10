import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

// Set the API base URL based on environment
const apiBaseUrl = import.meta.env.PROD 
  ? 'http://localhost' // Production API URL
  : '${window.api.baseUrl}/api/contact'; // Development API URL

// Create axios instance or fetch wrapper with the base URL
const api = {
  baseUrl: apiBaseUrl,
  post: (endpoint, data) => 
    fetch(`${apiBaseUrl}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
};

// Make it available globally
window.api = api;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);