const express = require('express');
const router = express.Router();
const {
  getResources,
  getResourcesByUserId
} = require('../lib/resource-queries');

// GET /resources/
router.get('/', (req, res) => {
  getResources()
    .then((resources) => {
      res.json(resources);
    });
});

// GET /resources/:user_id/
router.get('/:user_id', (req, res) => {
  console.log(req.params,'params')
  getResourcesByUserId(req.params.user_id)
    .then((resources) => {
      console.log('resRout-->')
      res.json(resources);
    });
})
module.exports = router;
