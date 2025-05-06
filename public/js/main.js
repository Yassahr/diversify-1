//add click event for search 
document.querySelector('.search').addEventListener('click', search);


async function search(event){
let query = document.querySelector("#simple-search").value
console.log(query)
  event.preventDefault();
  try{
    const response = await fetch(`http://localhost:2121/search/${query}` )
    const data = await response.json()
  //return array of video data from YT api with relevant details
  let vids = data.items.map(vid=>{
      return {videoId: vid.id.videoId, 
              title: vid.snippet.title, 
              description: vid.snippet.description,
              tnURL: vid.snippet.thumbnails.medium.url,
              tnWidth: vid.snippet.thumbnails.medium.width,
              tnHeight: vid.snippet.thumbnails.medium.height}
    })

    if(vids.length==0){
      
      document.querySelector(".noResults").innerHTML="No Results. Try a different search."
    }else{
      document.querySelector(".videoGallery").classList.remove("h-0", "overflow-hidden")
      vids.forEach(vid=>{
        const videoContainer= document.createElement('div')
        document.querySelector('.videoGallery').appendChild(videoContainer)

        const iframe= document.createElement('iframe')
        setAttributes(iframe, {
          "id":`ytplayer-${vid.videoId}`,
          "type":"text/html", 
          "width": vid.tnWidth ? `${vid.tnWidth}%` : "100%",
          "height": vid.tnHeight || "315", 
          "src": `https://www.youtube.com/embed/${vid.videoId}?autoplay=1&origin==${window.location.origin}
        `})
        videoContainer.appendChild(iframe)

        let addMediaBtn=document.createElement('button')
        addMediaBtn.classList.add('addButton')
        addMediaBtn.dataset.videoId = vid.videoId;
        addMediaBtn.innerHTML="Add to Playlist"
        videoContainer.appendChild(addMediaBtn)
        
     
      })
    }

  }catch(err){
    console.log(err)
  }
}

//Clientside for put/patch request
async function addToPlaylist(playlistId, mediaId){


}


// const deleteBtn = document.querySelectorAll(".del");
// const todoItem = document.querySelectorAll("span.not");
// const todoComplete = document.querySelectorAll("span.completed");

// Array.from(deleteBtn).forEach((el) => {
//   el.addEventListener("click", deleteTodo);
// });

// Array.from(todoItem).forEach((el) => {
//   el.addEventListener("click", markComplete);
// });

// Array.from(todoComplete).forEach((el) => {
//   el.addEventListener("click", markIncomplete);
// });

// async function deleteTodo() {
//   const todoId = this.parentNode.dataset.id;
//   try {
//     const response = await fetch("todos/deleteTodo", {
//       method: "delete",
//       headers: { "Content-type": "application/json" },
//       body: JSON.stringify({
//         todoIdFromJSFile: todoId,
//       }),
//     });
//     const data = await response.json();
//     console.log(data);
//     location.reload();
//   } catch (err) {
//     console.log(err);
//   }
// }

// async function markComplete() {
//   const todoId = this.parentNode.dataset.id;
//   try {
//     const response = await fetch("todos/markComplete", {
//       method: "put",
//       headers: { "Content-type": "application/json" },
//       body: JSON.stringify({
//         todoIdFromJSFile: todoId,
//       }),
//     });
//     const data = await response.json();
//     console.log(data);
//     location.reload();
//   } catch (err) {
//     console.log(err);
//   }
// }

// async function markIncomplete() {
//   const todoId = this.parentNode.dataset.id;
//   try {
//     const response = await fetch("todos/markIncomplete", {
//       method: "put",
//       headers: { "Content-type": "application/json" },
//       body: JSON.stringify({
//         todoIdFromJSFile: todoId,
//       }),
//     });
//     const data = await response.json();
//     console.log(data);
//     location.reload();
//   } catch (err) {
//     console.log(err);
//   }
//
function setAttributes(ele, attrObj){
  for(const key in attrObj){
    ele.setAttribute(key, attrObj[key]);
  }
}