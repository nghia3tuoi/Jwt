const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const mongoDB = require("./config/connectDB/connections_mongodb");
const routes = require("./routes");
// parse application/x-www-form-urlencoded
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
