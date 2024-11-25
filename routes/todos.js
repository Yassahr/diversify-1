//Dashboard with all the the user playlists
//todo->  playlist(everything is a playlist)
const express = require('express')
const router = express.Router()
const todosController = require('../controllers/todos')//->mediaController
const { ensureAuth } = require('../middleware/auth')


//Maybe adding more gets for type of playlist-> audio, video, music

router.get('/', ensureAuth, todosController.getTodos)//Playlist dashboard

router.post('/createTodo', todosController.createTodo)//Create new  playlist 
//prompted to create a name and type of media, 
//maybe a seperate get request to open up playlist page to search for media to add
    //search would be inside of get request controller code block


router.put('/markComplete', todosController.markComplete)
//put request to like or upvote

router.put('/markIncomplete', todosController.markIncomplete)
//unlike

router.delete('/deleteTodo', todosController.deleteTodo)//Create delete  playlist that belongs to you

module.exports = router

//search function will be inside playlist [+add new playlists]
