//Schemea searching playlists for artists 
const mongoose = require('mongoose')
//dummy data

const MediaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  mediaDetails:{
    genre: String,
    description: String,
    image: String,
    //id of playlist it was added by
  },
  likes: {
    type: Number,
    default: 0
  },
  
  //This should be selecting the id/name that the media is apart of
  // playlists:[Playlist.name]
  // {timestamps: true}
},
{
   timestamps: { createdAt: 'created_at' }
}
)

module.exports = mongoose.model('Media', MediaSchema)

