//Schemea searching playlists for artists
const mongoose = require("mongoose");
const User = require("./User.js");
const Playlist = require("./Playlist.js");

const MediaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "Untitled Media"
  },
  youtubeID: String,
  description:{
      type: String,
      default: "No description"
    },
  image:{
      type: String,
      default: "No image"
    },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default:[]
    },
  ],
  width:{
    type: Number,
    
  },
  image:{
    type: String,
    
  },
  addedOn: {
    //might need an additional date the see the latest time it was added
    type: Date,
    default: Date.now,
  },
  //The date playlist the media is apart of and the date it was added to the playlist
  onPlaylist: [
    [ {type: String},
      {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Playlist",
      addedDate: {
        type: Date,
        default: Date.now
      }
    }],
  ],
 
});


module.exports = mongoose.model("Media", MediaSchema);
