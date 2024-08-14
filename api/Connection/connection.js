const {Pool} = require('pg')

const pool = new Pool ({
    user: 'postgres',
    host: 'localhost',
    database: 'notes_db',
    password: '010102',
    port: 5432
})

console.log(pool)

module.exports = pool;