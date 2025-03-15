import { Spinner } from 'flowbite-react';
import React, { lazy, Suspense } from 'react'
import { Outlet } from 'react-router'

const Sidebar = lazy(() => import('../components/Sidebar'));
const Navbar = lazy(() => import('../components/Navbar'));

const Dashboard = () => {
    return (
        <div className='flex bg-[#fafafb] overflow-y-hidden'>
            {/* <Suspense> */}
                <Sidebar />
            {/* </Suspense> */}
            <div className="h-screen flex-1">
                {/* <Suspense> */}
                    <Navbar />
                {/* </Suspense> */}
                <div className='h-[90%] overflow-y-auto no-scrollbar'>
                    <div className='py-3 px-5'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard