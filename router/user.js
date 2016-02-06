var express = require('express');
var User = require('../models/user');
var router = express.Router();

// 该路由使用的中间件
//router.use(function timeLog(req, res, next) {
//    console.log('Time: ', Date.now());
//    next();
//});

// 定义网站主页的路由
router.post('/signup', function(req, res) {
    var userObj = req.body;
    var _user = new User({
        name: userObj.name,
        password: userObj.password
    });

    _user.save(function(err, user) {
        if (err) {
            console.log('a' + err);
        } else {
            res.redirect('/');
        }
    });

});

// 定义 about 页面的路由
router.post('/signin', function(req, res) {
    res.send('About birds');
});

module.exports = router;