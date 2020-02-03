const jwt = require('jsonwebtoken')
const Profile = require('../models/profile')

const auth = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisismynewcourse')
        const profile = await Profile.findOne({ _id: decoded._id, 'tokens.token': token })
        
        if(!profile){
            throw new Error()
        }
        req.token=token
        req.profile=profile
        next()
    }
    catch(e){
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth