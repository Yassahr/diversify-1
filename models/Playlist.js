const mongoose = require("mongoose");
const media = require("./Media.js");
const User = require("./User.js");

// const mediaSchema = mongoose.model('Media')

const PlaylistSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 1,
    maxLength: 20,
    required: true,
  },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  mediaType: {
    type: String,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: 0,
    },
  ],
  media: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
      name: String,
      description: String,
      image: String,
    },
  ],
  public: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Playlist", PlaylistSchema);
