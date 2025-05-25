const Playlist = require("../models/Playlist");
const User = require("../models/User");

const Media = require("../models/Media");
const ObjectId = require("mongoose").Types.ObjectId;


module.exports = {
  playlistView: async (req, res) => {
    try {
      const playlist = await Playlist.findById(req.params.playlistId)
        .lean()
        .select("media");
        const playlistName = await Playlist.findById(req.params.playlistId)
        .lean()
        .select("name");
      // console.log(playlistName, typeof playlist);
      const mediaList = await Promise.all(playlist.media.map(async (el) => el));
      console.log(mediaList, mediaList);
      res.render("playlist.ejs", { playlist: playlistName, mediaList: mediaList });
  
    } catch (err) {
      console.log(err);
    }
  },

  createPlaylist: async (req, res) => {
    try {
      //creating new playlist
        const newPlaylist = new Playlist();
        console.log(req.user )
        newPlaylist.name = req.body.playlistName;
        newPlaylist.playlistDescription = req.body.playlistDescription;
        newPlaylist.creatorId = req.user;
        newPlaylist.userId = req.user;

        const playlist = await newPlaylist.save();

        //append to user 
        await Playlist.findOneAndUpdate(
          {_id: new ObjectId(req.body.id)}
         ,
        {
          $addToSet: { 
            playlist: 
              {_id: playlist._id}
          }
         },
         {
          new: true
         }
        )
console.log(playlist._id)
       
res.status(200).json({
  success: true,
  redirectUrl: `http://localhost:2121/playlist/${playlist._id}`
});       
    
      console.log("playlistbeen added!");
     
    } catch (err) {
      console.log(err);
    }
  },

  addNewMedia: async (req, res) => {
    let playlistId=req.body.playlistId;
    let mediaId=req.body.mediaId;
    let videoObj= req.body.videoObj
    console.log('addNewMedia Route')
    try {
      //if this media doesnt exist then create it 
      const incomingMedia= await  Media.exists({youtubeID: mediaId })
      if(incomingMedia===null){
        await Media.create({
         youtubeID: mediaId,
         name: videoObj.name,
         description: videoObj.description,
         url: videoObj.url,
         width: videoObj.width,
     })
      }
      console.log(playlistId, mediaId, "",videoObj)
      //add it to the new media onPlaylist array
      const newMedia = await Media.findOneAndUpdate( 
        {youtubeID: mediaId },
         {
          $addToSet: { 
            onPlaylist: new ObjectId(playlistId)
          }, 
         }, 
         {
          new: true,
          // Return additional properties about the operation, not just the document
         includeResultMetadata: true
        }
      );
      
    //   newMedia.value instanceof Media; 
      
    //  if(newMedia.lastErrorObject.updatedExisting){
    //   //if this is a new media
    //   //add logic to add the media details
    
    //  }

     //add media to playlist
     console.log("new media id",newMedia.value._id)

     //add the new media to the appropriate playlist
     await Playlist.findOneAndUpdate(
        {_id: new ObjectId(playlistId)}
       ,
      {
        //when all info is added tp media addition route
        //add full object to set
        $addToSet: { 
          media: 
            {_id: newMedia.value._id}
        }
       },
       {
        new: true
       }
      )
      
       console.log("media has been added")
    
      res.json("media added")
      
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
    try {
      console.log("req.user._id:",req.user._id,req.user,"req.params.id:", req.params.id)
      // let iD=String(req.user._id)
      // iD=iD.split(iD.indexOf("\'"), iD.lastIndexOf("\'"))
      // console.log(iD)
     let deletedPl= await User.updateOne(
          { _id: req.user._id },
          {$pull:
            {playlist: new Object(req.params.id) }
          }
          );
        
          console.log("deleted playlist", deletedPl)
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
