import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const ProtectedRoute = () => {
    const { currentUser, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <div>Loading authentication state...</div>
    }

    if (!currentUser) {
        return <Navigate to='/login' state={{ from: location }} replace />;
    }

    return <Outlet />
};

export default ProtectedRoute;