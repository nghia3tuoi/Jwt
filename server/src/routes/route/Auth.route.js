const authController = require("../../app/controllers/authController");
const { verifyAccessToken } = require("../../services/jwt_services");

const router = require("express").Router();
router.delete("/api/auth/sign-out", verifyAccessToken, authController.signOut);
router.post("/api/auth/refresh", authController.requestRefreshToken);
router.post("/api/auth/sign-in", authController.signIn);
router.post("/api/auth/sign-up", authController.signUp);
module.exports = router;
