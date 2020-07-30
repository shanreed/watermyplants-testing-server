const jwt = require("jsonwebtoken")
const secret = require("../config/secrets")

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization
        const decoded = jwt.verify(token, secret.jwtSecret)

        req.users = decoded.id
        next()
    } catch (err) {
        res.status(401).json({ message: "You shall not pass!" })
    }
}