// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requireTwoFactor = false }) => {
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