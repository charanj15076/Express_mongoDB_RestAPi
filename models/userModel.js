const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : [true , "please provide username "],
    },
    email : {
        type:String,
        required : [true,"please add the user email address"],
        unique : [true, "Email already exists"],
    },
    password:{
        type : String,
        required:[true,"please add user passoword"],
    },
},
{
    timestamps : true,
});
module.exports = mongoose.model("User",userSchema);