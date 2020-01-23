const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
    number: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 10,
        validate(value){
            if(!validator.isNumeric(value)){
                throw new Error('Mobile Number is invalid!')
            }
        }
    },
    address: {
        type: String,
        default: 'Gwalior,India',
        trim: true
    },
    profileType: {
        type: String,
        required: true,
        trim: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.methods.generateAuthToken = async function () {
    const profile = this
    const token = jwt.sign({ _id: profile._id.toString() }, 'thisismynewcourse')
    profile.tokens = profile.tokens.concat({token})
    await profile.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await Profile.findOne({email})

    if(!user){
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user
}

// Hashing password
userSchema.pre('save', async function (next) {
    const profile = this
    if(profile.isModified('password')){
        profile.password = await bcrypt.hash(profile.password, 8)
    }
    next()
})

const Profile = mongoose.model('Profile', userSchema)

module.exports = Profile