const { response } = require('express');
const express = require('express');
const router  = express.Router();



const commentRoutes = (db) => {

  router.get("/", (req, res) => {
    const cookie = req.cookies.user_id;
    if(!cookie) {
      res.redirect('/login')
    }
    const templateVars = {resource: {}}
    res.render('comments', templateVars)
    console.log('&&&&', req.body);
    console.log('####', res.body);
  })


  router.post("/", (req, res) => {
    console.log(req.cookies.user_id);
    const cookie = req.cookies.user_id;
    if (!cookie) {
      res.redirect('/login')
    }
    console.log('*****', req.body)
    console.log('^^^^^',res.body)
    let query = `
      INSERT INTO comments (resource_id, user_id, comment)
      VALUES ($1, $2, $3);`;
    console.log(query, req.cookies.user_id);
    db.query(query, [req.body.res_id, req.body.u_id, req.body.comments])
      .then(response => {
        res.redirect('/resources/comments');
      });
  });


  return router;
};


module.exports = commentRoutes;
