
exports.up = function(knex) {
    return knex.schema.createTable('lists', tbl=>{
        tbl.increments();
        tbl.string('user_id').notNullable().index()
        tbl.string('name').notNullable().index()
        tbl.string('category').defaultTo('None').index()
    })

    .createTable('items', tbl=>{
        tbl.increments();
        tbl.string('name').notNullable()
        tbl.integer('quantity').defaultTo(1)

        tbl.integer('list_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('lists')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
            .index()
    })


    .createTable('options', tbl=>{
        tbl.increments();
        tbl.string('name').notNullable()

        tbl.integer('item_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('items')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
            .index()
    })
};

exports.down = function(knex) {
    return knex.schema 
        .dropTableIfExists('options')
        .dropTableIfExists('items')
        .dropTableIfExists('lists')
};
