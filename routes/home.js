const express = require("express");
const router = express.Router();
const dashController = require("../controllers/dash");
const { ensureAuth } = require("../middleware/auth");

//feed

//what are the main things user will be doing on dash
router.get("/", dashController.dashboard);

//get the profile with all of the users playlist
router.get("/profile/:profileId", dashController.getProfile);

//post request adding playlist/media to there playlist( add to public or private)
router.post("/addPlaylist/:playlistId", ensureAuth, dashController.addPlaylist);

//Put request to like playlist
router.put(
  "/likePlaylist/:playlistId",
  ensureAuth,
  dashController.likePlaylist,
);

//put request to unlike playlist
router.put(
  "/unlikePlaylist:playlistId",
  ensureAuth,
  dashController.unlikePlaylist,
);

//dash
//get for all of the users playlists
// router.put('/userPlaylist', ensureAuth, dashController.userPlaylist)

//get to filter playlist view
// router.put('/filterPlaylist', ensureAuth, dashController.filterPlaylist)

module.exports = router;
