import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		login: {
			isFetching: false,
			isError: false,
			data: null,
		},
		logout: {
			isFetching: false,
			isError: false,
			isSuccess: false,
			messge: "",
		},
	},
	reducers: {
		loginStart: (state) => {
			state.login.isFetching = true;
		},
		loginSuccess: (state, action) => {
			state.login.isFetching = false;
			state.login.isError = false;
			state.login.data = action.payload;
		},
		loginFailed: (state, action) => {
			state.login.isFetching = false;
			state.login.isError = true;
			state.login.data = action.payload;
		},
		//logout
		logoutStart: (state) => {
			state.logout.isFetching = true;
		},
		logoutSuccess: (state) => {
			state.logout.isFetching = false;
			state.logout.isSuccess = true;
			state.logout.isError = false;
			state.login.data = null;
		},
		logoutFailed: (state, action) => {
			state.logout.isFetching = false;
			state.logout.isError = true;
			state.logout.messge = action.payload;
		},
	},
});

export const {
	loginStart,
	loginSuccess,
	loginFailed,
	logoutStart,
	logoutSuccess,
	logoutFailed,
} = authSlice.actions;
export default authSlice.reducer;
