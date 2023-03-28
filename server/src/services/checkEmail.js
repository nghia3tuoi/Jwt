const Users = require("../app/models/User.model");
const checkEmail = async (email) => {
	try {
		const user = await Users.findOne({
			email: email,
		});
		if (user) {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		return {
			code: -1,
			message: "Check email failed!",
		};
	}
};
module.exports = checkEmail;
