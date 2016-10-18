var express = require('express');
var router = express.Router();
var Horseman = require('node-horseman');
var phantomjs = require('phantomjs');
var horseman = new Horseman({phantomPath: phantomjs.path});
require('node-import');
imports('config/index');

var html_dir = './public/';
router.get('/login_node_horseman', function (req, res) {
    res.sendfile(html_dir + 'first.html');
});

router.post('/login', function (req, res) {
    //default urls is http://144.76.34.244:8080/magento/1.9/web/customer/account/login  //
    var url_ = req.body.url;
    var username = req.body.username;
    var password = req.body.password;
    if (url_.length > 0 && username.length > 0 && password.length > 0) {
        horseman
                .userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0')
                .open(url_)
                .type('input[name="login[username]"]', username)
                .type('input[name="login[password]"]', password)
                .click('[name="send"]')
                .wait(5000)
                .url()
                .then(function (url) {
                    if (url == config.URL) {
                        res.json({status: "200", msg: 'login successfull', url: url});
                    } else {
                        res.json({status: "200", msg: "login failed"});
                    }
                })
                .screenshot('big.png')
                .close();
    } else {
        res.json({status: "500", msg: "invalid fields"});
    }
});
module.exports = router;