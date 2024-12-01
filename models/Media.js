//Schemea searching playlists for artists 
const mongoose = require('mongoose')

const MediaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  mediaDetails:{
    genre: String,
    description: String,
    image: String
    //id of playlist it was added by
  },
  likes: {
    type: Number,
    default: 0
  },
  //This should be selecting the id/name that the media is apart of
  // playlists:[Playlist.name]
  // {timestamps: true}
})

module.exports = mongoose.model('Media', MediaSchema)

