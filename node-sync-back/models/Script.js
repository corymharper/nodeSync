//everything inside model folder: create database schema + define relationship 

//use sequelize package
const Sequelize = require('sequelize');

//use sqlite database
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

//data type for table of this model
const Model = Sequelize.Model;


class Script extends Model {}
Script.init({
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.STRING
    },
    language: {
        type: Sequelize.STRING
    },
    category: {
        type: Sequelize.STRING
    }
}, {
    sequelize,
    modelName: 'script'
})

module.exports = Script

sequelize.sync()
