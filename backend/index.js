require('dotenv').config({ path: "./.env" })
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connectDB');
const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');
const expressfileupload = require('express-fileupload')
const multer = require('multer');
const authMiddleware = require('./middleware/authMiddleware');
const userModel = require('./Models/userModel');
const fs = require('fs');
const path = require('path');
const app = express();

const { v4: uuid } = require('uuid');
const { default: mongoose } = require('mongoose');
connectDB();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
    
  }));
  

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(expressfileupload())
app.use("/uploads", express.static(__dirname + "/uploads"))


app.use("/v1/api/users", userRoute)
app.use('/v1/api/posts', postRoute)



app.post('/change-avatar/:id',authMiddleware,async(req,res)=>{
    const id = req.params.id;
    try {
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message:"User not found"})
    }
    const user = await userModel.findById(id);
    if(user){
        const {avatar} = req.files;
        const fileSplit = avatar.name.split('.');
        const newFilename = fileSplit[0]+uuid()+'.'+fileSplit[1];
        avatar.mv(path.join(__dirname,"/uploads",newFilename),async(err)=>{
            if(err){
                return res.status(500).json({message:"Internal server error",err})
            }
            await userModel.findByIdAndUpdate(id,{avatar:newFilename},{new:true})
            return res.status(200).json({message:"Avatar changed successfully"})
        })
    }
    
    } catch (error) {
        return res.status(500).json({message:"Internal server error",error:error.message})
    }
})







app.listen(process.env.PORT || 5000, () => {
    console.log("Server is running on port " + process.env.PORT)
})