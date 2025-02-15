//Dashboard with all the the user playlists
//todo->  playlist(everything is a playlist)
const express = require("express");
const router = express.Router();
const playlistController = require("../controllers/playlist"); //->mediaController
const { ensureAuth } = require("../middleware/auth");

//Maybe adding more gets for type of playlist-> audio, video, music

router.get("/:playlistId", ensureAuth, playlistController.playlistView); //Playlist dashboard

router.post("/createPlaylist/:id", playlistController.createPlaylist); //Create new  playlist

router.put("/addPlaylist/:id", playlistController.addPlaylist);

router.post("/searchAPI", playlistController.searchAPI);

router.put("/addNewMedia", playlistController.addNewMedia);



router.put("/likePlaylist/:id", playlistController.likePlaylist);
//put request to like or upvote

router.put("/unlikePlaylist/:id", playlistController.unlikePlaylist);
//unlike

router.delete("/deletePlaylist/:id", playlistController.deletePlaylist); //Create delete  playlist that belongs to you

module.exports = router;

//search function will be inside playlist [+add new playlists]
