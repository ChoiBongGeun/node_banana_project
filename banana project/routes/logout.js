var express = require('express');
var router = express.Router();
var mysql_db = require('../mysql-db');
router.get('/', function (req, res, next) {
    if(!res.locals.user){
        res.send('<script type="text/javascript">alert("잘못된 접근입니다 로그인하고 이용하세요")</script><script>location.href="/login";</script>');
    }
    else{
    mysql_db.query("update user set score=? where id=?", [res.locals.user.score, res.locals.user.id], function (err, rows, fields) {
        if (!err) {
           req.session.destroy();
               res.redirect('/login');
            } else {
                res.send('<script type="text/javascript">alert("죄송합니다 오류가 발생했네요\\n관리자에게 신고해주세요")</script><script>location.href="/ranking";</script>');
            }
           });
        }
});

module.exports = router;