const db = require('../data/dbConfig')

module.exports = {
    
    getUserbyID: (id) => {
        return db('users').where({ id }).first();
    },

    getAllUsers: () => {
        return db('users');
    },

    register: async (user) => {
        const [id] = await db('users').insert(user);
        return db('users').where({ id }).first();
    },

    login: (username) => {
        return db('users').where({username}).first();
    }
}