const express = require('express')
const server = express()
//importing middleware
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const cookie_parser = require('cookie-parser')

const db = require("../data/db-config")
const authenticate = require('../middleware/auth-middleware')

//ENV
const dotenv = require("dotenv")
dotenv.config()


//middleware
server.use(express.json())
server.use(cookie_parser())
server.use(helmet())
server.use(cors())
server.use(morgan())

//import server routes
const authRouter = require("../auth/auth-router")
const userRouter = require("../users/users-router")
const plantRouter = require("../plants/plants-router")

server.use("/api/auth", authRouter)
server.use("/api/users", authenticate, userRouter)
server.use("/api/plants", plantRouter)


server.get('/', (req, res) => {
    res.json({
        message: "Water My Plants App"
    })
})

server.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    if (err) {
        return res.status(statusCode).json({
            message: err.message || "Something went wrong"
        })
    }
    next()
})



module.exports = server