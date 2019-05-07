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
  handlePreflightRequest: function(req, res) {
    let headers = {
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Credentials": true
    };
    res.writeHead(200, headers);
    res.end();
  }
});
//socket connections for user authentication
io.on("connection", socket => {
  if (socket.handshake.headers.authorization) {
    let [type, token] = socket.handshake.headers.authorization.split(" ");
    let result = jwt.decode(token);
    let userId = result.id;
  } else {
    console.log(
      "\x1b[31m",
      "--------------------------------------------------- YOU DONE GOT KICKED OUT ---------------------------------------------------"
    );
    socket.disconnect(true);
  }

  //socket connections for user model
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

  socket.on("userScripts.index", respond => {
    UserScript.findAll().then(userScripts => {
      respond(userScripts);
    });
  });
  socket.on("userScripts.update", async params => {
    let userScript = await UserScript.findByPk(params.id);
    await userScript.update(params);
    let userScripts = await UserScript.findAll();
    io.emit("userScripts.update", userScripts);
  });
});

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
app.get("/users", (req, res) => {
  User.findAll().then(users => {
    res.json(users);
  });
});

app.post("/users", (req, res) => {
  //create new user
  let newUser = User.build();
  //set up properties
  newUser.username = req.body.username;
  newUser.firstName = req.body.firstName;
  newUser.lastName = req.body.lastName;
  newUser.password = req.body.password;
  //save newUser to database
  newUser.save().then(newUser =>
    // console.log(newUser);
    res.json(newUser)
  );
});

app.get("/users/:id", (req, res) => {
  User.findByPk(req.params.id).then(user => {
    res.json(user);
  });
});

app.patch("/users/:id", async (req, res) => {
  let user = await User.findByPk(req.params.id);
  user.update(req.body);
});

app.delete("/users/:id", async (req, res) => {
  let user = await User.findByPk(req.params.id);
  console.log(user);
  user.destroy(req.body);
  console.log("This user is deleted");
});

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

app.post("/scripts", (req, res) => {
  //TO BE TESTED.
  //create new script
  let newScript = Script.build();
  //set up properties
  newScript.title = req.body.title;
  // newScript.content = req.body.content
  newScript.language = req.body.language;
  newScript.category = req.body.category;
  //save newScript to database
  newScript
    .save()
    //link script to specific user
    .then(newScript => res.json(newScript));
  User.findByPk(req.body.userid).then(user => {
    user.addScript(newScript, { through: { role: "owner" } });
  });
  console.log("is this reachable?");
  io.emit("scriptCreated", newScript);
});

app.patch("/scripts/:id", async (req, res) => {
  let script = await Script.findByPk(req.params.id);
  script.update(req.body);
});

app.delete("/scripts/:id", async (req, res) => {
  let script = await Script.findByPk(req.params.id);
  console.log(script);
  script.destroy();
  console.log("This script is deleted");
});

//http methods for userScript model, API
app.get("/userScripts", (req, res) => {
  UserScript.findAll().then(userScripts => {
    res.json(userScripts);
  });
});

//show specific users' scripts
app.get("/users/:id/scripts", (req, res) => {
  User.findByPk(req.params.id).then(user => {
    user.getScripts().then(scripts => res.json(scripts));
  });
});

//show specific scripts' users
app.get("/scripts/:id/users", (req, res) => {
  Script.findByPk(req.params.id).then(script => {
    script.getUsers().then(users => res.json(users));
  });
});

//post method for Login and Sign Up Form,

//http method for login page
app.post("/login", (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    console.log(user);
    if (user.authenticate(req.body.password)) {
      res.json(user);
    }
  });
});

//port for express
app.listen(3001);

// eval(pry.it)
