
exports.up = function(knex) {
    return knex.schema.createTable('oktausers', tbl => {
        tbl.increments();
        tbl
        tbl.string('email').notNullable().index()
        tbl.string('img_url')
    })
  
};

exports.down = function(knex) {
  
};
