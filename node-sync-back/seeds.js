const User = require('./models/User')
const Script = require('./models/Script')
//TO DO:
//1. create userscript as model
//2. reseed data

User.sync()
// User.destroy()
Script.sync()
// Script.destroy()

const users = [
    {
        "username": "Cory",
        "password": "password"
    },
    {
        "username": "Jing",
        "password": "password"
    },
    {
        "username": "Eli",
        "password": "password"
    }
]

users.forEach ( user => User.create(user))

const scripts = [
    {
        "title": "Hello",
        "content": "const hello = 'Hello' ",
        "language": "JavaScript",
        "category": "variable"
    },
    {
        "title": "World",
        "content": "const world = 'world' ",
        "language": "JavaScript",
        "category": "variable"
    },
    {
        "title": "Hello World",
        "content": "console.log(\"Hello World\")",
        "language": "JavaScript",
        "category": "print"
    },
    {
        "title": "Hello World",
        "content": "puts 'Hello World!'",
        "language": "Ruby",
        "category": "print"
    },
    {
        "title": "Hello World",
        "content": "print(\"Hello, World!\")",
        "language": "Python",
        "category": "print"
    }

]

scripts.forEach(script => Script.create(script))


const userScripts = [
    {
        "userId": 1,
        "scriptId": 1
    },
    {
        "userId": 2,
        "scriptId": 2
    },
    {
        "userId": 3,
        "scriptId": 3
    },
    {
        "userId": 1,
        "scriptId": 3
    },
    {
        "userId": 1,
        "scriptId": 2
    },
    {
        "userId": 2,
        "scriptId": 1
    },
    {
        "userId": 2,
        "scriptId": 3
    },
    {
        "userId": 3,
        "scriptId": 1
    },
    {
        "userId": 3,
        "scriptId": 2
    }
]

useScripts.forEach(useScript => userScript.create(script))
