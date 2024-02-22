const { Schema, model } = require('mongoose');
const validator = require('validator')


const postModel = new Schema({
    title: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return validator.isLength(value, { min: 10, max: 100 })
            },
            message: "Title must be between 10 and 100 characters"
        }
    },
    category: {
        type: String,
        enum: ['Agriculture', 'Business', 'Education', 'Entertainment', 'Art', 'Investment',
            'Uncategoized', 'Weather', "lifes"
        ],
        message: 'Invalid category',
    },
    description: {
        type: String,
        validate: {
            validator: function(value) {
                return validator.isLength(value, { min: 10, max: 1000 })
            }
        }
    },
    thumbnail: {
        type: String
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

}, { timestamps: true })

module.exports = model('post', postModel)