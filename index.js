// require('dotenv').config()
const server = require('./api/server.js');


const port =8000;

// const port =process.env.PORT; // the port is being read from the .env file


server.listen(port, () => console.log(`\n*** Server Running on http://localhost:${port} ***\n`))