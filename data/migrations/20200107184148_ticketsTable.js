
exports.up = async function(knex) {
    await knex.schema.createTable('tickets', table => {
        table.increments();
        table.string('title', 255).notNullable();
        table.string('description', 255).notNullable();
        table.string('category', 255).notNullable();
        table.boolean('resolved').notNullable().defaultTo(false);
        table.boolean('assigned').notNullable().defaultTo(false);
        table.integer('assigned_user').defaultTo(0);
        table.string('created_at').notNullable().defaultTo(knex.fn.now());
        table.integer('user_id').unsigned().references('id').inTable('users');
    })
  };
  
  exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('tickets')
  };
  