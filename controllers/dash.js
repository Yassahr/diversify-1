const Playlist = require('../models/Playlist')

module.exports = {
  dashboard: async (req, res) => {
    try {
      const playlist = await Playlist.find({})
      console.log(playlist)
      res.render('dashboard.ejs', { playlist: playlist })
    } catch (err) {
      console.log(err)
    }
  },
  loadFeed: async (req, res) => {
    console.log('we are cooking with grease loadFeed')
    res.render('dash.ejs')
  },
  addPlaylist: (req, res) => {
    console.log('we are cooking with grease addPlaylist')
  },
  likePlaylist: (req, res) => {
    console.log('we are cooking with grease likePlaylist')
  },
  unlikePlaylist: (req, res) => {
    console.log('we are cooking with grease unlikePlaylist')
  },
  userPlaylist: (req, res) => {
    console.log('we are cooking with grease userPlaylist')
  },
  filterPlaylist: (req, res) => {
    console.log('we are cooking with grease filterPlaylist')
  }
}
