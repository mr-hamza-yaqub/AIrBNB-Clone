const User = require("../models/user.js");
// ---------------Render Sign Up Form-----------------------
module.exports.renderSignUpform = async (req, res) => {
  res.render("users/signup.ejs");
};
// --------------------------SignUp Route---------------------
module.exports.signUp = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ username, email });
    let registerUser = await User.register(newUser, password);
    //if user sign up then directly goto the listing(automatic login) page rather than the login page
    req.login(registerUser, (err) => {
      if (err) {
        return next(err);
      } else {
        req.flash("success", "User Registerd Successfully!");
        res.redirect("/listings");
      }
    });
  } catch (error) {
    //if username is already exist then show error msg of catch block
    req.flash("error", error.message);
    res.redirect("/signup");
  }
};
// -----------------------Render Login Form-----------------------
module.exports.renderLoginform = (req, res) => {
  res.render("users/login.ejs");
};
// ------------------------------Login--------------------------
module.exports.login = async (req, res) => {
  req.flash("success", "You Loged in! Welcome to WanderLust");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};
// ---------------LOGOUT----------------------
module.exports.logout = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    } else {
      req.flash("success", "You LoggedOut");
      res.redirect("listings");
    }
  });
};
