const path = require('path')
const express = require('express')
// const cors = require('cors')
require('./src/db/mongoose')
const profileRouter = require('./src/routers/profile')
const courseRouter = require('./src/routers/course')
const bodyParser = require('body-parser')
const morgan = require('morgan')
// const cookieParser = require('cookie-parser')

const app = express()
const port = process.env.PORT || 5000

// const publicDirectoryPath = path.join(__dirname, './public' )

// app.use(express.static(publicDirectoryPath))

app.use(express.json())
// app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(profileRouter)
app.use(courseRouter)

// for getting different requests from the user to server
app.use(morgan('tiny'))
// app.use(cookieParser())

app.listen(port, () => {
    console.log(`Express server started at port: ${port}.` )
})