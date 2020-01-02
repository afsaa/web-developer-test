const express = require("express"),
  cors = require("cors"),
  md5 = require("md5");
const authRouter = express.Router();
const { db } = require("../dbconfig/dbconfig");
const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

authRouter.use(cors());

// Passport strategy config
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      });
    }
  )
);

// Passport session persistance config
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function(err, user) {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

// Initialize Passport and restore authentication state, if any, from the
// session.
//authRouter.use(passport.initialize());
//authRouter.use(passport.session());

authRouter.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/" }),
  function(req, res) {
    res.redirect("/home");
  }
);

module.exports = authRouter;
