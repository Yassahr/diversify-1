const Media = require("../models/Media");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
  mediaView: async (req, res) => {
    try {
      const media = await Media.findById(req.params.id).lean();
      const likes = await getLike(req.params.id)
      console.log(likes)
      res.render("media.ejs", { media: media, likes: likes});
    } catch (err) {
      console.log(err);
    }
  },
  //Adding media that already exists
  addMedia: async (req, res) => {
    try {
      await Media.create({
        todo: req.body.todoItem,
        completed: false,
        userId: req.user.id,
      });
      //sending to EJS
      //Will need User Model to populate all of the user playlists

      //this will be a post
      //when the add button is clicked(client-side)
      //Pop up that will ask which playlist it wants to be added to
      //No Redirect
      //Button pressed media id added to media array in playlist
      //message flash(MediaName added to Playlist name)

      console.log("Todo has been added!");
      res.redirect("/home");
    } catch (err) {
      console.log(err);
    }
  },
  likeMedia: async (req, res) => {
    const user = req.user._id;
    let mediaId =req.params.id;
    try {
      await Media.findOneAndUpdate(
        { _id: mediaId},
        {
          $addToSet: {
            likes: user,
          },
        },
        {new:true}
        
      );
      mediaId= new ObjectId(mediaId);
      let likes = await Media.aggregate([
        { $match: {_id: mediaId}  }, // Match the specific document
        { 
          $project: { 
            likesCount: { $size: "$likes" } // Add the size of the `likes` array as `likesCount`
          } 
        }
      ])

      console.log("likes",likes, likes[0].likesCount, mediaId)
      
      res.redirect("/home")   
      //find the media id in DB(using req.params)
      //Get the likes and increment by 1
      //possibly switch likes to an array
      //check if the user exists in array
      //if user exist return null
      //if user does not exist add them to array
      //return likeArray.length
      //redirect ti media
    } catch (err) {
      console.log(err);
    }
  },
  unlikeMedia: async (req, res) => {
    try {
      await Media.findOneAndUpdate(
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
      //redirect to media
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
      //This will only be accessible if the media on their profile
    } catch (err) {
      console.log(err);
    }
  },
};

async function getLike(id){
  let mediaId= new ObjectId(id);
  let likes = await Media.aggregate([
    { $match: {_id: mediaId}  }, // Match the specific document
    { 
      $project: { 
        likesCount: { $size: "$likes" } // Add the size of the `likes` array as `likesCount`
      } 
    }
  ])
  return likes[0].likesCount
}
