const { response } = require('express');
const express = require('express');
const router  = express.Router();

const likeRoutes = (db) => {

  router.post("/", (req, res) => {
    const cookie = req.cookies.user_id;
    if (!cookie) {
      res.redirect('/login')
    }
    console.log(req.body)
    console.log(res.body)
    let query = `
      INSERT INTO likes (resource_id, user_id)
      VALUES ($1, $2);`;
    //console.log(query, [user_id]);
    const createSubmit = req.body;
    db.query(query, [, req.cookies.user_id])
      .then(response => {
        const resources = response.rows[0];
        res.json({ resources });
      });
  });


  return router;
};


module.exports = likeRoutes;
