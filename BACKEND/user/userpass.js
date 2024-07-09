const express=require('express');
const router=express.Router();
const UserSchema=require('../schema/userschema');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const emailRegex = /^[a-zA-Z][a-zA-Z0-9/./_]+[@][a-zA-Z]+[/.][a-zA-Z]{2,3}$/
router.post('/register',async(req,res)=>{
    try{
    const {username,email,password}=req.body;
    if(emailRegex.test(email))
    {
    const existEmail=await UserSchema.findOne({email});
    const existUser=await UserSchema.findOne({username});
    if(existUser)
    {
        res.json({msg: 'Username already exist'});
    }
    else if(existEmail)
    {
        return res.json({msg:"Email already exists"});
    }
    else
    {
        const hasspassword=await bcrypt.hash(password,10);
    const user=new UserSchema({
        username:username,
        email: email,
        password:hasspassword,
        links:{
            leetcode:"",
            hackerearth:"",
            codeforces:"",
            codechief:"",
        }
    })
    user.save();
    const token=await jwt.sign({username:user.username,email:user.email},"Teamheadismani");
    res.json({
        msg:"User registered successfully",
        user:{
            userdetails:{
                email:user.email,
                username:user.username,
                links:user.links,
                id:user._id
            }
        },
        token:token
    })
    }
    }
    else
    {
        res.json({msg: "Invalid email"});
    }
}catch(err){
    res.json({msg:"User registration failed"});
}
})

router.post('/login',async(req,res)=>{
    try{
    const {email,password}=req.body;
    if(emailRegex.test(email))
    {
    const user=await UserSchema.findOne({email});
    if(user)
    {
    const hasspassword=await bcrypt.compare(password,user.password);
    if(hasspassword){
        const token=await jwt.sign({username:user.username,email:user.email},"Teamheadismani")
        const send={
            username:user.username, 
            email:email,
            id:user._id
        }
        res.json({
            msg:"Login successfully",
            user:send,
            token:token
        });
    }
    else{
        res.json({msg:"Invalid username or password"});
    }
    }
    else
    {
        res.json({msg:"User does not exist"});
    }
    }
    else{
        res.json({msg: "Invalid email"});
    }
    }
    catch(err)
        {
    res.json({msg:"Login failed"})
    }
})
router.post('/forms',async(req,res)=>{
    try{
        const { leetcode, hackerearth, codeforces, codechief, user } = req.body;
    const find1 = await UserSchema.findOne({ _id: user });
    if (find1) {
        await UserSchema.findByIdAndUpdate(
            user,
            {
                $set: {
                    "links.leetcode": leetcode,
                    "links.hackerearth": hackerearth,
                    "links.codeforces": codeforces,
                    "links.codechief": codechief
                }
            }
        );
            res.json({
                msg:"Links added successfully",
                user:{
                    userdetails:{
                        id:find1._id,
                        email:find1.email,
                        username:find1.username,
                        links:find1.links,
                    }
                }
            })
    } else 
    {
        res.json({ msg: "User not found" });
    }

        }
    catch(err){
        res.json({msg:"Form submission failed"});
    }
})

module.exports=router;