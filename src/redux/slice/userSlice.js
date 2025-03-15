import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuth:{}
};

export const userSlice = createSlice({
    name: 'user',
    initialState,    
    reducers: {
        login: (state, action) => {            
            state.isAuth = action.payload;
        },
        logout: (state) => {
            state.isAuth = {};
        }
    }
});

export const {login,logout}= userSlice.actions;

export default userSlice.reducer;