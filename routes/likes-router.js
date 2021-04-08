const { response } = require('express');
const express = require('express');
const router  = express.Router();
const Hashids = require('hashids/cjs')
const hashids = new Hashids('', 10)


const likeRoutes = (db) => {

  router.post("/", (req, res) => {
    const cookie = req.cookies.user_id;
    if (!cookie) {
      res.redirect('/login')
    }
    console.log(req.body)
    //console.log(res.body)
    let query = `
      INSERT INTO likes (resource_id, user_id, liked, conflictors)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (conflictors)
      DO NOTHING
      RETURNING *
      ;`;
    //console.log(query, [user_id]);
    const conflictor = hashids.encode(req.body.resource_id) + req.cookies.user_id
    console.log(conflictor)
    db.query(query, [req.body.resource_id, req.cookies.user_id, req.body.liked, conflictor])
      .then(response => {
        //console.log('response********************',response,'))))')
        const resources = response.rows[0];
        res.json({ resources });
      });
  });


  return router;
};


module.exports = likeRoutes;
