import React, { use } from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { Outlet } from 'react-router';

const DashboardProtectedRoute = () => {
  // const isAuth = JSON.parse(localStorage.getItem('isAuth') || '{}');
  const {isAuth}=useSelector(state=>state.user);
  // console.log(isAuth);
  console.log('protected Route',isAuth);
  
  console.log('dashboard protected route called')
  

  return (isAuth?.loggedIn) ? <Outlet /> : <Navigate to='/login' />
}

export default DashboardProtectedRoute