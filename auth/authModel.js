module.exports = {
    add,
    getAll,
    findBy,
    findByUsername,
    findByEmail,
    editImage,
    findImage,
    update,
    remove
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

function findImage(id){
    return db('users').where({id}).select('img_url')
}

function findByUsername(username){
    return db('users').where(username).returning('*')
}


function findByEmail(email){
    return db('users').where({email}).returning('*')
}

function editImage(id, img_url){
    return db('users').where({id}).update(img_url).returning('img_url')
}

function remove(email){
    return db('users').where({email}).del().returning('*')
}

function update(id, user){
    return db('users').where({id}).update(user).returning('*')
}