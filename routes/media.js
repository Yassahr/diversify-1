const express = require('express')
const router = express.Router()
const mediaController = require('../controllers/media') //->mediaController
const { ensureAuth } = require('../middleware/auth')

//Maybe adding more gets for type of playlist-> audio, video, music

router.get('/:id', ensureAuth, mediaController.mediaView) //Playlist dashboard


//add media
router.put('/addMedia/:id', mediaController.addMedia)

router.put('/likeMedia/:id', mediaController.likeMedia)
//put request to like or upvote

router.put('/unlikeMedia/:id', mediaController.unlikeMedia)
//unlike

router.delete('/deleteMedia/:id', mediaController.deleteMedia) //Create delete  playlist that belongs to you

module.exports = router