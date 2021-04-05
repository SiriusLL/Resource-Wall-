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

  router.get("/myresources", (req, res) => {
    const cookie = req.cookies.user_id;
    if (!cookie) {
      res.redirect('/login');
      return;
    }

    let query = `
      SELECT * FROM resources
      WHERE user_id = $1;`;

    db.query(query, [req.cookies.user_id])
      .then(response => {
        //console.log(response);
        //const resources = response.rows;
        //res.json({ resources });
        console.log(response.rows,
        'flag')
        templateVars = { resources: response.rows}
        res.render('my_resources', templateVars);
      });
  });
  //resources/create-resource ~~ create a resource
  router.get("/createresource", (req, res) => {
    const cookie = req.cookies.user_id;
    if (!cookie) {
      res.redirect('/login');
      return;
    }

    res.render('create_resource');
  });
  //
  router.post("/myresources", (req, res) => {
    const cookie = req.cookies.user_id;
    if (!cookie) {
      res.redirect('/login')
    }
    console.log(req.body)
    console.log(res.body)
    let query = `
      INSERT INTO resources (title, description, category, resource, user_id)
      VALUES ($1, $2, $3, $4, $5);`;
    //console.log(query, [user_id]);
    const createSubmit = req.body;
    db.query(query, [createSubmit.title, createSubmit.description, createSubmit.category, createSubmit.resource, req.cookies.user_id])
      .then(response => {
        const resources = response.rows[0];
        res.json({ resources });
      });
  });


  return router;
};

module.exports = resourceRoutes;
