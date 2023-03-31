const userController = require("../../app/controllers/userController");
const { verifyAccessToken } = require("../../services/jwt_services");
const router = require("express").Router();

router.get("/api/users/get-users", verifyAccessToken, userController.getUser);

module.exports = router;
