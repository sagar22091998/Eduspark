const mongoose = require('mongoose')

const Course = mongoose.model('Course', {
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Profile'
    }
})

module.exports = Course