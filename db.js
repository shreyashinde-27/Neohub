
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "homeservices",
  password: "Shreya2705",
  port: 5432,
});

module.exports = pool;
