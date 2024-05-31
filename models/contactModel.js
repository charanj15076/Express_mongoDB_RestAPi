const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
{
    user_id:{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"

    },
    name : {
        type : String,
        required : [true, "please add the required Contact Name"]
    },
    email : {
        type : String,
        required : [true , "please add the required Contact Email"]
    },
    phone : {
        type : String,
        required : [true, "please add the required Contact phone number"]
    },
},
{
    timestamps : true,
});
module.exports = mongoose.model("Contact",contactSchema);