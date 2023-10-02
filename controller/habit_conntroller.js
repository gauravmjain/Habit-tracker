const Habit = require('../models/habits');
const User = require('../models/users');


module.exports.create = async function(req,res){
    try{
        let habit = await Habit.create({
            habit : req.body.habit,
            time : req.body.time,
            user : req.user._id
        })
        return res.redirect('back');
        
    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.showDates = function(req,res){
    // console.log(req.body);
    return res.redirect('back');
}

module.exports.done = async (req,res) =>{
    if(req.xhr){
        // console.log(req.body);  
        let habitId = req.body.postId;
        let date = req.body.add.slice(1,11);
        let isHabitPresent = await Habit.findById(habitId);
        if(isHabitPresent){
            let isHabitInDone = await isHabitPresent.dones.find((i) => {return date == i});
            let isHabitInNotDone = await isHabitPresent.notdones.find((i)=> {return date == i});
            if(!isHabitInDone && !isHabitInNotDone){
                await Habit.findByIdAndUpdate(habitId,{$addToSet : {dones : date}});
            }else if(!isHabitInNotDone) {
                await Habit.findByIdAndUpdate(habitId, {$pull : {dones : date}});
                await Habit.findByIdAndUpdate(habitId,{$addToSet : {notdones : date}})
            }else{
                await Habit.findByIdAndUpdate(habitId, {$pull : {notdones : date}});                
            }      
        }
        return res.status(200).json({
            data: {},
            message : "Ok in"
        })
    }
    // console.req(body);   
    return res.redirect('back'); 
}

module.exports.renderDones =async function(req,res){
    if(req.xhr){
        let habit = await Habit.findById(req.query.id);
        return res.status(200).json({
            data: {
                arr : habit
                
            },
            message : "All activity sended"

        })
    }
    return res.redirect('back');
    
}
module.exports.hideDate = function(req,res){
    if(req.xhr){
        return res.status(200).json({
            data :{},
            message : "Date hided successfully"
        })        
    }
    return res.redirect('back');
}