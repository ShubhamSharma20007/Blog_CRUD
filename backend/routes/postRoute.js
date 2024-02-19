const express = require('express')
const route = express.Router()
const postModel = require("../Models/postModel")
const authMiddleware = require("../middleware/authMiddleware")
const { v4: uuid } = require('uuid')
const path = require('path')
const fs = require('fs')
const userModel = require('../Models/userModel')
const  mongoose  = require('mongoose')



    // GET : /api/posts
    // get all posts
route.get("/", async(req, res) => {
    try {
        const allposts =await postModel.find().sort({ upadateAt: -1 }) // deascending to ascending 
       if(allposts.length==0){
        return res.status(404).json({
          success : false,
          message :'data not found'  
        })
       }
       return res.status(201).json({
        success :true,
        allposts
        })
    } catch (error) {
        return res.status(400).json({
            success : false,
            message :"Internal server error"
        })
        
    }
})

// Post : /api/posts
// create the post
route.post("/", authMiddleware, async(req, res) => {
    try {
        const { title, category, description } = req.body;
        if (!title || !category || !description) {
            return res.status(400).json({ success: false, message: "Please fill all fields" })
        }
        const { thumbnail } = req.files;
        let fileName = thumbnail.name;
        let splitFilename = fileName.split(".")
        let newFileName = splitFilename[0] + uuid()  + splitFilename[1]
        thumbnail.mv(path.join(__dirname, "..", "/uploads", newFileName), async(err) => {
            if (err) {
                return res.status(500).json({ success: false, message: "Failed to upload image" })
            } else {
                const newPost = await postModel.create({
                    title,
                    category,
                    description,
                    thumbnail: newFileName,
                    creator: req.user._id
                })
                
                console.log(newPost)
                if (!newPost) {
                    return res.status(500).json({ success: false, message: "Failed to create post" })
                }
                const currentPost = await userModel.findById(req.user._id)
                const userPost = currentPost.posts + 1
                await userModel.findByIdAndUpdate(req.user._id, { posts: userPost }, { new: true })

                return res.status(201).json({ success: true, message: "Post created successfully", post: newPost })
            }
        })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }

})


// GET : api/posts/:id
route.get("/:id", async(req, res) => {
    try {
      if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(404).json({success:false,message:"Invalid Post Id"})
      }
      const post = await postModel.findById(req.params.id).populate('creator')
      return res.status(200).json({ success: true, post })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" })
        
    }
})

// GET  : api/posts/categories/:category
route.get("/categories/:category", async(req, res) => {
    const {category} = req.params
    const rawCategory = await postModel.find({category : category}).sort({createdAt: -1})
    return res.status(200).json({ success: true, rawCategory })
})

//  GET : api/posts/users/:id

route.get("/users/:id", async(req, res) => {
    try {
        const {id} = req.params
        const userData = await  postModel.find({creator : id}).sort({createdAt: -1})
        return res.status(200).json({ success: true, userData })
    } catch (error) {
            return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
})


// Patch : api/posts/:id

route.patch("/posts/:id", authMiddleware, async(req, res) => {
    try {
        const {id} = req.params;
        const {title,category,description} = req.body
        if(!title || !category || !description){
            return res.status(400).json({ success: false, message: "Please fill all the fields" })
        }
        if(!req.files){
            const singleValue = await postModel.findByIdAndUpdate(id,{title,category,description},{new:true})
        }
        else{
            const oldPost = await postModel.findById(id);
            fs.unlink(path.join(__dirname,"..",oldPost.thumbnail),async(err)=>{
                if(err){
                    return res.status(401).json({
                        success: false,
                        message : "Internal Server Error"
                    })
                }
                const {thumbnail} = req.files;
                const fileName = thumbnail.name;
                const splitFileName =  fileName.split(".")
                const newFileName = splitFileName[0] + uuid() +".."+ splitFileName[splitFileName.length-1]
                thumbnail.mv(path.join(__dirname,"..","uploads",newFileName),async(err)=>{
                    if(err){
                        return  res.status(401).json({
                            success : false,
                            message : "Internal Server Error"
                        })
                    }
                    const uploadPost = await postModel.findByIdAndUpdate(id,{title,category,description,thumbnail:newFileName},{new:true})
                    return res.status(200).json({
                        success : true,
                        message : "Post Updated Successfully",
                    })
                })
            })

        }
        return res.status(200).json({ success: true, singleValue })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" })
        
    }
})

// delete : api/posts/:id

route.delete("/posts/:id", authMiddleware, async(req, res) => {
    return res.send("hello from user route")
})



module.exports = route;