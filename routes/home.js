const express = require('express')
const router = express.Router()
const dashController = require('../controllers/dash')
const { ensureAuth } = require('../middleware/auth')

//feed

//what are the main things user will be doing on dash
router.get('/', dashController.dashboard )

//get request to load all of the users other data
router.get('/loadFeed', dashController.loadFeed )

//post request adding playlist/media to there playlist( add to public or private)
router.post('/addPlaylist', ensureAuth, dashController.addPlaylist )

//Put request to like playlist 
router.put('/likePlaylist', ensureAuth, dashController.likePlaylist )


//put request to unlike playlist
router.put('/unlikePlaylist', ensureAuth, dashController.unlikePlaylist )



//dash
//get for all of the users playlists
router.put('/userPlaylist', ensureAuth, dashController.userPlaylist )

//get to filter playlist view
router.put('/filterPlaylist', ensureAuth, dashController.filterPlaylist )

module.exports = router




