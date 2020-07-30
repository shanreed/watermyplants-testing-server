exports.up = async function(knex) {
    await knex.schema.createTable("users", table => {
        table
            .increments("id")
        table
            .string("phone_number")
            .notNullable()
            .unique()
        table
            .string("username")
            .notNullable()
            .unique()
        table.string("password").notNullable()
    })
    
}

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("users")
   
}