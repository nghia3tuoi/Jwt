const Users = require("../models/User.model");
class userController {
	getUser = async (req, res, next) => {
		try {
			const user = await Users.find({});
			return res.status(200).json({
				code: 0,
				user: user,
			});
		} catch (error) {
			return res.status(500).json({
				errCode: -1,
				message: "Get users failed!",
			});
		}
	};
}
module.exports = new userController();
