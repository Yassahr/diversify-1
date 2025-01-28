const Playlist = require("../models/Playlist");
const Media = require("../models/Media");
const User = require("../models/User");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
  getIndex: (req, res) => {
    console.log("get index");
    res.render("index.ejs");
  },
  dashboard: async (req, res) => {
    try {
      const user = req.user;
      // console.log(user);
      const posts = await Media.find().sort({ addedOn: -1 }).lean();
      
      await Promise.all(posts.map(async media=>{
        // console.log('media',media._id)
        return media.like =  await getLike(media._id) 
        //  console.log('medialikes',media.likes)
      }))
      console.log('posts',posts)
      res.render("dashboard.ejs", { post: posts, user: user });

      //Media ID, playlistName(id), likes, name, media details being sent to the ejs
    } catch (err) {
      console.log(err);
    }
  },
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
  //All of the functions below are for when the user is in the profile of the user
  getProfile: async (req, res) => {
    try {
      console.log(req.params.profileId);
      const profile = await User.findById(req.params.profileId)
        .select("playlists")
        .lean();
      const userPlaylist = await Promise.all(
        profile.playlists.map(async (el) => {
          el = el.toString();
          console.log(ObjectId.isValid(el));
          // console.log(typeof el, el);

          if (!ObjectId.isValid(el)) {
            return `No task with id :${el}`;
          }
          return await Playlist.findById(el)
            .select({ name: 1, likes: 1 })
            .lean()
            .exec();
        }),
      );
      // console.log(userPlaylist);
      // console.log(mediaList)
      res.render("profile.ejs", { userPlaylist: userPlaylist, user: req.user });
      //Go to the user model and load all of the playlists associated with user
      //On EJS logic to only show playlist with public property
    } catch (err) {
      console.log(err);
    }
  },
  addPlaylist: async (req, res) => {
    console.log("we are cooking with grease addPlaylist");
    //this will be a post
    //when the add button is clicked(method override)
    let newPlaylist;
    try {
      Playlist.findById(req.param.playlistId).exec(function (err, doc) {
        doc._id = new mongoose.Types.ObjectId();
        newPlaylist = doc._id;
        doc.isNew = true; //<--------------------IMPORTANT
        doc.overwrite({ creatorId: req.user.id });
        doc.save();
      });
      //adding playlist to user playlist array
      await User.findOneandUpdate(
        { _id: req.params.id },
        { $push: { playlist: doc._id } },
        done,
      );
    } catch (err) {
      console.log(err);
    }

    //button to send information(req.user and playlist ID)
    //the playlist media will be copied(insert method)
    //added to the user playlist array
    //new id will be given
    //the creator ID will persist
    //User will be redirected to to new playlist
  },
  likePlaylist: (req, res) => {
    console.log("we are cooking with grease likePlaylist");
    //find the playlist id in DB(using req.params)
    //Get the likes and increment by 1
    //possibly switch likes to an array
    //check if the user exists in array
    //if user exist return null
    //if user does not exist add them to array
    //return likeArray.length
  },
  unlikePlaylist: (req, res) => {
    //find the playlist id in DB(using req.params)
    //Get the likes and increment by 1
    //possibly switch likes to an array
    //check if the user exists in array
    //remove user from array
    //then return likeArray.length
    //if user does not exist add them to array
    //return null
    console.log("we are cooking with grease unlikePlaylist");
  }
  //helper function not sure if it needs to be inside object
  
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
//Query for all playlists that have media if
async function playlistNames(id){
  let playlistLists = await Playlist.find({media: {$eleMatch:{_id: id}}})
  return playlistLists
}