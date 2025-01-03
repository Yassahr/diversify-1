const Playlist = require('../models/Playlist')
const Media = require('../models/Media')


module.exports = {
  playlistView: async (req, res) => {
    try{
    const playlist= await Playlist.findById('675f5bc765b81fad0ddbcb92')
      console.log(playlist)
    // const mediaList= await Promise.all(
    //   playlist.media.map(async(el)=>{ 
    //   el= el.toString()
    //   console.log(ObjectId.isValid(el)) 
    //   console.log(typeof el, el) 

    // if (!ObjectId.isValid(el)){ 
    //   return `No task with id :${el}`
    // }
    //  return await Media.findById(el).select({name: 1, likes: 1}).lean().exec()
    // })) 
    res.render('playlist.ejs', {playlist: playlist})
  }catch(err){
    console.log(err)
  }
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
      //will create new playlist
      //Ask for name and public private
      //then trigger addNew media?
      //redirect to new playlist page
    } catch (err) {
      console.log(err)
    }
  },
  //this will using the youtube api
  addNewMedia: async (req, res) => {
    //be sure to include pushing to on playlist media property
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
      //this will be a post
    //when the add button is clicked(client-side) 
    //a pop-up will show asking for the name of the playlist and whether it is public or private(may be client side)
    //button to send information(name and oublic status)
    //the playlist media will be copied(insert method) 
      //added to the user playlist array
      //new id will be given
      //the creator ID will persist
    //User will be redirected to to new playlist
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
      //find the playlist id in DB(using req.params)
    //Get the likes and increment by 1
    //possibly switch likes to an array 
    //check if the user exists in array
    //if user exist return null
    //if user does not exist add them to array 
    //return likeArray.length
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
      //find the playlist id in DB(using req.params)
    //Get the likes and increment by 1
    //possibly switch likes to an array 
    //check if the user exists in array
    //remove user from array
      //then return likeArray.length
    //if user does not exist add them to array 
    //return null
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
      //Go in user model, find playlist, then remove it
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
      //This will only be accessible if the media on their profile(aka playlist view)
      //will go to playlist, find media ID(not sure how to grab both IDs)
      //refresh page
      //Flash message: media was redelted
    } catch (err) {
      console.log(err)
    }
  }
}
