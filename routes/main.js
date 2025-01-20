const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const dashController = require("../controllers/dash");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const passport = require("passport");

router.get("/", dashController.getIndex);
//spotify auth
// router.get('/', passport.authenticate('spotify'));
router.get("/auth/google", authController.googleAuth);
router.get("/google/auth/callback", authController.googleCallback);

router.get("/login", authController.getLogin);
router.get("/logout", ensureGuest, authController.logout);
router.get("/signup", authController.getSignup);

module.exports = router;
//this page would remain mostly the same
//this is the sign in routes
