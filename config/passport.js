const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose')
const User = require('../models/User')


module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email: email.toLowerCase() })

          if (!user) {
            return done(null, false, { msg: `Email ${email} not found.` })
          }

          if (!user.password) {
            return done(null, false, {
              msg: 'Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.'
            })
          }
          user.comparePassword(password, (err, isMatch) => {
            if (err) {
              return done(err)
            }
            if (isMatch) {
              return done(null, user)
            }
            return done(null, false, { msg: 'Invalid email or password.' })
          })
        } catch (error) {
          return done(err)
        }
      }
    )
  )
//Google Auth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: "http://localhost:2121/google/auth/callback"
},
function(accessToken, refreshToken, profile, cb) {
  User.findOrCreate({ googleId: profile.id }, function (err, user) {
    return cb(err, user);
  });
}
));


  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    try {
      return done(null, await User.findById(id))
    } catch (error) {
      return done(error)
    }
  })

}
