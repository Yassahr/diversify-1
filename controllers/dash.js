const Playlist = require('../models/Playlist')

module.exports = {
    loadFeed: async(req,res)=>{
        console.log('we are cooking with grease loadFeed')
        res.render('dash.ejs')
    },
    addPlaylist: (req,res)=>{
        console.log('we are cooking with grease addPlaylist')
    },  
    likePlaylist: (req,res)=>{
        console.log('we are cooking with grease likePlaylist')
    },
    unlikePlaylist: (req,res)=>{
        console.log('we are cooking with grease unlikePlaylist')
    },
    userPlaylist: (req,res)=>{
        console.log('we are cooking with grease userPlaylist')
    },
    filterPlaylist: (req,res)=>{
        console.log('we are cooking with grease filterPlaylist')
    }

}

