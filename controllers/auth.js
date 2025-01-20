const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");

exports.googleAuth = (req, res, next) => {
  passport.authenticate("google", { scope: ["profile"] })(req, res, next);
  console.log("boom");
};

exports.googleCallback = (req, res, next) => {
  console.log("it got this far");
  passport.authenticate(
    "google",
    { failureRedirect: "/login" },
    (err, user, info) => {
      if (err || !user) {
        console.log(err, user);

        return res.redirect("/login");
      }
      req.logIn(user, (err) => {
        console.log("login in succesful 2");
        if (err) {
          return next(err);
        }
        // Successful authentication, redirect home.
        res.redirect("/home");
      });
    },
  )(req, res, next);
};

//may also get deleted since google auth is taking care of this
exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect("/home");
  }
  // return res.redirect('/auth/google')
  res.render("login", {
    title: "Login",
  });
};
//will likely be deleted
exports.postLogin = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Password cannot be blank." });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/login");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("errors", info);
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", { msg: "Success! You are logged in." });
      res.redirect(req.session.returnTo || "/home");
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  console.log("Session before logout:", req.session);
  req.logout(() => {
    console.log("User has logged out.");
    req.session.destroy((err) => {
      if (err)
        console.log(
          "Error : Failed to destroy the session during logout.",
          err,
        );
      req.user = null;
      res.redirect("/");
    });
  });
};

exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect("/home");
  }
  res.render("signup", {
    title: "Create Account",
  });
};
//May need to add a post signup onto the route for auth
//Check the user DB to see if the user email exists
//If user email exist redirect them to sign in
exports.postSignup = async (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" });
  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    console.log(req.flash);
    return res.redirect("../signup");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  try {
    const existingUser = await User.findOne({
      $or: [{ email: req.body.email }, { userName: req.body.userName }],
    });

    if (existingUser) {
      req.flash("errors", {
        msg: "Account with that email address or username already exists.",
      });
      return res.redirect("../signup");
    }

    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    });

    await user.save();

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", {
        msg: "Successfully signed up!",
      });

      res.redirect("/todos");
    });
  } catch (error) {
    return next(error);
  }
};
