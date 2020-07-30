require('dotenv').config()

const server = require("./api/server")

const PORT = process.env.PORT || 3501

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})