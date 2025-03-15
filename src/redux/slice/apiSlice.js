import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
    endpoints: (build) => ({
        getUsers: build.query({
            query: () => `users`,
        }),
        userLogin: build.mutation({
            query: (loginData) => ({
                url: `auth/login`,
                method: 'POST',
                body: loginData,
            }),
        }),
        otpVerify: build.mutation({
            query: (inputData) => ({
                url: `auth/verifyOtp/${inputData.userId}`,
                method: 'POST',
                body: { otp: inputData.otp }
            }),
        }),
        userLogout: build.query({
            query: (token) => ({
                url: `auth/logout`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }),
        allCountries: build.mutation({
            query: () => ({
                url: 'master/country',
                method: 'POST',
            })
        }),
    }),
})

export default userApi;
export const { useGetUsersQuery, useUserLoginMutation, useOtpVerifyMutation, useAllCountriesMutation, useLazyUserLogoutQuery } = userApi;