const mysql = require('mysql2/promise');
const { URL } = require('url');

const connectionString = process.env.MYSQL_URL || process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('Missing MYSQL_URL / DATABASE_URL environment variable');
}

const url = new URL(connectionString);

const pool = mysql.createPool({
  host: url.hostname,
  user: url.username,
  password: url.password,
  database: url.pathname.slice(1), // Remove the leading '/'
  port: url.port || 3306,
  // optionally add ssl: true if needed
});

module.exports = pool;
