const { response } = require('express');
const express = require('express');
const router  = express.Router();

const rateRoutes = (db) => {

  router.post("/", (req, res) => {
    console.log('hello______________');
    console.log('params', req.body)
    const cookie = req.cookies.user_id;
    if (!cookie) {
      console.log('between11')
      res.redirect('/login')
      return;
    }
    // console.log(req.body)


    let query = `
      INSERT INTO ratings (rating, resource_id, user_id)
      VALUES ($1, $2, $3)
      ;`;


    db.query(query, [req.body.rating, req.body.rate_resource_id, req.body.rate_user_id])
      .then(response => {
          console.log('response********************',response,'))))')
          const resources = response.rows[0];
          // res.json({ resources });
          res.redirect('/resources')
      });
  });

  router.post("/avg", (req, res) => {

    console.log('params', req.body)
    const cookie = req.cookies.user_id;
    if (!cookie) {
      console.log('between11')
      res.redirect('/login')
      return;
    }
    console.log('----->',req.body)


    let query = `
      SELECT avg(rating) as avgRatings
      FROM ratings
      WHERE resource_id = $1
      ;`;


    db.query(query, [req.body.id])
      .then(response => {
          // console.log('response********************',response,'))))')
          const resources = response.rows[0];
          // res.json({ resources });
          // const templateVars = {finalAvg: response.rows[0].avgratings}
          res.send(resources)
      });
  });


  return router;
};


module.exports = rateRoutes;
