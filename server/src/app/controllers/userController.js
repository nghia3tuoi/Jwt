const Users = require("../models/User.model");
class userController {
	getUser = async (req, res, next) => {
		let count = await Users.count({});
		try {
			// số page
			let { page, limit } = req.query;
			if (page) {
				if (page < 1) {
					page = 1;
				}
				// litmit bài viết
				const PAGE_SIZE = limit;
				let soluongboqua = (page - 1) * PAGE_SIZE;
				const user = await Users.find({}).skip(soluongboqua).limit(PAGE_SIZE);
				return res.status(200).json({
					code: 0,
					count: count,
					users: user,
				});
			} else {
				const user = await Users.find({});
				return res.status(200).json({
					code: 0,
					count: count,
					users: user,
				});
			}
		} catch (error) {
			return res.status(500).json({
				errCode: -1,
				message: "Get users failed!",
			});
		}
	};
	deleteUser = async (req, res, next) => {
		try {
			const id = req.query.id;
			if (!id) {
				return res.status(404).json({
					errCode: 1,
					message: "User not found!",
				});
			}
			await Users.delete({ _id: id });
			return res.status(200).json({
				errCode: 0,
				message: "Deleted user successfully!",
			});
		} catch (error) {
			return res.status(500).json({
				errCode: 0,
				message: "Delete user failed!",
			});
		}
	};
}
module.exports = new userController();
