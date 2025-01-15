// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Quote from './pages/quote/Quote';
import Services from './pages/services/Services';
import Contact from './pages/contact/Contact';
import Areas from './pages/areas/Areas';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import SetupTwoFactor from './pages/admin/SetupTwoFactor';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quote" element={<Quote />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/areas" element={<Areas />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/setup-2fa"
          element={
            <ProtectedRoute>
              <SetupTwoFactor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requireTwoFactor={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;