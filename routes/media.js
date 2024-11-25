//When you click on a piece of media what is going to happen?
//Appears full screen play fullscreen if it is YT
//Podcast picture of podcast and description, maybe transcirpt
//Music the artist, ablum, lyrics
const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const homeController = require('../controllers/home')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', homeController.getIndex)// "in playlist function" get request for playilist
router.get('/login', authController.getLogin)//Maybe a post for the search and to add a type of media 
router.post('/login', authController.postLogin) //Put request to add to play list or maybe a post?
router.get('/logout', authController.logout)//Put request to unadd?
router.get('/signup', authController.getSignup)//post request to submit all selected songs
router.post('/signup', authController.postSignup)//delete request 

module.exports = router

