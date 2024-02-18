const express = require('express')
const route = express.Router()
const postModel = require("../Models/postModel")
const authMiddleware = require("../middleware/authMiddleware")
const { v4: uuid } = require('uuid')
const path = require('path')
const fs = require('fs')
const userModel = require('../Models/userModel')
    // GET : /api/posts
    // get all posts
route.get("/", (req, res) => {
    return res.send("hello from user route")
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
        let newFileName = splitFilename[0] + uuid() + ".." + splitFilename[1]
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
route.get("/:id", (req, res) => {
    return res.send("hello from user route")
})

// GET  : api/posts/categories/:category
route.get("/categories/:category", async(req, res) => {
    return res.send("hello from user route")
})

//  GET : api/posts/users/:id

route.get("/users/:id", (req, res) => {
    return res.send("hello from user route")
})


// Patch : api/posts/:id

route.patch("/posts/:id", authMiddleware, async(req, res) => {
    return res.send("hello from user route")
})

// delete : api/posts/:id

route.delete("/posts/:id", authMiddleware, async(req, res) => {
    return res.send("hello from user route")
})



module.exports = route;