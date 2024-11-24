require('dotenv').config(); // Load .env for local development
const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false // Enable SSL in production
});

module.exports = pool;