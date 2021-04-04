const { response } = require('express');
const express = require('express');
const router  = express.Router();

const resourceRoutes = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM resources`;
    console.log(query);
    db.query(query)
      .then(response => {
        const resources = response.rows;
        res.json({ resources });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/:user_id", (req, res) => {
    let query = `
      SELECT * FROM resources
      WHERE user_id = $1;`;
    //console.log(query, [user_id]);
    db.query(query, [req.params.user_id])
      .then(response => {
        const resources = response.rows[0];
        res.json({ resources });
      })
  })
  return router;
};

module.exports = resourceRoutes;
