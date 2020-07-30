const router = require("express").Router()
const users_model = require("../users/users-model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const secret = require("../config/secrets")

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username
    }
    const options = {
        expiresIn: "1d"
    }

    return jwt.sign(payload, secret.jwtSecret, options)
}

router.post("/register", async (req, res, next) => {
    const { username, password, phone_number } = req.body
    console.log(req.body)
    const hash = bcrypt.hashSync(password, 10)
    console.log(hash)
    users_model.add({
    username,
    phone_number,
    password: hash,
  })
  .then(data => {
    console.log(data)
    res.status(200).json({ 
      username,
      phone_number,
      password: hash})
  })
  .catch(err => {
    console.log("Erorr", err)
    res.status(500).json({ message: `Something went really poorly` })
  })

})



router.post('/login', (req, res) => {
  let { username, password } = req.body;
  users_model.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user); // new line
        // the server needs to return the token to the client
        // this doesn't happen automatically like it happens with cookies
        res.status(200).json({
          message: `Welcome ${user.username}!, have a token...`,
          token, // attach the token as part of the response
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router