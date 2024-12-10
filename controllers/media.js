const Media = require('../models/Media')

module.exports = {
  mediaView: async (req, res) => {
    res.render('media.ejs')
  },
  createMedia: async (req, res) => {
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
  addMedia: async (req, res) => {
    try {
      await Media.create({
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
  likeMedia: async (req, res) => {
    try {
      await Media.findOneAndUpdate(
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
  unlikeMedia: async (req, res) => {
    try {
      await Media.findOneAndUpdate(
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
  deleteMedia: async (req, res) => {
    console.log(req.body.todoIdFromJSFile)
    try {
      await Media.findOneAndDelete({ _id: req.body.todoIdFromJSFile })
      console.log('Deleted Todo')
      res.json('Deleted It')
    } catch (err) {
      console.log(err)
    }
  }
}
