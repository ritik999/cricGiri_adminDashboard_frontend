import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from '../redux/slice/userSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userApi from './slice/apiSlice'

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'], // Ignore the PERSIST action for serializability checks
            },
        }).concat(userApi.middleware),
})

export const persistor = persistStore(store)