const Playlist = require("../models/Playlist");
const Media = require("../models/Media");
const YTapi = require("./youtube-api.js");
const ObjectId = require("mongoose").Types.ObjectId;
const fetch = require("node-fetch");


module.exports = {
  playlistView: async (req, res) => {
    try {
      const playlist = await Playlist.findById(req.params.playlistId)
        .lean()
        .select("media");
      console.log(playlist, typeof playlist);
      const mediaList = await Promise.all(playlist.media.map(async (el) => el));
      console.log(mediaList);
      res.render("playlist.ejs", { playlist: playlist, mediaList: mediaList });
  
    } catch (err) {
      console.log(err);
    }
  },
  createPlaylist: async (req, res) => {
    try {
      await Playlist.create({
        todo: req.body.todoItem,
        completed: false,
        userId: req.user.id,
      });
      console.log("Todo has been added!");
      res.redirect("/home");
      //will create new playlist
      //Ask for name and public private
      //then trigger addNew media?
      //redirect to new playlist page
    } catch (err) {
      console.log(err);
    }
  },
  //used for searching for videos
  searchAPI: async (req, res) => {
    console.log("I went down the search pathway like I was supposed to")
    //be sure to include pushing to on playlist media property
    try{
    const query=req.body.query
    let results= await YTapi.search(req, res, query)
    //return array of video data from YT api with relevant details
    let vids = results.items.map(vid=>{
        return {videoId: vid.id.videoId, 
                title: vid.snippet.title, 
                description: vid.snippet.description,
                tnURL: vid.snippet.thumbnails.medium.url,
                tnWidth: vid.snippet.thumbnails.medium.width,
                tnHeight: vid.snippet.thumbnails.medium.height}
      })
    console.log(vids)
    res.render("playlist.ejs", { vids: vids});
    } catch (err) {
      console.log(err);
    }
  },
  //this will using the youtube api
  addNewMedia: async (req, res) => {
    //be sure to include pushing to on playlist media property
    console.log('boom boom')
    try {
      await Playlist.create({
        todo: req.body.todoItem,
        completed: false,
        userId: req.user.id,
      });
      console.log("Todo has been added!");
      res.redirect("/home");
    } catch (err) {
      console.log(err);
    }
  },
  addPlaylist: async (req, res) => {
    try {
      await Playlist.create({
        todo: req.body.todoItem,
        completed: false,
        userId: req.user.id,
      });
      console.log("Todo has been added!");
      res.redirect("/home");
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
      console.log(err);
    }
  },
  likePlaylist: async (req, res) => {
    try {
      await Playlist.findOneAndUpdate(
        { _id: req.body.todoIdFromJSFile },
        {
          completed: true,
        },
      );
      console.log("Marked Complete");
      res.json("Marked Complete");
      //find the playlist id in DB(using req.params)
      //Get the likes and increment by 1
      //possibly switch likes to an array
      //check if the user exists in array
      //if user exist return null
      //if user does not exist add them to array
      //return likeArray.length
    } catch (err) {
      console.log(err);
    }
  },
  unlikePlaylist: async (req, res) => {
    try {
      await Playlist.findOneAndUpdate(
        { _id: req.body.todoIdFromJSFile },
        {
          completed: false,
        },
      );
      console.log("Marked Incomplete");
      res.json("Marked Incomplete");
      //find the playlist id in DB(using req.params)
      //Get the likes and increment by 1
      //possibly switch likes to an array
      //check if the user exists in array
      //remove user from array
      //then return likeArray.length
      //if user does not exist add them to array
      //return null
    } catch (err) {
      console.log(err);
    }
  },
  deletePlaylist: async (req, res) => {
    console.log(req.body.todoIdFromJSFile);
    try {
      await Playlist.findOneAndDelete({ _id: req.body.todoIdFromJSFile });
      console.log("Deleted Todo");
      res.json("Deleted It");
      //Go in user model, find playlist, then remove it
    } catch (err) {
      console.log(err);
    }
  },
  deleteMedia: async (req, res) => {
    console.log(req.body.todoIdFromJSFile);
    try {
      await Media.findOneAndDelete({ _id: req.body.todoIdFromJSFile });
      console.log("Deleted Todo");
      res.json("Deleted It");
      //This will only be accessible if the media on their profile(aka playlist view)
      //will go to playlist, find media ID(not sure how to grab both IDs)
      //refresh page
      //Flash message: media was redelted
    } catch (err) {
      console.log(err);
    }
  },
};
