module.exports = {
    add,
    getAll,
    findByUserId,
    findByEmail,
    update,
    remove
}

const db = require('../data/db-config')

function add(list){
    console.log('from the model', list)
    return db('lists').insert(list).returning('*')
}

function getAll(){
    return db('users').returning('id, name, email, username, img_url')
}

function findByUserId(user_id){
    return db('lists').where({user_id})
    // .innerJoin('items', 'items.list_id', 'lists.id').returning('*')
    // .join('items', function() {
    //     this.on('items.list_id', '=', 'lists.id')
    //   })
    // .select('lists.id as list_id', 'user_id', 'items.id as item_id','items.name as item_name', 'lists.name as list_name', 'category', 'quantity')
}

function findByEmail(email){
    return db('users').where({email}).select('id')
}

function update(id, list){
    return db('lists').where({id}).update(list).returning('*')
}

function remove(id){
    return db('lists').where({id}).del().returning('*')
}