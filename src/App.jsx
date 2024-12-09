import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Page Components
import Home from './pages/Home';
import Quote from './pages/quote/Quote';
import Services from './pages/services/Services';
import Contact from './pages/contact/Contact';
import Areas from './pages/areas/Areas';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quote" element={<Quote />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/areas" element={<Areas />} />
      </Routes>
    </div>
  );
}

export default App;