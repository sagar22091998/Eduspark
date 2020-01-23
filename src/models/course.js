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
    approved: {
        type: Boolean,
        default: false,
        required: true
    }
})

module.exports = Course