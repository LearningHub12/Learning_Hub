const express=require('express');
const app=express();
const mongoose=require('mongoose');
const UserPass=require('./user/userpass')
const cors=require('cors');

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://root1:jocker22.dk@cluster01.watow3c.mongodb.net/');

const con=mongoose.connection;

app.use('/',UserPass);
con.on('open',()=>{
    console.log("MongoDB connected");
})

app.listen(8000,()=>{
    console.log("Server is running on port 8000");
})