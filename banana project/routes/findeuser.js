var express = require('express');
var router = express.Router();

var mysqlDB = require('../mysql-db');

router.get('/', function (req, res, next) {
    res.render('findeuser');
});

router.post('/', function (req, res, next) {
    var userId = req.body['userId'];
    var userEmail = req.body['mail'];
    if(userId == ''|| userEmail==''){
        res.send('<script type="text/javascript">alert("빈칸이 있습니다")</script><script>location.href="/findeuser";</script>');
    }
    else{
    mysqlDB.query('select * from user where id=?',[userId], function (err, rows, fields) {
        if (rows[0]=undefined) {
            res.send('<script type="text/javascript">alert("존재하지 않는 id 입니다//n 혹시 id를 모르신다면 id찾기를 눌러주세요.")</script><script>location.href="/findeuser";</script>');
        }
        else{
            mysqlDB.query('select * from user where id=? and mail=?',[userId,userEmail], function (err, rows, fields) {
                if (rows[0]!=undefined) {
                    res.send('<script type="text/javascript">alert("당신의 비밀번호는'+rows[0].password+'입니다")</script><script>location.href="/login";</script>');
                }
                else{
                    res.send('<script type="text/javascript">alert("mail이 일치하지 않습니다")</script><script>location.href="/findeuser";</script>');
            }
        });
    }
            });
        }
    });


module.exports = router;