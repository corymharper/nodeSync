//everything inside model folder: create database schema + define relationship 

//use sequelize package
const Sequelize = require('sequelize');

//use sqlite database
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

//import Script User models
const Script = require("./Script");
const User = require("./User");

//define & create join table

UserScript = sequelize.define('user_script', {
    role: Sequelize.STRING
});

User.belongsToMany(Script, {
    through: UserScript
});
Script.belongsToMany(User, {
    through: UserScript
});

module.exports = UserScript

sequelize.sync()