//Playlist page
if(document.querySelector('.search')){
document.querySelector('.search').addEventListener('click', search);
}
//Playlist page
if(document.querySelector('.videoGallery')){
document.querySelector('.videoGallery').addEventListener('click', addToPlaylist);
}
if(document.querySelector("#addPlaylist")){
document.querySelector('#addPlaylist').addEventListener('click', addPlaylist);
}
// if(document.querySelector(".deletePl")){
//   document.querySelector('.deletePl').addEventListener('click', deletePlaylist);
//   }

//Playlist page
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
          const iframe=document.createElement('iframe')
          setAttributes(iframe, {
            "id":`${vid.videoId}`,
            "title": vid.title,
            "type":"text/html", 
            "width": vid.tnWidth ? `${vid.tnWidth}%` : "100%",
            "height": vid.tnHeight || "315", 
            "src": `https://www.youtube.com/embed/${vid.videoId}?autoplay=1&origin==${window.location.origin}
          `})
          videoContainer.appendChild(iframe)

          let addMediaBtn=document.createElement('button')
          addMediaBtn.classList.add('addButton')
          //make an object that includes all of the neccessary properties
          //adding Datat sets to video
          addMediaBtn.dataset.videoId = vid.videoId;
          addMediaBtn.dataset.name =  vid.title
          addMediaBtn.dataset.description =  vid.description
          addMediaBtn.dataset.url =  vid.tnURL
          addMediaBtn.dataset.width =  vid.tnHeight
          addMediaBtn.dataset.height =  vid.tnHeight
          ;
          addMediaBtn.innerHTML="Add to Playlist"
          videoContainer.appendChild(addMediaBtn)
          
        })
      }

    }catch(err){
      console.log(err)
    }
}
async function addToPlaylist(e){
//Clientside for put/patch request

  let mediaId
  let videoObj={
    videoId: e.target.dataset.videoId,
    name: e.target.dataset.name,
    description: e.target.dataset.description,
    url: e.target.dataset.url,
    width: e.target.dataset.width, 
    height: e.target.dataset.height
  }
  const playlistId= window.location.pathname.split('/').pop();

if (e.target.classList.contains('addButton')) {
     mediaId = e.target.dataset.videoId;
  }
  //or it is sent over in the param of the clickEvent
  console.log("playlist, media, videoobj",playlistId, mediaId)
    try{
        const response = await fetch('/playlist/addNewMedia', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'mediaId': mediaId,
                'playlistId':playlistId,
                'videoObj': videoObj
            })
        })
        const data = await response.json()
        console.log(data)
        // location.reload()
    }catch(err){
        console.log(err)
    }


}


// Profile Page
async function addPlaylist(){
  const modalEl = document.getElementById('info-popup');
const privacyModal = new Modal(modalEl, {
    placement: 'center'
});

privacyModal.show();

const closeModalEl = document.getElementById('close-modal');
closeModalEl.addEventListener('click', function() {
    privacyModal.hide();
});

const acceptPrivacyEl = document.getElementById('confirm-button');
acceptPrivacyEl.addEventListener('click', async function() {
  try {
      const playlistName= document.querySelector('#plName').value
      const playlistDescription= document.querySelector('#plDescription').value
console.log(playlistName, playlistDescription)
        const response = await fetch("http://localhost:2121/playlist/createPlaylist", {
          method: "post",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            playlistName:playlistName,
            playlistDescription: playlistDescription,

          }),
        
        });
        const data = await response.json(); // Now safe to parse JSON
        console.log(data);
      
        // Redirect manually after success
        if (data.success) {
          window.location.href = data.redirectUrl;
        }
        
      } catch (err) {
        console.log(err);
      }
    alert('New Playlist Created');
    privacyModal.hide();
});
}



// Delete Playlist Path
// async function deletePlaylist() {
//     const playlistId = this.parentNode
//     console.log(playlistId)
//     try {
//       const response = await fetch("todos/deleteTodo", {
//         method: "delete",
//         headers: { "Content-type": "application/json" },
//         body: JSON.stringify({
//           playlistId: playlistId,
//         }),
//       });
//       const data = await response.json();
//       console.log(data);
//       location.reload();
//     } catch (err) {
//       console.log(err);
//     }
//   }

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