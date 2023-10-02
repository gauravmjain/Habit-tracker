const mongoose = require('mongoose');

mongoose.connect("mongodb://0.0.0.0/habit_track");
const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error at mongoose in config"));
db.once('open',function(){
    console.log("Connected to database :: MongoDB");
})

module.exports = db;