const Playlist = require("../models/Playlist");
const Media = require("../models/Media");
const User = require("../models/User");
const fetch = require("node-fetch");

// import fetch from 'node-fetch';

module.exports = {
//takes in search value and returns array of option from api

search:(searchValues)=>{ 

fetch(`https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&part=snippet&q=${searchValues}`)
}
}