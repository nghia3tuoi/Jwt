const userController = require("../../app/controllers/userController");
const {
	verifyAccessToken,
	verifyTokenAndUserAuthorization,
} = require("../../services/jwt_services");
const router = require("express").Router();

router.delete(
	"/api/users/delete-users",
	verifyTokenAndUserAuthorization,
	userController.deleteUser
);
router.get("/api/users/get-users", verifyAccessToken, userController.getUser);

module.exports = router;
