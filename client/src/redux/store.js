import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import authSlice from "./createSlice/authSlice";
import usersSlice from "./createSlice/usersSlice";

const persistConfig = {
	key: "root",
	storage,
};
const rootReducer = combineReducers({
	auth: authSlice,
	users: usersSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== "production",
	middleware: [thunk],
});

export const persistor = persistStore(store);
