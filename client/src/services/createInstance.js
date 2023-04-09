import axios from "axios";
import jwt_decode from "jwt-decode";
export const handleRefreshTokenApi = async () => {
	try {
		const res = await axios.post("/api/auth/refresh", {
			withCredentials: true,
		});
		return res.data;
	} catch (error) {
		return error;
	}
};
export const createAxios = (user, loginSuccess, dispatch) => {
	const newInstance = axios.create();
	newInstance.interceptors.request.use(
		async (config) => {
			let date = new Date();
			const decodedToken = jwt_decode(user?.accessToken);
			if (decodedToken.exp < date.getTime() / 1000) {
				const { newAccessToken } = await handleRefreshTokenApi();
				const newUser = {
					...user,
					accessToken: newAccessToken,
				};
				dispatch(loginSuccess(newUser));
				config.headers["token"] = `Bearer ${newAccessToken}`;
			}
			return config;
		},
		(err) => {
			return Promise.reject(err);
		}
	);
	return newInstance;
};
