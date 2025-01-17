// src/App.jsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy load components
const Home = lazy(() => import('./pages/Home'));
const Quote = lazy(() => import('./pages/quote/Quote'));
const Services = lazy(() => import('./pages/services/Services'));
const Contact = lazy(() => import('./pages/contact/Contact'));
const Areas = lazy(() => import('./pages/areas/Areas'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const SetupTwoFactor = lazy(() => import('./pages/admin/SetupTwoFactor'));

function App() {
 return (
    <div className="app">
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </div>
  );
}

export default App;