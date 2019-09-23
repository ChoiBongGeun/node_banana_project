/*join.js*/
var express = require('express');
var router = express.Router();

var mysqlDB = require('../mysql-db');

router.get('/', function (req, res, next) {
    res.render('join');
});

router.post('/', function (req, res, next) {
    var userId = req.body['userId'];
    var userpassword = req.body['userpassword'];
    var pwconfirm = req.body['pwconfirm'];
    var userEmail = req.body['mail'];
    if(userId == ''|| userpassword==''|| pwconfirm==''||userEmail==''){
        res.send('<script type="text/javascript">alert("빈칸이 있습니다")</script><script>location.href="/join";</script>');
    }
    else{
    mysqlDB.query('select * from user where id=? ',[userId], function (err, rows, fields) {
        if (rows[0]!=undefined) {
            res.send('<script type="text/javascript">alert("id 중복됩니다")</script><script>location.href="/join";</script>');
        }
        else{
            mysqlDB.query('select * from user where mail=? ',[userEmail], function (err, rows, fields) {
                if (rows[0]!=undefined) {
                    res.send('<script type="text/javascript">alert("mail 중복됩니다\\n혹시 다시 가입하시는건가요?\\n저희 시스템이 한개의 email에 한 id만 허용하고 있습니다.\\n죄송하지만 가지고 있던 id를 탈퇴하고 다시 시도해주세요")</script><script>location.href="/join";</script>');
                }
                else{
    if (userpassword == pwconfirm) {
        mysqlDB.query('insert into user(id,password,mail,score) values(?,?,?,0)', [userId, userpassword,userEmail], function (err, rows, fields) {
            if (!err) {
                res.redirect('/login');
            } else {
                res.send('<script type="text/javascript">alert("죄송합니다 오류가 발생했네요\\n관리자에게 신고해주세요")</script><script>location.href="/join";</script>');
            }
        });
    }else{
        res.send('<script type="text/javascript">alert("password not match!")</script><script>location.href="/join";</script>');
    }
} 
            });
        }
    });
}
});

module.exports = router;