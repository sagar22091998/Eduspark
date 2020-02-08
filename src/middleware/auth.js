const jwt = require('jsonwebtoken')
const Profile = require('../models/profile')

const auth = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        // const token = req.cookies['authToken']
        const decoded = jwt.verify(token, 'thisismynewproject')
        // const decoded = jwt.sign(req.headers['authorization'], 'thisismynewproject')
        const profile = await Profile.findOne({ _id: decoded._id, 'tokens.token': token })
        // const profile = await Profile.findOne({ _id: decoded._id })
        // console.log(token)
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