// npm packages across socket and express
const pry = require("pryjs");
const jwt = require("jsonwebtoken");
const socketIo = require("socket.io");
//require models
const User = require("./models/User");
const Script = require("./models/Script");
const UserScript = require("./models/UserScript");

//SOCKET.IO
const io = socketIo(8080, {
    handlePreflightRequest: function(req, res){
        let headers = {
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Credentials': true
        };
        res.writeHead(200, headers);
        res.end();
    }
})

//socket connections for user authentication
io.on('connection', socket => {
    if(socket.handshake.headers.authorization){
        let [type, token] = socket.handshake.headers.authorization.split(' ')
        let result = jwt.decode(token)
        let userId = result.id
        attachSocketListeners(socket, userId)
    }else{
        socket.disconnect(true)
    }
})

let attachSocketListeners = function(socket, userId){
    socket.on(console.log('You are authorized! You are connected.'))
}

//socket connections for user model
io.on("connection", socket => {
  socket.on("users.index", respond => {
    User.findAll().then(users => {
      respond(users);
    });
  });
  socket.on("users.update", async params => {
    let user = await User.findByPk(params.id);
    await user.update(params);
    let users = await User.findAll();
    io.emit("users.update", users);
  });
});

//socket connections for script model
io.on("connection", socket => {
  socket.on("scripts.index", respond => {
    User.findAll().then(scripts => {
      respond(scripts);
    });
  });
  socket.on("scripts.update", async params => {
    let script = await Script.findByPk(params.id);
    await script.update(params);
    let scripts = await Script.findAll();
    io.emit("scripts.update", scripts);
  });
});

//socket connections for join table
io.on('connection', socket => {
    socket.on('userScripts.index', respond => {
        UserScript.findAll()
            .then(userScripts => {
                respond(userScripts)
            })
    })
    socket.on('userScripts.update', async params => {
        let userScript = await UserScript.findByPk(params.id)
        await userScript.update(params)
        let userScripts = await UserScript.findAll()
        io.emit('userScripts.update', userScripts)
    })
})


//EXPRESS: npm packages
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

//EXPRESS: create server as app
const app = express();

//use middleware for express
app.use(cors());
app.use(bodyParser.json());

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

app.delete('/users/:id', async (req, res) => {
    let user = await User.findByPk(req.params.id)
    console.log(user)
    user.destroy(req.body)
    console.log("This user is deleted")
})

//http methods for script model, API
app.get("/scripts", (req, res) => {
  Script.findAll().then(scripts => {
    res.json(scripts);
  });
});

app.get("/scripts/:id", (req, res) => {
  Script.findByPk(req.params.id).then(script => {
    res.json(script);
  });
});

app.patch("/scripts/:id", async (req, res) => {
  let script = await Script.findByPk(req.params.id);
  script.update(req.body);
});

app.delete("/scripts/:id", async (req, res) => {
  let script = await Script.findByPk(req.params.id);
  console.log(script);
  script.destroy(req.body);
  console.log("This script is deleted");
});

app.post("/scripts", (req, res) => {
  console.log(req);
  User.create(req.body);
});

//http methods for userScript model, API
app.get("/userScripts", (req, res) => {
  UserScript.findAll().then(userScripts => {
    res.json(userScripts);
  });
});

//post method for Login and Sign Up Form,

//http method for login page
app.post("/LogInForm", async (req, res) => {
    let users = await User.findAll({
        where: {
            username: req.body.username
        }
    });
    let user = users[0];
    if (user.authenticate(req.body.password)) {
        res.json(user);
    }
});

app.post('/SignUpForm', (req, res) => {
    //create new user
    let newUser = User.build()
    //set up properties
    newUser.username = req.body.username
    newUser.firstName = req.body.firstName
    newUser.lastName = req.body.lastName
    newUser.password = req.body.password
    //save newUser to database
    newUser.save()
    .then(newUser => 
        // console.log(newUser);
        res.json(newUser)
    )
})

//port for express
app.listen(3001);

// eval(pry.it)
