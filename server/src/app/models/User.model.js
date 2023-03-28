const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UsersSchema = new Schema(
	{
		email: { type: String, require: true, unique: true, lowercase: true },
		password: { type: String, require: true },
		createAt: { type: Date, require: true, default: Date.now() },
		updateAt: { type: Date, require: true, default: Date.now() },
	},
	{
		collection: "Users",
	}
);

const UsersModel = mongoose.model("user", UsersSchema);
module.exports = UsersModel;
