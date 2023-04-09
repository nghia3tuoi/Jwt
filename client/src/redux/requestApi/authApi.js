import axios from "axios";
import {
	loginFailed,
	loginStart,
	loginSuccess,
	logoutFailed,
	logoutStart,
	logoutSuccess,
} from "../createSlice/authSlice";
//logout
export const handleLogoutApi = async (
	accessToken,
	dispatch,
	navigate,
	axiosJWT
) => {
	dispatch(logoutStart());
	try {
		await axiosJWT.delete("/api/auth/sign-out", {
			headers: {
				token: `Bearer ${accessToken}`,
			},
		});
		dispatch(logoutSuccess());
		navigate("/");
	} catch (error) {
		dispatch(logoutFailed(error.response.data));
	}
};
//login
export const handleLoginApi = async (userData, dispatch, navigate) => {
	dispatch(loginStart());
	try {
		const res = await axios.post("/api/auth/sign-in", userData);
		dispatch(loginSuccess(res.data));
		navigate("/users");
	} catch (error) {
		dispatch(loginFailed(error.response.data));
	}
};
///login google
export const handleLoginGoogleApi = async (dispatch, navigate) => {
	dispatch(loginStart());
	try {
		window.open("http://localhost:6969/auth/google", "_self");
		const res = await axios.get("/auth/google/login/success");
		dispatch(loginSuccess(res.data));
	} catch (error) {
		dispatch(loginFailed(error.response.data));
	}
};
