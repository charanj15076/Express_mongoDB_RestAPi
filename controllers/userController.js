
const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt =  require("bcrypt");

//@desc register a user
//@route POST /api/user/register
//@access public
const registerUser = asyncHandler (async (req,res) => {
    const {username,email,password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are Mandatory");
    }

    const userAvailable = await userModel.findOne({email});
    if (userAvailable) {
        res.status(400);
        throw new Error("User email Already Exists");
    }
    //HashedPassword
    const hashedPassword = await bcrypt.hash(password,10);
    console.log("Hashed Password",hashedPassword);

    const user = await userModel.create({
        username,
        email,
        password: hashedPassword,
    });
    if (user){
        res.status(201).json({_id : user.id, email : user.email});
    }else{
        res.status(400);
        throw new Error("User data is Invalid");
    }

    res.json({message : "register the user"});
});

//@desc Login a user
//@route POST /api/user/login
//@access public
const loginUser = asyncHandler (async (req,res) => {
    const{email , password} = req.body;
    if (!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await userModel.findOne({email});
    //compare password and saved hashed password of that user
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign(
        {
            user:{
                username : user.username,
                email : user.email,
                id : user.id,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn : "15m"}
    );
    res.status(200).json({accessToken});
    }else{
        res.status(401);
        throw new Error("Email or password not valid");
    }
    res.json({message : "Login the user"});
});

//@desc Current user info
//@route POST /api/user/current
//@access private
const currentUser = asyncHandler (async (req,res) =>{
    res.json(req.user);
});
module.exports = {registerUser, loginUser,currentUser};