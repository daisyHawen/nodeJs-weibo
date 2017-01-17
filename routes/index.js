var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
// exports.index = function(req, res) {
//     res.render('index', { title: 'Express' });
// };
// exports.user = function(req, res) {};
// exports.post = function(req, res) {};
// exports.reg = function(req, res) {};
// exports.doReg = function(req, res) {};
// exports.login = function(req, res) {};
// exports.doLogin = function(req, res) {};
// exports.logout = function(req, res) {};

module.exports = router;
