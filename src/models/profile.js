const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Course = require('./course')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    profileType: {
        type: String,
        required: true,
        trim: true
    },
    myCourses: {
        type: Array
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.virtual('courses', {
    ref: 'Course',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.generateAuthToken = async function () {
    const profile = this
    const token = jwt.sign({ _id: profile._id.toString() }, 'thisismynewproject', { expiresIn: '15 days' } )
    profile.tokens = profile.tokens.concat({token})
    await profile.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const profile = await Profile.findOne({email})

    if(!profile){
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, profile.password)

    if(!isMatch){
        throw new Error('Unable to login')
    }
    return profile
}

// Hashing password
userSchema.pre('save', async function (next) {
    const profile = this
    if(profile.isModified('password')){
        profile.password = await bcrypt.hash(profile.password, 8)
    }
    next()
})

userSchema.pre('remove', async function (next) {
    const profile = this 
    await Course.deleteMany({ owner: profile._id })
    next()
})

const Profile = mongoose.model('Profile', userSchema)

module.exports = Profile