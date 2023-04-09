const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
var session = require("express-session");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();

const mongoDB = require("./config/connectDB/connections_mongodb");
const routes = require("./routes");
require("./config/connectRedis/connections_redis");
const passportSetup = require("./services/passport");
const passport = require("passport");
//pass port google
app.use(
	session({
		secret: "keyboard cat",
		resave: true,
		saveUninitialized: true,
		cookie: { secure: false },
	})
);
app.use(passport.initialize());
app.use(passport.session());
//cors
app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);
//cookie parser
app.use(cookieParser());
// body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//connectDB
mongoDB.authConnection;
//Routes
routes(app);
//PORT
const PORT = process.env.PORT || 7000;
//App listen
app.listen(PORT, () => {
	console.log("Listen on port " + PORT);
});
