var express = require('express');
var User = require('../models/user')
var Post = require('../models/post')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // if(user);
    console.log("admin router:")
        // console.dir(req.session)
    console.log("req.params" + req.params);
    User.getAll(function(err, users) {
        console.dir(users);
        var uitems = [];
        users.forEach(function(user, index) {
            var temp = {};
            console.dir('user' + user)
            console.dir('username' + user.name)

            temp.name = user.name;
            temp.email = user.email;
            console.dir("temp " + index + ":" + temp.name);

            uitems.push(temp)
        })
        console.dir("uitems:" + uitems);
        Post.getAll(function(err, posts) {
            res.render('admin', {
                title: 'Express',
                items: users,
                posts: posts
            });

        })
    })
});


module.exports = router;
