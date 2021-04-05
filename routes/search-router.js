const { response } = require('express');
const express = require('express');
const router  = express.Router();

const searchRoutes = (db) => {
  router.get("/", (req, res) => {
    let query = `
      SELECT * FROM resources
      WHERE category LIKE %$${}%
      OR description LIKE %$${}%;`;
    console.log(query);
    db.query(query, [])
      .then(response => {
        console.log(response.rows,
          'flag')
          templateVars = { resources: response.rows}
          res.render('index', templateVars);
      })

  });

  return router;
};

module.exports = searchRoutes;
