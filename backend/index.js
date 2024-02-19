require('dotenv').config({ path: "./.env" })
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connectDB');
const userRoute = require('./routes/userRoute');
const bodyParser = require('body-parser');
const postRoute = require('./routes/postRoute');
const expressfileupload = require('express-fileupload')

const multer = require('multer');
const authMiddleware = require('./middleware/authMiddleware');
const userModel = require('./Models/userModel');
const fs = require('fs');
const path = require('path');
const app = express();
const { v4: uuid } = require('uuid')
connectDB();

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(expressfileupload())
app.use("/uploads", express.static(__dirname + "/uploads"))


app.use("/v1/api/users", userRoute)
app.use('/v1/api/posts', postRoute)


app.post('/change-avatar', authMiddleware, async(req, res) => {
    try {
        if (!req.files.avatar) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            })
        }
        const user = await userModel.findById(req.user._id)
        if (user.avatar) {
            fs.unlink(path.join(__dirname, '..', 'uploads', user.avatar), (err) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "Error while deleting file"
                    })
                }
            })
        }
        const { avatar } = req.files;

        if (avatar.size > 50000) {
            return res.status(400).json({
                sucess: false,
                message: "File size too large"
            })
        }

        let fileName;
        fileName = avatar.name;
        let splitFilename = fileName.split(".")
        let newFileName = splitFilename[0] + uuid() + "." + splitFilename[splitFilename.length - 1]
        avatar.mv(path.join(__dirname, "..", "uploads", newFileName), async(err) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Error while uploading file"
                })
            }

            const uploadAvatar = await userModel.findByIdAndUpdate(req.user._id, { avatar: newFileName }, { new: true })
            if (!uploadAvatar) {
                return res.status(400).json({
                    success: false,
                    message: "Error while uploading file"
                })
            }
            return res.status(200).json({
                success: true,
                message: "File uploaded successfully",
            })
        })


    } catch (error) {

    }
});




app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT)
})