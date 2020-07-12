
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
      tbl.increments();
      tbl.string('name').notNullable()
      tbl.string('email').notNullable().unique().index();
      tbl.string('username').notNullable().unique().index();
      tbl.string('password').notNullable();
  })

    .createTable('friends', tbl => {
        tbl.increments();

        tbl.integer('user1')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
            .index()

        tbl.integer('user2')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
            .index()

    })
};

exports.down = function(knex) {
    return knex.schema 
        .dropTableIfExists('friends')
        .dropTableIfExists('users');
};
