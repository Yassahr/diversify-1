const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const homeController = require('../controllers/home')
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const passport = require('passport')

router.get('/', homeController.getIndex)
//spotify auth
// router.get('/', passport.authenticate('spotify'));
router.get('/auth/google', authController.googleAuth)
router.get('/google/auth/callback', authController.googleCallback)

// router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }))
// router.get('/auth/google/callback',
//     passport.authenticate('google', { failureRedirect: '/login' }),
//      function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   })
router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)
router.get('/logout', authController.logout)
router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)

module.exports = router
//this page would remain mostly the same
//this is the sign in routes
