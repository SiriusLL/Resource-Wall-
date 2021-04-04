const { response } = require('express');
const express = require('express');
const router  = express.Router();

const resourceRoutes = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM resources`;
    console.log(query);
    db.query(query)
      .then(response => {
<<<<<<< HEAD
        const resources = response.rows[0];
=======
        const resources = response.rows;
>>>>>>> fbfd03e24c578aa3ca20657097258b29175efcab
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
<<<<<<< HEAD
    console.log(query, [user_id]);
    db.query(query, user_id)
=======
    //console.log(query, [user_id]);
    db.query(query, [req.params.user_id])
>>>>>>> fbfd03e24c578aa3ca20657097258b29175efcab
      .then(response => {
        const resources = response.rows[0];
        res.json({ resources });
      })
  })
  return router;
};

module.exports = resourceRoutes;
