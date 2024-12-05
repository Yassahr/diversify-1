//Schemea searching playlists for artists
const mongoose = require('mongoose')
//dummy data

const MediaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    mediaDetails: {
      genre: String,
      description: String,
      image: String
    },
    likes: {
      type: Number,
      default: 0
    },
    addedOn: {
      type: Date,
      default: Date.now,
    },
    //The date playlist the media is apart of and the date it was added to the playlist
    onPlaylist: [{ 
      id: mongoose.Schema.Types.ObjectId,
      addedDated: Date
    }]

  }
 
)

module.exports = mongoose.model('Media', MediaSchema)
