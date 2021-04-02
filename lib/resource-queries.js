const db = require('./db');

const getResources = () => {
  return db.query('SELECT * FROM resources;')
  .then((response) => {
    console.log(response.rows, '<---------resources');
    for (row of response.rows) {
      console.log(row);
    }
    return response.rows[0];
  });
};

const getResourcesByUserId = (id) => {
  return db.query(`
    SELECT title
    FROM resources
    WHERE user_id = $1;
    `, [id])
    .then((response) => {
      console.log('user_id----->', response)
      return response.rows[0];
    });
};

module.exports = {
  getResources,
  getResourcesByUserId
};
