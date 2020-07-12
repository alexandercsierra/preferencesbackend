
exports.up = function(knex) {
    return knex.schema.table('users', tbl => {
        tbl.string('img_url')
    })
};

exports.down = function(knex) {
    return knex.schema.table('users', tbl => {
        tbl.dropColumn('img_url')
    })
};
