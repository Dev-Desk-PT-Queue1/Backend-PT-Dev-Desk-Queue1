
exports.up = async function(knex) {
  await knex.schema.alterTable('tickets', table => {
      table.string("tried")
    })
};

exports.down = async function(knex) {
  await knex.schema.alterTable("tired", table )
    table.dropColumn("tried")
};
  


