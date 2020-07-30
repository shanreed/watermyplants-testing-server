const router = require("express").Router()
const users_model = require("../users/users-model")
const restricted = require("../middleware/restricted")


//GET users
router.get("/", restricted, (req, res) => {
    users_model.find()
      .then(users => {
        res.json(users);
      })
      .catch(error => res.send(error));
});

  
//GET user by ID
router.get("/:id", restricted, (req, res) => {
    const { id } = req.params;
    users_model.findById(id)
      .then(user => {
        if (user) {
          res.json(user);
        } else {
          res
            .status(404)
            .json({ message: "Could not find user with given ID." });
        }
      })
      .catch(error => {
        res.status(500).json({ message: "Failed to get user" });
      });
});  
  

//ADD user
router.post("/", restricted, (req, res) => {
    const userData = req.body;
  
    users_model.add(userData)
      .then(user => {
        res.status(201).json(user);
    })
    .catch(error => {
        res.status(500).json({ message: "Failed to add new user." });
    });
});  

  
// UPDATE User
router.put("/:id", restricted, (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    users_model.findById(id)
      .then(user => {
        if (user) {
          users_model.update(changes, id).then(updatedUser => {
            delete updatedUser.password;
            res.json(updatedUser);
          });
        } else {
          res.status(404).json({ message: "Could not find user with given Id." });
        }
      })
      .catch(error => {
        res.status(500).json({ message: "Failed to update user." });
      });
});  
  

//DELETE User
router.delete("/:id", restricted, (req, res) => {
    const { id } = req.params;
  
    users_model.remove(id)
      .then(deleted => {
        if (deleted) {
          res.json({ removed: deleted });
        } else {
          res.status(404).json({ message: "Could not find user with given Id." });
        }
      })
      .catch(error => {
        res.status(500).json({ message: "Failed to delete user." });
      });
});




module.exports = router

