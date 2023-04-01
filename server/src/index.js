const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const mongoDB = require("./config/connectDB/connections_mongodb");
const routes = require("./routes");
require("./config/connectRedis/connections_redis");

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
