module.exports = {
    add,
    getAll,
    findBy,
    findByUsername,
    editImage
}

const db = require('../data/db-config')

function add(user){
    return db('users').insert(user).returning('*')
}

function getAll(){
    return db('users').select('id', 'name', 'email', 'username', 'img_url')
}

function findBy(id){
    return db('users').where({id}).select('id', 'name', 'email', 'username', 'img_url')
}

function findByUsername(username){
    console.log('in the model', username)
    return db('users').where(username).returning('*')
}

function editImage(id, img_url){
    return db('users').where({id}).update(img_url).returning('img_url')
}