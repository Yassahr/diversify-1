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
        method: "GET",
        headers: {'Content-Type': 'application/json'}
    })
    
    let data = await response.json()
    return data
}
}

//then and chaining code block
// const url = `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&part=snippet&q=${searchValues}&eventType=completed&type=video&maxResults=10&videoEmbeddable=true&relevanceLanguage=en`
// let variable;
//  fetch(url,{
//     method: "GET",
//     headers: {'Content-Type': 'application/json'}
// })
// .then(res=> {
//     return res.json()
//     //  res.json()})//turning res to into json object

// }).then(data=>{
//     variable= data
// })
// .catch(e=>{
//     console.log("err",e)
// })
// // return res.json(response)
// // let data = await response.json()
// // return data
// return variable