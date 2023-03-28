const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async (uri) => {
	try {
		await mongoose.connect(uri);
		console.log("Connect to db successfully!");
	} catch (error) {
		console.log("Connect Db Failed!");
	}
};
// có thể kết nối nhiều db
const authConnection = connectDB(process.env.MONGODB_URL);
module.exports = { authConnection };
