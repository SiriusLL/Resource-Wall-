const { response } = require('express');
const express = require('express');
const router  = express.Router();

const searchRoutes = (db) => {
  router.get("/", (req, res) => {
    let query = `
      SELECT * FROM resources
      WHERE category LIKE $1
      OR description LIKE $2;`;
    console.log(query);
    console.log(req.body, 'reqBooty@@@@@@@@@@@')
    db.query(query, [req.body, req.body])
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
