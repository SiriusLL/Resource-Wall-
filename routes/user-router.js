const express = require('express');
const router = express.Router();
const {
  getUserById,
  getUserByEmail
} = require('../lib/user-queries');

// GET /users/:id/
router.get('/:id', (req, res) => {
  getUserById()
    .then((users) => {
      res.json(users);
    });
});

// GET /users/:email/
router.get('/:email', (req, res) => {
  getUserByEmail()
    .then((users) => {
      console.log(res.cookies, '<<<')
      res.json(users);
    });
});

module.exports = router;
