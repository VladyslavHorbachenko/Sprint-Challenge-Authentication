const knex = require('knex');

const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);



module.exports = {
    addUser,
    findByName,
    db
}
function addUser(user) {
    return db('users')
        .insert(user)
}
function findByName(username){
    return db('users')
        .where({username})
        .first();
}