const bcrypt = require("bcrypt");
const checkEmail = require("../../services/checkEmail");
const Users = require("../models/User.model");
const { userValidate } = require("../../services/checkValidation");
const {
	generateAccessToken,
	generateRefreshToken,
} = require("../../services/jwt_services");
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
					return res.json({
						errCode: 0,
						user: user,
						accessToken: accessToken,
						refreshToken: refreshToken,
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
}

module.exports = new authController();
