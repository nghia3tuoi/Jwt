const passport = require("passport");
const authController = require("../../app/controllers/authController");
const { verifyAccessToken } = require("../../services/jwt_services");
const router = require("express").Router();

//oauth google
router.get("/auth/google/login/failed", (req, res) => {
	return res.status(401).json({ messageL: "oauth google failed!" });
});
router.get("/auth/google/login/success", authController.googleLogin);

router.get(
	"/auth/google/callback",
	passport.authenticate("google", {
		failureRedirect: "/auth/google/login/failed",
		successRedirect: "http://localhost:3000/users",
	})
);
router.get(
	"/auth/google",
	passport.authenticate("google", { scope: ["email", "profile"] })
);
//
router.delete("/api/auth/sign-out", verifyAccessToken, authController.signOut);
router.post("/api/auth/refresh", authController.requestRefreshToken);
router.post("/api/auth/sign-in", authController.signIn);
router.post("/api/auth/sign-up", authController.signUp);
module.exports = router;
