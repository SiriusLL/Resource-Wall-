const db = require('./db');

const getUserById = (id) => {
  return db.query(
    `SELECT * FROM users
    WHERE id = $1;`, [id])
  .then((response) => {
    console.log(response.rows, '<---------userById');
    return response.rows;
  });
};

const getUserByEmail = (email) => {
  return db.query(`
    SELECT *
    FROM resources
    WHERE email = $1;
    `, [email])
    .then((response) => {
      console.log('userByEmail----->', response)
      return response;
    });
};

module.exports = {
  getUserById,
  getUserByEmail
};
