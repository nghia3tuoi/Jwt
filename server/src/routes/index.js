const userRouter = require("./route/User.route");
const authRouter = require("./route/Auth.route");
const routes = (app) => {
	app.use("/", userRouter);
	app.use("/", authRouter);
};

module.exports = routes;
