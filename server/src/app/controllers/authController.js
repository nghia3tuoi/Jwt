const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const checkEmail = require("../../services/checkEmail");
const Users = require("../models/User.model");
const { userValidate } = require("../../services/checkValidation");
const {
	generateAccessToken,
	generateRefreshToken,
	verifyRefreshToken,
} = require("../../services/jwt_services");
const client = require("../../config/connectRedis/connections_redis");
class authController {
	//Register
	signUp = async (req, res, next) => {
		try {
			const { email, password } = req.body;
			//check input valid
			const { error } = userValidate(req.body);
			if (error) {
				return res.status(200).json({
					code: 1,
					message: error.details[0].message,
				});
			}
			//check email exists
			const isValidEmail = await checkEmail(email);
			if (!isValidEmail) {
				//hash password
				const salt = bcrypt.genSaltSync(10);
				const hashPasword = bcrypt.hashSync(password, salt);
				//create user
				const user = await Users.create({
					email: email,
					password: hashPasword,
				});
				//save create user
				user.save();
				//
				return res.status(200).json({
					code: 0,
					message: "Sign up successfully!",
				});
			} else {
				return res.status(200).json({
					code: 2,
					message: "Email already exists!",
				});
			}
		} catch (error) {
			return res.status(500).json({
				code: -1,
				message: "Sign up failed!",
			});
		}
	};
	//Login
	signIn = async (req, res, next) => {
		try {
			const { email, password } = req.body;
			//check input
			const { error } = userValidate(req.body);
			if (error) {
				return res.status(200).json({
					errCode: 1,
					message: error.details[0].message,
				});
			}
			//check email is exist
			const isValidEmail = checkEmail(email);
			if (isValidEmail) {
				//check email is not correct
				const user = await Users.findOne({
					email: email,
				});
				if (!user) {
					return res.status(200).json({
						errCode: 2,
						message: "Email is incorrect!",
					});
				}
				//check password is not correct
				const isValidPassword = bcrypt.compareSync(password, user.password);
				if (!isValidPassword) {
					return res.status(200).json({
						errCode: 3,
						message: "Password is incorrect!",
					});
				}
				// email and password is correct
				if (user && isValidPassword) {
					const userId = user._id;
					const accessToken = await generateAccessToken(userId);
					const refreshToken = await generateRefreshToken(userId);
					res.cookie("refreshToken", refreshToken, {
						httpOnly: true,
						secure: false,
						path: "/",
						sameSite: "strict",
					});
					// loại bỏ pass word response
					const { password, ...other } = user._doc;
					return res.json({
						errCode: 0,
						user: other,
						accessToken: accessToken,
					});
				}
			} else {
				return res.status(200).json({
					errCode: 4,
					message: "Email is not alredy exists!",
				});
			}
		} catch (error) {
			return res.status(500).json({
				errCode: -1,
				message: "Sign in failed",
			});
		}
	};
	//request refresh token
	requestRefreshToken = async (req, res, next) => {
		try {
			const refreshToken = req.cookies.refreshToken;
			if (!refreshToken) {
				return res.status(401).json({
					errCode: 1,
					message: "You're not auhtenticated!",
				});
			}
			const userPayload = await verifyRefreshToken(refreshToken);
			if (userPayload) {
				const newAccessToken = await generateAccessToken(userPayload.id);
				const newRefreshToken = await generateRefreshToken(userPayload.id);
				res.cookie("refreshToken", newRefreshToken, {
					httpOnly: true,
					secure: false,
					path: "/",
					sameSite: "strict",
				});
				return res.status(200).json({
					code: 0,
					newAccessToken,
					newRefreshToken,
				});
			} else {
				return res.status(400).json({
					errCode: 2,
					message: "Token not is valid!",
				});
			}
		} catch (error) {
			return res.status(500).json({
				errCode: -1,
				message: "Refresh failed!",
			});
		}
	};
	//signOut
	signOut = async (req, res, next) => {
		try {
			//check token
			const refreshToken = req.cookies.refreshToken;
			if (!refreshToken) {
				return res.status(401).json({
					errCode: 1,
					message: "You're not autenticated!",
				});
			}
			//lay id user tu payload token
			const userPayload = await verifyRefreshToken(refreshToken);
			//redis delete key
			client.del(userPayload.id);
			//clear cookie
			res.clearCookie("refreshToken");
			return res.status(200).json({
				errCode: 0,
				message: "Logout success!",
			});
		} catch (error) {
			return res.status(500).json({
				errCode: -1,
				message: "sign out failed!",
			});
		}
	};
}

module.exports = new authController();
