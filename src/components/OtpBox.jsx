import React, { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/slice/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import { useOtpVerifyMutation } from '../redux/slice/apiSlice';

const OtpBox = ({ userInfo }) => {
  console.log('otp box component run');
  
  const [otp, setOtp] = useState('');
  // const { isAuth } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [verifyOtp, { data, isError, error, isLoading, isSuccess }] = useOtpVerifyMutation();

    console.log('otpBox',data, isError, error, isLoading, isSuccess);


    // console.log('otpbox',isAuth);
        

  // useEffect(() => {
  //   console.log('otp box useeffect navigate run');
    
  //   if (isAuth?.loggedIn) {
  //     navigate('/');
  //   }
  // }, [isAuth?.loggedIn, navigate]);

  const handleChange = (e) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) {
      toast.error('Please enter only numbers');
      return;
    }
    setOtp(value);
  };

  const handleSubmit = async () => {
    if (otp.length < 6) {
      toast.error('Invalid OTP');
      return;
    }
    await verifyOtp({ otp, userId: userInfo?.userId });
  };

  useEffect(() => {
    if (isError && error?.data?.message) {
      toast.error(error.data.message);
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(login({
        id: data?.userDetails?.id,
        name: data?.userDetails?.name,
        email: data?.userDetails?.email,
        role: data?.userDetails?.role,
        authToken: data?.token,
        loggedIn: true,
        loginTime: new Date().toLocaleDateString(),
      }));
      navigate('/');
    }
  }, [isSuccess, dispatch, data, navigate]);

  return (
    <>
      <div className='mb-4'>
        <h2 className="text-xl font-bold text-center text-gray-800">OTP Verification</h2>
        <h1 className='text-center text-gray-700'>Enter the 6-digit verification code sent to your email</h1>
      </div>
      <motion.input
        type="text"
        maxLength={6}
        value={otp}
        onChange={handleChange}
        className="w-full mb-4 rounded-md p-3 text-center text-2xl font-semibold border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder='OTP'
      />
      <motion.button
        onClick={handleSubmit}
        className={`w-full py-3 text-white ${otp.length < 6 || isLoading ? 'bg-slate-600' : 'bg-blue-600 hover:bg-blue-700 hover:scale-105 cursor-pointer transition duration-200'} rounded-lg `}
        disabled={otp.length < 6 || isLoading}
      >
        Submit OTP
      </motion.button>
    </>
  );
};

export default memo(OtpBox);
