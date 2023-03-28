const JWT = require("jsonwebtoken");

const generateAccessToken = async (userId) => {
	return new Promise((resolve, reject) => {
		const payload = {
			id: userId,
		};
		const secret = "accessKey";
		const options = {
			expiresIn: "60s",
		};
		JWT.sign(payload, secret, options, (err, token) => {
			if (err) {
				reject(err);
			}
			resolve(token);
		});
	});
};
module.exports = { generateAccessToken };
