const Playlist = require('../models/Playlist')

module.exports = {
  playlistView: async (req, res) => {
    res.render('playlist.ejs')
  },
  createPlaylist: async (req, res) => {
    try {
      await Playlist.create({
        todo: req.body.todoItem,
        completed: false,
        userId: req.user.id
      })
      console.log('Todo has been added!')
      res.redirect('/home')
    } catch (err) {
      console.log(err)
    }
  },
  addPlaylist: async (req, res) => {
    try {
      await Playlist.create({
        todo: req.body.todoItem,
        completed: false,
        userId: req.user.id
      })
      console.log('Todo has been added!')
      res.redirect('/home')
    } catch (err) {
      console.log(err)
    }
  },
  likePlaylist: async (req, res) => {
    try {
      await Playlist.findOneAndUpdate(
        { _id: req.body.todoIdFromJSFile },
        {
          completed: true
        }
      )
      console.log('Marked Complete')
      res.json('Marked Complete')
    } catch (err) {
      console.log(err)
    }
  },
  unlikePlaylist: async (req, res) => {
    try {
      await Playlist.findOneAndUpdate(
        { _id: req.body.todoIdFromJSFile },
        {
          completed: false
        }
      )
      console.log('Marked Incomplete')
      res.json('Marked Incomplete')
    } catch (err) {
      console.log(err)
    }
  },
  deletePlaylist: async (req, res) => {
    console.log(req.body.todoIdFromJSFile)
    try {
      await Playlist.findOneAndDelete({ _id: req.body.todoIdFromJSFile })
      console.log('Deleted Todo')
      res.json('Deleted It')
    } catch (err) {
      console.log(err)
    }
  }
}
