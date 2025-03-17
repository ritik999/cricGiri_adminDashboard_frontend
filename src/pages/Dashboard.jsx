import { Spinner } from 'flowbite-react';
import React, { lazy, Suspense } from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router'

const Sidebar = lazy(() => import('../components/Sidebar'));
const Navbar = lazy(() => import('../components/Navbar'));

const Dashboard = () => {

    const { isAuth } = useSelector(state => state.user);
    // console.log(isAuth);

    return (isAuth?.loggedIn) ? (
        <>
            <div className='flex bg-[#fafafb] overflow-y-hidden'>
                <div>
                    <Sidebar />
                </div>
                <div className="h-screen overflow-x-scroll flex-1">
                    <Navbar />
                    <div className='h-[90%] overflow-y-auto no-scrollbar'>
                        <div className='py-3 px-5'>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    ) : <Navigate to='/login' />

}

export default Dashboard