const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "todolist",
  password: "Ksv1404@",
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};



