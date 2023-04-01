const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const client = require("../config/connectRedis/connections_redis");
require("dotenv").config();
const generateAccessToken = async (userId) => {
	return new Promise((resolve, reject) => {
		const payload = {
			id: userId,
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
const generateRefreshToken = async (userId) => {
	return new Promise((resolve, reject) => {
		const payload = {
			id: userId,
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
			code: -1,
			message: "You're not autenticated!",
		});
	}
};
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
module.exports = {
	generateAccessToken,
	generateRefreshToken,
	verifyAccessToken,
	verifyRefreshToken,
};
