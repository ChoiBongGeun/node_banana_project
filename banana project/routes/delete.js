//delete-account.js
var express = require('express');
var router = express.Router();

var mysql_db = require('../mysql-db');


router.get('/', function (req, res, next) {
    res.render('delete');
});

router.post('/', function (req, res, next) {
    var userId = res.locals.user.id
    var pw = req.body['pw'];
    if(pw == ''){
        res.send('<script type="text/javascript">alert("비밀번호를 입력하세요")</script><script>location.href="/delete";</script>');
    }
    else{
    mysql_db.query('select * from user where id=? and password=?', [userId, pw], function (err, rows, fields) {
        if (!err) {
            if (rows[0] != undefined) {
                mysql_db.query('delete from user where id=?', [userId], function (err, rows, fields) {
                    if (!err) {
                        req.session.destroy();
                        res.send('<script type="text/javascript">alert("탈퇴가 완료되었습니다 //n 다시 로그인 해주세요")</script><script>location.href="/login";</script>');
                    } else {
                        res.redirect('/delete');
                    }
                });
            } else {
                res.send('<script type="text/javascript">alert("비밀번호가 틀립니다")</script><script>location.href="/delete";</script>');
            }

        } else {
            res.send('<script type="text/javascript">alert("죄송합니다 오류가 발생했네요\\n관리자에게 신고해주세요")</script><script>location.href="/delete";</script>');
        }
    });
    }
});

module.exports = router;