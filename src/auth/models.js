const mongoose = require("mongoose");
const uuid = require("uuid");
const CryptoJs = require("crypto-js");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        trim:true,
    },
    name:String,
    ency_password:String,
    salt:String,
    email:String,
},{timestamps:true});

userSchema.methods = {
    securePassword: function(planpassword){
        return CryptoJs.SHA256(planpassword,this.salt).toString();
    },
    isAuthenticated: function(password){
        return this.securePassword(password) == this.ency_password;
    }
};

userSchema.virtual("password").set(function(planpassword) {
    this.salt = uuid.v4();
    this.ency_password = this.securePassword(planpassword);
});

const User = mongoose.model("User",userSchema);

module.exports={User};