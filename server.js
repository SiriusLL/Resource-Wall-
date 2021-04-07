// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
var cookieParser = require('cookie-parser');
// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect(() => {
  console.log('database connected');
});
// const getRating = require('../avgRating.js');
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
//const usersRoutes = require("./routes/users");
//const widgetsRoutes = require("./routes/widgets");
const resourceRoutes = require('./routes/resource-router');
const searchRoutes = require('./routes/search-router');
const likeRoutes = require('./routes/likes-router');
//const rateRoutes = require('./routes/ratings-router');
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/resources", resourceRoutes(db));
app.use("/resources/search",searchRoutes(db));
app.use("/resources/likes", likeRoutes(db));
//app.use("/resources/ratings", rateRoutes(db));
//app.use("/api/users", usersRoutes(db));
//app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.redirect("/resources");
});

app.get('/login/:id', (req, res) => {
  // set cookie to user_id in url
  res.cookie('user_id', req.params.id);
  // redirect the user somewhere
  res.redirect('/');
});

app.get("/login", (req, res) => {
  res.render("login");
});

// app.get("/createresource", (req, res) => {
//   res.render("create_resource");
// });

// app.get("/myresources", (req, res) => {
//   res.render("my_resources");
// });

app.listen(PORT, () => {
  console.log(`The Ultra Violet Resource Wall listening on port ${PORT}`);
});
