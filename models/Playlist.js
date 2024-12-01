const mongoose = require('mongoose')
const media = require('./Media.js')
// const mediaSchema = mongoose.model('Media', MediaSchema)

const PlaylistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  creatorId: {
    type: String,
    required: true
  },
  mediaType:{
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  media:{
    id: String,
    genre: String,
    description: String,
    image: String
  },
  //trouble adding media schema array
  // media:[MediaSchema],

  // {timestamps: true },
  public:{
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('Playlist', PlaylistSchema)
