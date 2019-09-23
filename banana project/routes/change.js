//password-change.js
var express = require('express');
var router = express.Router();

var mysql_db = require('../mysql-db');


router.get('/', function (req, res, next) {
    res.render('change');
});

router.post('/', function (req, res, next) {
    if(!res.locals.user){
        res.send('<script type="text/javascript">alert("잘못된 접근입니다 로그인하고 이용하세요")</script><script>location.href="/login";</script>');
    }
    else{
    var userId = res.locals.user.id;
    var pw = req.body['pw'];
    var pwconfirm = req.body['pwconfirm'];
    var mail = res.locals.user.mail;
    if (userId ==''||pw ==''||pwconfirm ==''||mail ==''){
            res.send('<script type="text/javascript">alert("다 입력하지 않았습니다")</script><script>location.href="/changecheck";</script>');
        }
    else{
    if (pw == pwconfirm) {
    mysql_db.query("update user set password=? where id=? and mail=?", [pw,userId,mail], function (err, rows, fields) {
             if (!err) {
                req.session.destroy();
                res.send('<script type="text/javascript">alert("수정완료되었습니다 다시 로그인 해주세요")</script><script>location.href="/login";</script>');
                 } else {
                    res.send('<script type="text/javascript">alert("죄송합니다 오류가 발생했네요\\n관리자에게 신고해주세요")</script><script>location.href="/changecheck";</script>');
                 }
                });
            } 

         else {
            res.send('<script type="text/javascript">alert("죄송합니다 오류가 발생했네요\\n관리자에게 신고해주세요")</script><script>location.href="/changecheck";</script>');
        }
    }
    }
    });


module.exports = router;