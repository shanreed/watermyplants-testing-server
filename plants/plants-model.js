const db = require("../data/db-config")


module.exports = {
    find,
    findById,
    add,
    update,
    remove
  };
  

  function find() {
    return db("plants");
  }
  
  function findById(id) {
    return db("plants")
      .where({ id })
      .first();
  }
  
  function add(plant) {
    return db("plants")
      .insert(plant)
      .then(ids => {
        return findById(ids[0]);
      });
  }
  
  function update(changes, id) {
    return db("plants")
      .where({ id })
      .update(changes)
      .then(count => {
        return findById(id);
      });
  }
  
  function remove(id) {
    return db("plants")
      .where({ id })
      .del();
  }