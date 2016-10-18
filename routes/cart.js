var express = require('express');
var router = express.Router();
var Horseman = require('node-horseman');
var phantomjs = require('phantomjs');
var horseman = new Horseman({phantomPath: phantomjs.path});

var html_dir = './public/';
router.get('/add_to_cart', function (req, res) {
    res.sendfile(html_dir + 'addtocart.html');
});
router.post('/carts', function (req, res) {
    // deafult url is http://144.76.34.244:8080/magento/1.9/web/index.php/ ///
    horseman
            .userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0')
            .open('http://144.76.34.244:8080/magento/1.9/web/index.php/')
            .click('[title="Linen Blazer"]')
            .wait(5000)
            .select('select[id="attribute92"]', '22')
            .select('select[id="attribute180"]', '79')
            .click('[onclick="productAddToCartForm.submit(this)"]')
            .wait(5000)
            .screenshot('big.png')
            .catch(function (error) {
                res.json(error);
            })
            .finally(function () {
                res.json("Finished successfully");
            })
            .close();
});

module.exports = router;