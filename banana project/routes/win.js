//password-change.js
var express = require('express');
var router = express.Router();

var mysql_db = require('../mysql-db');


router.get('/', function (req, res, next) {
    if(!res.locals.user){
        res.send('<script type="text/javascript">alert("잘못된 접근입니다 로그인하고 이용하세요")</script><script>location.href="/login";</script>');
    }
    else{
    var userId = res.locals.user.id;
    var userscore = res.locals.user.score;
    userscore += 1;
    req.session.user = {id:userId,score:userscore};
    mysql_db.query("update user set score = ? where id=?", [userscore, userId], function (err, rows, fields) {
             if (!err) {
                res.send('<script>location.href="/main";</script>');
                 } else {
                     res.send('error : ' + err);
                 }
                });
            } 
    });


module.exports = router;