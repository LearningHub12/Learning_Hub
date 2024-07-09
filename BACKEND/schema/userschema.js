const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    links:{
        leetcode:String,
        hackerearth:String,
        codeforces:String,
        codechief:String
    }
})

module.exports=mongoose.model('UserSchema',UserSchema);