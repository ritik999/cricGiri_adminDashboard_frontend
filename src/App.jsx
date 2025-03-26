import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DataTable from './components/Table';
import DashboardProtectedRoute from './components/DashboardProtectedRoute';
import NotFoundPage from './components/ErrorPage';
import UserProfile from './pages/Profile';
import Tournament from './pages/Tournament';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/login' element={<Login />} />
      {/* <Route path='/' element={<DashboardProtectedRoute />}> */}
      <Route path='/' element={<Dashboard />}>
        <Route path='/master/:select' element={<DataTable />} />
        <Route path='/tournament/tournaments' element={<Tournament />} />
        <Route path='/profile' element={<UserProfile />} />
      </Route>
      {/* </Route> */}
      <Route path="*" element={<NotFoundPage />} />
    </>
  )
)


const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App