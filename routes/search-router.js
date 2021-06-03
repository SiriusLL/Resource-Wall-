const { response } = require("express");
const express = require("express");
const router = express.Router();

const searchRoutes = (db) => {
  router.post("/", (req, res) => {
    //console.log(req.body, 'reqBooty@@@@@@@@@@@')

    let query = `
    SELECT *
    FROM resources
    WHERE LOWER( category ) LIKE $1
    OR LOWER( description ) LIKE $1;`;
    //console.log('query:',query);
    //console.log(res.body, 'reqBooty@@@@@@@@@@@')
    db.query(query, ["%" + req.body.search.toLowerCase() + "%"])
      .then((response) => {
        //console.log(response.rows,'flag')
        templateVars = { resources: response.rows };
        res.render("index", templateVars);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  });

  return router;
};

module.exports = searchRoutes;
