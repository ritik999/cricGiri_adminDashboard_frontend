import { Avatar, Dropdown } from 'flowbite-react';
import React, { useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '../redux/slice/userSlice';
import { useLazyUserLogoutQuery } from '../redux/slice/apiSlice';
import { toast, ToastContainer } from 'react-toastify';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector(state => state.user.isAuth);
    // const [trigger, { isLoading, isSuccess, isError, error }] = useLazyUserLogoutQuery();

    useEffect(() => {
        if (!userData?.loggedIn) {
            navigate('/login');
        }
    }, [userData?.loggedIn, navigate]);


    // useEffect(() => {
    //     if (isSuccess) {
    //         localStorage.removeItem('isAuth');
    //         dispatch(logout());
    //         navigate('/login');
    //     }

    //     if (isError && error?.data?.message) {
    //         console.error('Logout failed');
    //         toast.error(error?.data?.message);
    //     }
    // }, [isSuccess, isError, dispatch, navigate]);

    return (
        <div className='h-12 bg-[#15283c] flex justify-between items-center p-8 gap-10'>
            <div className='flex-1 cursor-pointer'>
                <h1 className='text-white font-bold text-2xl tracking-wider'>
                    Cric<span className='text-orange-500'>Giri</span>
                </h1>
            </div>
            <div>
                <Dropdown className='z-50' arrowIcon={false} inline label={<Avatar rounded />}>
                    <Dropdown.Header>
                        <span className="block truncate text-xs font-sm">{userData.role}</span>
                        <span className="block truncate text-sm font-medium">{userData.email}</span>
                    </Dropdown.Header>
                    <Dropdown.Item>
                        <div className='flex items-center gap-2' onClick={() => navigate('/profile')}>
                            <img src='/assets/userProfile.png' className='w-5 h-5' />
                            <span className='ml-2'>Profile</span>
                        </div>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <div className='flex items-center gap-2'>
                            <img src='/assets/clock.png' className='w-5 h-5' />
                            <span className='ml-2'>{userData.loginTime}</span>
                        </div>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>
                        <div className='flex items-center gap-2' onClick={() => {
                            localStorage.removeItem('isAuth');
                            dispatch(logout());
                            navigate('/login');
                        }}>
                            <img src='/assets/logout.png' className='w-5 h-5' />
                            <span className='ml-2'>Logout</span>
                        </div>
                    </Dropdown.Item>
                </Dropdown>
            </div>
            <ToastContainer />
        </div>
    );
}

export default memo(Navbar);
