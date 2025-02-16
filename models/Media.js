//Schemea searching playlists for artists
const mongoose = require("mongoose");
const User = require("./User.js");
const Playlist = require("./Playlist.js");

const MediaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  youtubeID: String,
  mediaDetails: {
    genre: String,
    description: String,
    image: String,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  addedOn: {
    //might need an additional date the see the latest time it was added
    type: Date,
    default: Date.now,
  },
  //The date playlist the media is apart of and the date it was added to the playlist
  onPlaylist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Playlist",
      addedDate: Date,
    },
  ],
 
});


module.exports = mongoose.model("Media", MediaSchema);
