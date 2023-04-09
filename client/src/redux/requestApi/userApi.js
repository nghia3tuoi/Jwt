import {
	deleteUsersFailed,
	deleteUsersStart,
	deleteUsersSuccess,
	getUsersFailed,
	getUsersStart,
	getUsersSuccess,
} from "../createSlice/usersSlice";
//delete users
export const handleDeleteUsersApi = async (
	id,
	accessToken,
	dispatch,
	navigate,
	axiosJWT
) => {
	dispatch(deleteUsersStart());
	try {
		const res = await axiosJWT.delete("/api/users/delete-users", {
			params: {
				id: id,
			},
			headers: {
				token: `bearer ${accessToken}`,
			},
		});
		dispatch(deleteUsersSuccess(res.data));
		navigate("/users");
	} catch (error) {
		dispatch(deleteUsersFailed(error.response.data));
	}
};
//get users
export const handleGetUsersApi = async (
	paramsString,
	accessToken,
	dispatch,
	axiosJWT
) => {
	dispatch(getUsersStart());
	try {
		const res = await axiosJWT.get("/api/users/get-users", {
			params: {
				limit: paramsString._limit,
				page: paramsString._page,
			},
			headers: {
				token: `Bearer ${accessToken}`,
			},
		});
		dispatch(getUsersSuccess(res.data));
	} catch (error) {
		dispatch(getUsersFailed());
	}
};
