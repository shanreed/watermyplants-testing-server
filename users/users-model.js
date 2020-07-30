const db = require("../data/db-config")
const bcrypt = require("bcryptjs")




module.exports = {
  add,
  find,
  findBy,
  findById,
  add,
  update,
  remove
};


function find() {
  return db("users").select("id", "username", "phone_number");
}

function findBy(filter) {
  return db("users").where(filter);
}

async function add(user) {
  const [id] = await db("users").insert(user);

  return findById(id);
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

function add(users) {
  return db("users")
    .insert(users)
    .then(ids => {
      return findById(ids[0]);
    });
}

function update(changes, id) {
  return db("users")
    .where({ id })
    .update(changes)
    .then(count => {
      return findById(id);
    });
}

function remove(id) {
  return db("users")
    .where({ id })
    .del();
}