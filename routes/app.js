const express = require('express')
const router = express.Router()
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

var url = "mongodb://localhost:27017/EduSpark-Profiles"

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
    if(err) throw err
    console.log('Database Created!')
    db.close()
})
