const authRouter = require("./route/Auth.route");
const routes = (app) => {
	app.use("/", authRouter);
};

module.exports = routes;
