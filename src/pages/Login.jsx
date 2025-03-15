import React, { useState, useEffect, useMemo } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/slice/userSlice';
import OtpBox from '../components/OtpBox';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useUserLoginMutation } from '../redux/slice/apiSlice';

const Login = () => {
  const [showOtpBox, setShowOtpBox] = useState(false);
  const { isAuth } = useSelector(state => state.user);
  const navigate = useNavigate();

  console.log(isAuth);

  // const isLoggedIn=useMemo(()=>isAuth?.loggedIn,[isAuth?.loggedIn]);
  // console.log(isLoggedIn);
  
  
  const [loginData, { data, isError, error, isLoading, isSuccess }] = useUserLoginMutation();

  console.log(data, isError, error, isLoading, isSuccess);

  console.log('login page');
  
  console.log('before route');
  
  useEffect(() => {
    console.log('login useeffect navigate run');
    
    if (isAuth?.loggedIn) {
      navigate('/');
    }
  }, [isAuth?.loggedIn, navigate]);

  console.log('after route');

  useEffect(() => {
    console.log('error check useEffect');
    
    if (isError && error?.data?.message) {
      toast.error(error.data.message);
    }
  }, [isError, error]);

  const validationSchema = useMemo(() => Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  }), []);

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit: async (values) => {
      await loginData({ email: values.email, password: values.password });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setShowOtpBox(true);
    }
  }, [isSuccess]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('./src/assets/login-bg.jpg')] bg-cover bg-center">
      <motion.div
        className="bg-white bg-opacity-55 backdrop-blur-none p-8 rounded-lg shadow-lg w-full max-w-md"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {showOtpBox ? (
          <OtpBox userInfo={data?.userInfo} />
        ) : (
          <>
            <div className='flex flex-col items-center my-7'>
              <motion.h1
                className='font-bold text-3xl'
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                Log-in to <span className='text-blue-800'>Crick</span>Giri
              </motion.h1>
              <motion.p
                className='font-bold text-white'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Makes scoring hectic free
              </motion.p>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <motion.div
                className="mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <label className="block text-sm font-medium text-black">Email</label>
                <input
                  type="text"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your email"
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-sm">{formik.errors.email}</div>
                )}
              </motion.div>

              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <label className="block text-sm font-medium text-black">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your password"
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-500 text-sm">{formik.errors.password}</div>
                )}
              </motion.div>

              <motion.button
                type="submit"
                className={`w-full ${isLoading ? 'bg-gray-600' : 'bg-blue-800 hover:bg-blue-700'} text-white py-3 rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-700`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Log In'}
              </motion.button>

              <div className="mt-4 text-center">
                <motion.p
                  className="text-sm font-bold text-gray-900 hover:text-blue-700 cursor-pointer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  Forgot Password?
                </motion.p>
              </div>
            </form>
          </>
        )}
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default Login;
