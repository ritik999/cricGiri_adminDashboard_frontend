import React, { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { Navigate, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/slice/userSlice';
import {  toast } from 'react-toastify';
import { useOtpVerifyMutation } from '../redux/slice/apiSlice';

const OtpBox = ({ userInfo }) => {
  
  const [otp, setOtp] = useState('');
  // const { isAuth } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error,setError]=useState(false);
  const [success,setSuccess]=useState(false);
  
  // const [verifyOtp, { data, isError, error, isLoading, isSuccess }] = useOtpVerifyMutation();


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
    // await verifyOtp({ otp, userId: userInfo?.userId });
    if(otp!=import.meta.env.VITE_OTP){
      setError(true);
      return;
    }else{
      setSuccess(true);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error('invalid otp');
    }
  }, [error]);

  useEffect(() => {
    
    if (success) {
      dispatch(login({
        // id: data?.userDetails?.id,
        // name: data?.userDetails?.name,
        // email: data?.userDetails?.email,
        // role: data?.userDetails?.role,
        // authToken: data?.token,
        id:1,
        name:'user',
        email:import.meta.env.VITE_EMAIL,
        role:'admin',
        loggedIn: true,
        loginTime: new Date().toLocaleDateString(),
      }));
      navigate('/master/Player-Role');
      // console.log('run after navigate');
      
    }
  }, [success]);

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
        className={`w-full py-3 text-white ${otp.length < 6 && 'bg-slate-600' } bg-blue-600 hover:bg-blue-700 hover:scale-105 cursor-pointer transition duration-200 rounded-lg `}
        disabled={otp.length < 6}
      >
        Submit OTP
      </motion.button>
    </>
  );
};

export default memo(OtpBox);
