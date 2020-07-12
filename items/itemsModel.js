module.exports = {
    add,
    findByListId,
    update,
    remove
}

const db = require('../data/db-config')

function add(item){
    return db('items').insert(item).returning('*')
}

function findByListId(list_id){
    return db('items').where({list_id}).returning('*')
    .join('lists', 'lists.id', 'list_id').returning('*')
    .select('lists.id as list_id', 'user_id', 'items.id as item_id','items.name as item_name', 'lists.name as list_name', 'category', 'quantity')
}

function update(id, item){
    return db('items').where({id}).update(item).returning('*')
}

function remove(id){
    return db('items').where({id}).del().returning('*')
}

