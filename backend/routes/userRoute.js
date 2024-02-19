const express = require('express')
const route = express.Router()
const userModel = require('../Models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authMiddleware = require("../middleware/authMiddleware")
const mongoose = require('mongoose')
route.post('/register', async(req, res) => {
    try {
        const { name, email, password, password2 } = req.body;
        if (!name || !email || !password || !password2) {
            return res.status(400).json({ success: false, message: "Please fill all the fields" })
        }

        const existsEmail = await userModel.findOne({ email: email })
        if (existsEmail) {
            return res.status(400).json({ success: false, message: "Email already exists" })
        }
        if (password !== password2) {
            return res.status(400).json({ success: false, message: "password is not match" })
        }

        const bcryptPass = await bcrypt.hash(password, 10)
        const model = await userModel.create({ name, email, password: bcryptPass })
        await model.save()

        return res.status(201).json({ success: true, model })
    } catch (err) {
        return res.status(400).json({ success: false, message: err.message })
    }
})

route.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please fill all the fields" })
        }
        const model = await userModel.findOne({ email: email })
        if (!model) {
            return res.status(400).json({ success: false, message: "Invalid email or password" })
        }
        const isMatch = await bcrypt.compare(password, model.password)
        if (!isMatch) {
            return res.status(200).json({ success: true, message: "Invalid email or password" })
        }

        const option = {
            expiresIn: "1d"
        }
        const token = await jwt.sign({ _id: model._id, name: model.name }, process.env.SECRECT_KEY, option)

        return res.status(200).json({ success: true, message: "Login Successfully", token })
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message })
    }
})

// getUser
route.post('/:id', async(req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ success: false, message: "Please enter the id" })
    }
    const model = await userModel.findById(id).select("-password");
    if (!model) {
        return res.status(400).json({ success: false, message: "Invalid id" })
    }
    return res.status(201).json({ success: true, model })
})


// get all authors
route.get('/', async(req, res) => {
    try {
        const rawData = await userModel.find().select("-password")
        if (rawData.length == 0) {
            return res.status(400).json({ success: false, message: "No data found" })
        }
        return res.status(200).json({ success: true, rawData })

    } catch (error) {
        return res.status(400).json({ success: false, message: error.message })
    }
})


route.put('/edit-user', authMiddleware, async(req, res) => {
    try {
        const { name, email, currentPassword, newPassword, confirmNewPassword } = req.body;
        if (!name || !email || !currentPassword || !newPassword || !confirmNewPassword) {
            return res.status(400).json({ success: false, message: "Please fill all fields" })
        }
        const user = await userModel.findOne({ _id: req.user._id })
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" })
        }
        // check the the email does't exists
        const emailExists = await userModel.findOne({ email })
        if (emailExists && (emailExists._id != req.user.id)) {
            return res.status(400).json({ success: false, message: "Email already exists" })
        }
        // compare password 
        const validateUserPassword = await bcrypt.compare(currentPassword, user.password)
        if (!validateUserPassword) {
            return res.status(400).json({ success: false, message: "Invalid password" })
        }

        // compare new password
        if (newPassword != confirmNewPassword) {
            return res.status(400).json({ success: false, message: "New password and confirm new password does't match" })

        }
        // hash new password
        const hashPassword = await bcrypt.hash(newPassword, 10)

        // update user info in database
        const newInfo = await userModel.findByIdAndUpdate(req.user._id, { $set: { email, password: hashPassword } }, { new: true })
        console.log(newInfo)
        return res.status(200).json({ success: true, message: "User info updated successfully", data: newInfo })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
})


// get author
route.get('/authors', async(req, res) => {
    const model = await userModel.find().select("-password")
    res.send(model)
})



module.exports = route;