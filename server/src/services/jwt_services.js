const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const client = require("../config/connectRedis/connections_redis");
require("dotenv").config();
//generate token
const generateAccessToken = async (userId, role) => {
	return new Promise((resolve, reject) => {
		const payload = {
			id: userId,
			role: role,
		};
		const secret = process.env.ACCESS_KEY;
		const options = {
			expiresIn: "30s",
		};
		JWT.sign(payload, secret, options, (err, token) => {
			if (err) {
				reject(err);
			}
			resolve(token);
		});
	});
};
//generate refresh token
const generateRefreshToken = async (userId, role) => {
	return new Promise((resolve, reject) => {
		const payload = {
			id: userId,
			role: role,
		};
		const secret = process.env.REFRESH_KEY;
		const options = {
			expiresIn: "360d",
		};
		JWT.sign(payload, secret, options, (err, token) => {
			if (err) {
				reject(err);
			}
			// lưu refresh token to db redis
			client.set(userId.toString(), token, {
				EX: 360 * 24 * 60 * 60,
			});
			// lưu refresh token vào cookie
			resolve(token);
		});
	});
};

//verify accesstoken
const verifyAccessToken = (req, res, next) => {
	// lấy chuỗi accesstoken được phía client gửi lên qua header beaer 123456...
	const token = req.headers["token"];
	//check token exist
	if (token) {
		// vì chuỗi có định dạng là beaer 12345 ta dùng split chuyển đổi chuỗi thành mảng và lấy phần tử số [1]
		const accessToken = token.split(" ")[1];
		//vertify token
		JWT.verify(accessToken, process.env.ACCESS_KEY, (err, payload) => {
			if (err) {
				return res.status(404).json({
					errCode: 1,
					message: "Token is not valid!",
				});
			}
			req.payload = payload;
			next();
		});
	} else {
		return res.status(401).json({
			errCode: -1,
			message: "You're not autenticated!",
		});
	}
};
//verify refresh token
const verifyRefreshToken = (refreshToken) => {
	return new Promise((resolve, reject) => {
		if (refreshToken) {
			//verify refresh token
			JWT.verify(refreshToken, process.env.REFRESH_KEY, (err, payload) => {
				if (err) {
					return reject(err);
				}
				client
					.get(payload.id)
					.then((token) => {
						if (token === refreshToken) {
							return resolve(payload);
						} else {
							return resolve(null);
						}
					})
					.catch((err) => reject(err));
			});
		}
	});
};
const verifyTokenAndUserAuthorization = (req, res, next) => {
	return verifyAccessToken(req, res, () => {
		if (req.payload.id === req.query.id || req.payload.role === "0") {
			next();
		} else {
			return res.status(403).json({
				errCode: -1,
				message: "You're not allowed to do that!",
			});
		}
	});
};
const verifyTokenAndAdmin = (req, res, next) => {
	return verifyAccessToken(req, res, () => {
		if (req.payload.role === "0") {
			next();
		} else {
			return res.status(403).json({
				errCode: -1,
				message: "You're not allowed to do that!",
			});
		}
	});
};
module.exports = {
	generateAccessToken,
	generateRefreshToken,
	verifyAccessToken,
	verifyRefreshToken,
	verifyTokenAndUserAuthorization,
	verifyTokenAndAdmin,
};
