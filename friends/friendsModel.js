module.exports = {
    add,
    getAll,
    findByUserId,
    findByUsername,
    update,
    remove
}

const db = require('../data/db-config')

function add(friend){
    return db('friends').insert(friend).returning('*')
}

function getAll(){
    return db('friends').returning('*');
}

function findByUserId(user1){
    return db('friends').where({user1})
    .join('users', 'users.id', 'friends.user2')
    .select('friends.user2 as friend_id', 'users.username as friend_name')
}

function findByUsername(username){
    console.log('in the model', username)
    return db('users').where({username}).returning('*')
}

function update(id, friend){
    return db('friends').where({id}).update(friend).returning('*')
}

function remove(user1, user2){
    return db('friends').where({user1}).andWhere({user2}).del().returning('*')
}