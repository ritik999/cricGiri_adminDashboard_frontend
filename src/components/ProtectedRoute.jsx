import React from 'react'
import { Navigate } from 'react-router';
import { Outlet } from 'react-router';

const ProtectedRoute = () => {
    const isAuth= JSON.parse(localStorage.getItem('isAuth') || '{}');
    
    return (isAuth?.loggedIn) ? <Navigate to='/dashboard' /> : <Outlet />
}

export default ProtectedRoute