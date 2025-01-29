// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

const ProtectedRoute = ({ children, requireTwoFactor = false }: { children: ReactNode, requireTwoFactor?: boolean }) => {
    const isAuthenticated = localStorage.getItem('adminToken');
    const twoFactorSetup = localStorage.getItem('twoFactorSetup');

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" />;
    }

    if (requireTwoFactor && !twoFactorSetup) {
        return <Navigate to="/admin/setup-2fa" />;
    }

    return children;
};

export default ProtectedRoute;