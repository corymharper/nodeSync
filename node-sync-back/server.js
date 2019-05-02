// npm packages across socket and express
const pry = require('pryjs');

//require models
const User = require('./models/User')
const Script = require('./models/Script')

//SOCKET.IO: socket connections for user and script models
const io = require('socket.io')()
io.on('connection', socket => {
    socket.on('users.index', respond => {
        User.findAll()
            .then(users => {
                respond(users)
            })
    })
    socket.on('users.update', async params => {
        let user = await User.findByPk(params.id)
        await user.update(params)
        let users = await User.findAll()
        io.emit('users.update', users)
    })
})

io.on('connection', socket => {
    socket.on('scripts.index', respond => {
        User.findAll()
            .then(scripts => {
                respond(scripts)
            })
    })
    socket.on('scripts.update', async params => {
        let script = await Script.findByPk(params.id)
        await script.update(params)
        let scripts = await Script.findAll()
        io.emit('scripts.update', scripts)
    })
})

//SOCKET: port for socket.io
io.listen(8080)




//EXPRESS: npm packages
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');

//EXPRESS: create server as app
const app = express()

//use middleware for express
app.use(cors())
app.use(bodyParser.json())

//http methods for user model, API
app.get('/users', (req, res) => {
    User.findAll()
    .then(users => {
        res.json(users)
    })
})

app.get('/users/:id', (req, res) => {
    User.findByPk(req.params.id)
    .then( user => {
        res.json(user)
    })
})

app.patch('/users/:id', async(req, res) => {
    let user = await User.findByPk(req.params.id)
    user.update(req.body)
})

app.delete('/users/:id', (req, res) => {
    User.findByPk(req.params.id)
    .then( user => {
        console.log("This user is deleted")
        //TO-do: add some function here for user deleted.
    })
})


//http methods for script model, API
app.get('/scripts', (req, res) => {
    Script.findAll()
        .then(scripts => {
            res.json(scripts)
        })
})

app.get('/scripts/:id', (req, res) => {
    Script.findByPk(req.params.id)
        .then(script => {
            res.json(script)
        })
})

app.patch('/scripts/:id', async (req, res) => {
    let script = await Script.findByPk(req.params.id)
    script.update(req.body)
})

app.delete('/scripts/:id', (req, res) => {
    Script.findByPk(req.params.id)
        .then(script => {
            console.log("This script is deleted")
            //TO-do: add some function here for script deleted.
        })
})

//port for express
app.listen(3001)