const express = require('express')
const route = express.Router()
const postModel = require("../Models/postModel")
const authMiddleware = require("../middleware/authMiddleware")
const { v4: uuid } = require('uuid')
const path = require('path')
const fs = require('fs')
const userModel = require('../Models/userModel')
const mongoose = require('mongoose')



// GET : /api/posts
// get all posts
route.get("/", async(req, res) => {
    try {
        const allposts = await postModel.find().sort({ upadateAt: -1 }) // deascending to ascending 
        if (allposts.length == 0) {
            return res.status(404).json({
                success: false,
                message: 'data not found'
            })
        }
        return res.status(201).json({
            success: true,
            allposts
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Internal server error"
        })

    }
})

route.get("/filterposts", async(req, res) => {
    try {
        const allPosts = await postModel.find();
        const users = await userModel.find();

        if (allPosts.length === 0 || users.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Data not found'
            });
        }

        const filteredPosts = allPosts.filter(post => {
            const creatorId = post.creator.toString();
            const user = users.find(user => user._id.toString() === creatorId);
            return user;
        });

        if (filteredPosts.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No posts found for matching users'
            });
        }

        const postsWithUserData = filteredPosts.map(post => {
            const creatorId = post.creator.toString();
            const user = users.find(user => user._id.toString() === creatorId);
            return {
                ...post.toJSON(),
                username: user.name,
                userAvatar: user.avatar // Assuming avatar is a field in the userModel
            };
        });

        return res.status(200).json({
            success: true,

            posts: postsWithUserData
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});



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
        let newFileName = splitFilename[0] + uuid() + "." + splitFilename[1]
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
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ success: false, message: "Invalid Post Id" })
        }
        const post = await postModel.findById(req.params.id).populate('creator')
        return res.status(200).json({ success: true, post })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" })

    }
})

// GET  : api/posts/categories/:category
route.get("/categories/:category", async(req, res) => {
    const { category } = req.params
    const rawCategory = await postModel.find({ category: category }).sort({ createdAt: -1 })
    return res.status(200).json({ success: true, rawCategory })
})

//  GET : api/posts/users/:id

route.get("/users/:id", async(req, res) => {
    try {
        const { id } = req.params
        const userData = await postModel.find({ creator: id }).sort({ createdAt: -1 })
        return res.status(200).json({ success: true, userData })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
})


// Patch : api/posts/:id

route.put("/posts/:id", authMiddleware, async(req, res) => {
    try {
        const { id } = req.params;
        const { title, category, description } = req.body;
        if (!title || !category || !description) {
            return res.status(400).json({ success: false, message: "Please fill all the fields" });
        }

        let updateFields = { title, category, description };

        if (!req.files || !req.files.thumbnail) {
            const singleValue = await postModel.findByIdAndUpdate(id, updateFields, { new: true });
            return res.status(200).json({ success: true, message: "Post Updated Successfully", singleValue });
        }

        const oldPost = await postModel.findById(id);
        fs.unlink(path.join(__dirname, "..", "/uploads", oldPost.thumbnail), async(err) => {
            if (err) {
                return res.status(500).json({ success: false, message: "Internal Server Error", err });
            }

            const { thumbnail } = req.files;
            const fileName = thumbnail.name;
            const splitFileName = fileName.split(".");
            const newFileName = splitFileName[0] + uuid() + "." + splitFileName[splitFileName.length - 1];
            thumbnail.mv(path.join(__dirname, "..", "/uploads", newFileName), async(err) => {
                if (err) {
                    return res.status(500).json({ success: false, message: "Internal Server Error", err });
                }
                updateFields.thumbnail = newFileName;
                await postModel.findByIdAndUpdate(id, updateFields, { new: true });
                return res.status(200).json({ success: true, message: "Post Updated Successfully" });
            });
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error });
    }
});


// delete : api/posts/:id

route.delete("/posts/:id", authMiddleware, async(req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid id "
            });
        }

        const findPost = await postModel.findById(id);
        if (!findPost) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        const fileName = findPost.thumbnail;
        fs.unlink(path.join(__dirname, "..", "/uploads", fileName), async(err) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Internal Server Error"
                });
            } else {
                await postModel.findByIdAndDelete(id);

                // Reduce the post count in the user model
                const user = await userModel.findById(req.user._id);
                if (user) {
                    user.posts = user.posts - 1;
                    await user.save();
                }
            }
        });

        return res.status(200).json({
            message: `Post deleted successfully: ${id}`,
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});




module.exports = route;