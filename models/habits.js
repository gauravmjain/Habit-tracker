const mongoose = require ("mongoose");

const habitSchema = new mongoose.Schema({
    habit : {
        type : String,
        required : true
    },
    time : {
        type : String,
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Users'   
    }
    ,
    dones : [
        {
            type : String
        }
    ],
    notdones : [
        {
            type : String
        }
    ]
},{
    timestamps : true
})
 

const Habit = mongoose.model('Habit',habitSchema);

module.exports = Habit;