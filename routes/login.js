var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  res.send('post login');
});
router.get('/', function(req, res, next) {
  res.send('get login');
});

module.exports = router;