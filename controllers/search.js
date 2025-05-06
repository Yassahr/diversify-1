

module.exports={
    searchAPI: async(req, res)=>{
      console.log("did the req get this this far?")
        try{
          const query=req.params.query
          console.log("hello this is the query",query)
          //search request
          const url = `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&part=snippet&q=${query}&eventType=completed&type=video&maxResults=10&videoEmbeddable=true&relevanceLanguage=en`
          const response = await fetch(url)
        
          let results = await response.json()
          res.json(results)
          // console.log(results)
        }catch(err){
          console.log(err)
        }
    
      }
}