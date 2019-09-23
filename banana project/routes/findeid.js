var express = require('express');
var router = express.Router();

var mysqlDB = require('../mysql-db');

router.get('/', function (req, res, next) {
    res.render('findeid');
});

router.post('/', function (req, res, next) {
    var userEmail = req.body['mail'];
    if( userEmail==''){
        res.send('<script type="text/javascript">alert("빈칸이 있습니다")</script><script>location.href="/findeid";</script>');
    }
    else{
    mysqlDB.query('select * from user where mail=?',[userEmail], function (err, rows, fields) {
        if (rows[0]!=undefined) {
            res.send('<script type="text/javascript">alert("당신의 id는'+rows[0].id+'입니다")</script><script>location.href="/login";</script>');
        }
        else{
            res.send('<script type="text/javascript">alert("존재하지 않는 mail 입니다.")</script><script>location.href="/findeid";</script>');
        }
        
            });
        }
    });


module.exports = router;