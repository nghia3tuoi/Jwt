const authController = require("../../app/controllers/authController");

const router = require("express").Router();
router.post("/api/auth/sign-in", authController.signIn);
router.post("/api/auth/sign-up", authController.signUp);

module.exports = router;
