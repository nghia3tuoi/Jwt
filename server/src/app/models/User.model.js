const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoose_delete = require("mongoose-delete");
const UsersSchema = new Schema(
	{
		email: { type: String, require: true, unique: true, lowercase: true },
		password: { type: String, unique: false },
		role: { type: String },
		authGoogleID: { type: String, default: null },
		authFacebookID: { type: String, default: null },
		authType: {
			type: String,
			enum: ["local", "google", "facebook"],
			default: "local",
		},
		createAt: { type: Date, require: true, default: Date.now() },
		updateAt: { type: Date, require: true, default: Date.now() },
	},
	{
		collection: "Users",
	}
);
UsersSchema.plugin(mongoose_delete, { overrideMethods: "all" });

const UsersModel = mongoose.model("user", UsersSchema);
module.exports = UsersModel;
