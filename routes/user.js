const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const userController = require("../controllers/users.js");
const { route } = require("./listing.js");
const { saveRedirectUrl } = require("../middleware.js");

router
  .route("/signup")
  .get(userController.renderSignUpform)
  .post(wrapAsync(userController.signUp));
// ----------------------Login---------------------------------
router
  .route("/login")
  .get(userController.renderLoginform)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );
// ---------------LOGOUT----------------------
router.get("/logout", userController.logout);
module.exports = router;
