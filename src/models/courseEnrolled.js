const mongoose = require('mongoose');

const coursesEnrolledSchema = mongoose.Schema ({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Profile'
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Course'
    },
    videosCompleted: {
        type: Number,
        default: 0
    },
    courseCompleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('CourseEnrolled', coursesEnrolledSchema);