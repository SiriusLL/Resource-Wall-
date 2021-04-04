const { response } = require('express');
const express = require('express');
const router  = express.Router();

const resourceRoutes = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM resources`;
    console.log(query);
    db.query(query)
      .then(response => {
        const resources = response.rows[0];
        res.json({ resources });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

<<<<<<< HEAD

module.exports = resourceRoutes
=======
module.exports = resourceRoutes;
>>>>>>> e93cc093cf6e7d86901b0ebf54b19bdfe9a4380f
