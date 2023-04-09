import { createSlice } from "@reduxjs/toolkit";

const UsersSlice = createSlice({
	name: "users",
	initialState: {
		getUsers: {
			isFetching: false,
			isError: false,
			data: [],
			errMessage: null,
		},
		deleteUsers: {
			isFetching: false,
			isError: false,
			data: [],
			errMessage: null,
		},
	},
	reducers: {
		//get list
		getUsersStart: (state) => {
			state.getUsers.isFetching = true;
		},
		getUsersSuccess: (state, action) => {
			state.getUsers.isFetching = false;
			state.getUsers.isError = false;
			state.getUsers.data = action.payload;
		},
		getUsersFailed: (state, action) => {
			state.getUsers.isError = true;
			state.getUsers.data = null;
			state.getUsers.errMessage = action.payload;
		},
		//delete users
		deleteUsersStart: (state) => {
			state.deleteUsers.isFetching = true;
		},
		deleteUsersSuccess: (state, action) => {
			state.deleteUsers.isFetching = false;
			state.deleteUsers.isError = false;
			state.deleteUsers.data = action.payload;
		},
		deleteUsersFailed: (state, action) => {
			state.deleteUsers.isError = true;
			state.deleteUsers.data = null;
			state.deleteUsers.errMessage = action.payload;
		},
	},
});

export const {
	getUsersStart,
	getUsersSuccess,
	getUsersFailed,
	deleteUsersStart,
	deleteUsersSuccess,
	deleteUsersFailed,
} = UsersSlice.actions;
export default UsersSlice.reducer;
