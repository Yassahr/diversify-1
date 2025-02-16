const Playlist = require("../models/Playlist");
const Media = require("../models/Media");
const User = require("../models/User");
// const fetch = require("node-fetch");


// import fetch from 'node-fetch';

module.exports = {
//takes in search value and returns array of option from api

search: async (req, res, searchValues)=>{ 
    const url = `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&part=snippet&q=${searchValues}&eventType=completed&type=video&maxResults=10&videoEmbeddable=true&relevanceLanguage=en`
    const response = await fetch(url,{
        method: "POST",
        body: JSON.stringify(req.body),
        headers: {'Content-Type': 'application/json'}
    })
    .then(res=>{ 
        console.log(res, res.json)
        res.json()})
    .catch(e=>{
        console.log("err",e)
    })
    res.json(response)
}
}