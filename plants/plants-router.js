const express = require("express");
const helmet = require("helmet");
const router = express.Router();

const plants_model = require("./plants-model");


router.get("/", (req, res) => {
  plants_model.find()
    .then(plants => {
      res.json(plants);
    })
    .catch(error => {
      res.status(500).json({ message: "Can't get plants." });
    });
});


router.get("/:id", (req, res) => {
  const { id } = req.params;
  plants_model.findById(id)
    .then(plant => {
      if (plant) {
        res.json(plant);
      } else {
        res
          .status(404)
          .json({ message: "Could not find plant with given ID." });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Can't get plant." });
    });
});

router.post("/", (req, res) => {
  const plantData = req.body;

  plants_model.add(plantData)
    .then(plant => {
      res.status(201).json(plant);
    })
    .catch(error => {
      res.status(500).json({ message: "Failed to add new plant." });
    });
});


router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  plants_model.findById(id)
    .then(plant => {
      if (plant) {
        plants_model.update(changes, id).then(updatedPlant => {
          res.json(updatedPlant);
        });
      } else {
        res
          .status(404)
          .json({ message: "Could not find plant with given Id." });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Failed to update plant." });
    });
});


router.delete("/:id", (req, res) => {
  const { id } = req.params;

  plants_model.remove(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res
          .status(404)
          .json({ message: "Could not find plant with given Id." });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Failed to delete plant." });
    });
});



module.exports = router;