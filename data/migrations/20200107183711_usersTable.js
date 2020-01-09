
exports.up = async function(knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id');
    table.string('firstName').notNullable();
    table.string('lastName').notNullable();
    table.string('username', 50).notNullable().unique();
    table.string('password').notNullable();
    table.string('email').notNullable().unique();
  })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('users')
};
