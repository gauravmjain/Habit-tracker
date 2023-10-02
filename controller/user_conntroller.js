const User = require("../models/users");
const Habit = require('../models/habits');

module.exports.create = async function(req,res){
    try{
        if(req.body.password != req.body.confirm_password){
            console.log("Error! Passwords are wrong")
            return res.redirect('back');
        }
        let user = await User.findOne({email: req.body.email});
        if(!user){
            await User.create(req.body);
            req.flash('success',"Account Created");
            return res.redirect('/');
        }   
        else{
            return res.redirect('back'); 
        }  

    }catch(err){
        return res.redirect('/users/sign-in');
    }
}

module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        if(req.xhr){
            return res.status(200).json({
                data :{},
                message : "sign in data"    
            })
        }
        return res.redirect("/users/profile")
    }

    return res.render('sign_up',{
        title : "My sign up page",
    })
}

module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        if(req.xhr){
            return res.status(200).json({
                data :{},
                message : "sign in data"    
            })
        }
        return res.redirect("/users/profile")
    }
    return res.redirect('/');
}

module.exports.createSession = async function(req,res){
    return res.redirect('/')
}

module.exports.destroySession = function(req,res,next){
    req.logout(function(err){
        if(err){return next(err);}
        return res.redirect('/');
    });
   
}

module.exports.habit =async(req,res)=>{
    try{
        let habits = await Habit.find({user : req.user._id});
        // console.log(req.user,habits);
        return res.render('habit',{
            title : "Habit page",
            user : req.user,
            habits : habits
        })
    }
    catch(err){
        console.log("Error at user controller habit",err);
        return res.redirect('back');
    }
}