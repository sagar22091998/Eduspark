const path = require('path')
const express = require('express')
require('./src/db/mongoose')
const profileRouter = require('./src/routers/profile')
const courseRouter = require('./src/routers/course')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, './public' )

app.use(express.static(publicDirectoryPath))

app.use(express.json())
app.use(profileRouter)
app.use(courseRouter)

app.listen(port, () => {
    console.log(`Express server started at port: ${port}.` )
})
