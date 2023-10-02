const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');


passport.use(new LocalStrategy({
    usernameField : 'email',
    passReqToCallback : true
    },

    async function(req,email, password , done){
        try{
            let user = await User.findOne({email : email});
            if (!user || user.password != password){
                return done(null, false); 
            }
            return done(null,user);

        }catch(err){
            console.log("Error at finding user in passport");
            return done(err);
            
        }
        }
    ));


// serializing the user to decide which key to be kept i cookies

passport.serializeUser(function(user,done){
    done(null,user.id);
});

// Deserializing user from the key  in the cookies

passport.deserializeUser(async function(id,done){

    try{
        let user = await User.findById(id);
        return done( null,user);
    }catch(err){
        console.log("Error in desirilizing user in passport");
        return done(err);

    }
})


// Check if user is authenticated
passport.checkAuthentication = function(req,res,next){
    //  if user is sign in, thenn pass on the next rquest to the next function controller action
    if(req.isAuthenticated()){
        return next();
    }
    // if user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        // req user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;