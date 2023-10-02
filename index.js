const express = require("express");
const port = 5000;
const app = express();
const path = require('path');
const db = require('./config/mongoose');
const expressLayout = require('express-ejs-layouts');
const session = require("express-session")
const cookieParser = require('cookie-parser');
const passport = require("passport")
const passportLocal = require('./config/passport-local-stratergy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');


// sass initialization
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    // debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));




app.use(express.urlencoded());
app.use(cookieParser());


// static file path
app.use(express.static('./assets'));
app.use(expressLayout);

//extract style and script from sub pages into the layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// Setting View Engine Ejs
app.set('view engine','ejs');
app.set('views',path.join( __dirname,'views'));

//session 
app.use(session({
    name : "habit_tracker",
    secret : "something",
    resave : false,
    saveUninitialized : false,
    cookie : {
        maxAge : 1000*60*100
    },store :  MongoStore.create({
        client: db.getClient(),
    })
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser); 

// Routes for address
app.use('/',require('./routes/index'))

app.listen(port, function(err){
    if(err){
        console.log("Error at App listener",err);
        return;
    }
    console.log("Server is up And running at port :",port);
})