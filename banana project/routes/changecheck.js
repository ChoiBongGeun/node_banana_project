var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('change', { res: res});
});

module.exports = router;