import {configureStore,combineReducers} from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import tweetSlice from "./tweetSlice";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }

const rootReducer = combineReducers({
    user:userSlice,
    tweet:tweetSlice,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

//configureStore is part of Redux Toolkit, simplifying the setup of a Redux store
//Features: Automatically combines reducers, sets up middleware
const store = configureStore({
    reducer:persistedReducer, //This helps maintain the state across page reloads.
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export default store;
