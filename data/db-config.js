const knex = require('knex')
const knexConfig = require('../knexfile')

const dbEngine = process.env.DB || "development"

module.exports = knex(knexConfig[dbEngine])