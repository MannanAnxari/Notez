const mongoose = require('mongoose');
const {MONGO_URI} = require('./config/keys');

// const mongoURI = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
// const mongoURI = "mongodb://127.0.0.1:27017/Nota"
// const mongoURI = "mongodb+srv://Mnan:<password>@cluster0.wgz54f5.mongodb.net/?retryWrites=true&w=majority" 
const connectToMongo = ()=>{
    mongoose.connect(MONGO_URI, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;