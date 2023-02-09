const {User} = require("./models");
const jwt = require("jsonwebtoken");
const Key = "ndweldw39d3hnliddd3b283x09kweslnde"; //random


const checkPass=(password)=>{
    if(password.length<6) return false;
    return true;
}

const register = async (req, res) => {
    const { username, password} = req.body;

    if(!username|| !password)
    {
        return res.status(422).json({
            message:"please enter a username and a password"
        });
    }

    if(!checkPass(password))
    {
        return res.status(422).json({
            message:"password length  must be of atleast 6"
        });
    }

    const userfound=await User.findOne({username:username});
    if(userfound)
    {
        return res.status(422).json({
            message:"user already exists please login now"
        });
    }

    var newuser = await User.create(req.body);

    newuser.salt = undefined;
    newuser.ency_password = undefined;

    return res.json({ msg: "user registered", newuser });
}

const commonLogin =async (req,res,next) =>{
    const { username, password } = req.body;

    if (!username || !password)
        return res.json({ msg: "username and password must be provided" });

    const newuser = await User.findOne({ username:username });

    if (!newuser || !newuser.isAuthenticated(password)){
        return res.json({ msg: "invalid username or password" });
    }

    var token = jwt.sign({_id:newuser._id},Key);
    req.body.token = token;
    req.body.newuser = newuser;
    next();

}

const login = async (req, res) => {
    return res.json({ msg: "login successful", data:req.body });
};

const reset = async(req,res) => {
    var user = await User.findOne({username:req.body.username});
    user.password = req.body.newPassword;
    await user.save();
    return res.json({ Status:"Done",user});
};

module.exports = {register,login,commonLogin,reset,Key};