const express = require('express');
const helmet = require('helmet');
// const cors = require('cors');
// const shortid = require('shortid')
// var morgan = require('morgan')


// const hubsRouter = require('../hubs/hubs-router.js');
// const messagesRouter = require('../messages/messages-router.js');
// const authRouter = require("../auth/auth-router.js");
// const session = require('express-session');
// const KnexSessionStore = require('connect-session-knex')(session);

const server = express();




//Builtin
server.use(express.json());



//Third Party Middleware
// server.use(cors())
server.use(helmet());
// server.use(morgan('dev'));

//Custom Middleware
server.use(addName);
// server.use(lockout);
// const sessionConfig = {
//   name: 'monkey',
//   secret: 'keep it secret, keep it safe!',// used to make sure the cookie is valid
//   cookie: {
//     maxAge: 1000 * 30,// 30 seconds
//     secure: false,   // can i send cookie over a http connection, must be set to true during production, can be dynamically changed
//     httpOnly: true,  // when true, js can't get to the cookie
//   },
//   // we should only save sessions when user allows it
//   resave: false,// recreate session even if it has not change
//   saveUninitialized: false, //set cookie automatically, only be true if user has opted in, can be dynamically changed
//   store: new KnexSessionStore({
//     knex: require('../data/dbConfig.js'), // configured instance of knex
//     tablename: 'sessions', // table that will store sessions inside the db, name it anything you want
//     sidfieldname: 'sid', // column that will hold the session id, name it anything you want
//     createtable: true, // if the table does not exist, it will create it automatically
//     clearInterval: 1000 * 60 * 60, // time it takes to check for old sessions and remove them from the database to keep it clean and performant
//   }),
// }


// server.use(session(sessionConfig));

// server.use("/auth", authRouter);
// server.use('/api/hubs', hubsRouter); 
// server.use('/api/hubs/messages', messagesRouter); 

server.get('/', (req, res) => {
    const nameInsert = (req.name) ? `${req.name}` : '';
    res.json({hello: `HELLO THERE ${nameInsert}`})
})

function addName(req, res, next) {
    req.name = req.name || "Shannon";
    next();
}

// function lockout(req, res, next) {
//     res.status(403).json({message: 'api lockout'})
// }

module.exports = server;