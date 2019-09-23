var express = require('express');
var router = express.Router();
var mysql_db = require('../mysql-db');


router.get('/', function (req, res, next) {
    let session = req.session;

    res.render('login', {
        session : session
    });
});

router.post('/', function (req, res, next) {
    var userId = req.body['userId'];
    var userpassword = req.body['userpassword'];
    if(userId=='' || userpassword == ''){
        res.send('<script type="text/javascript">alert("id 비밀번호를 입력하세요")</script><script>location.href="/login";</script>');
    }
    else{
    mysql_db.query('select * from user where id=? ',[userId], function (err, rows, fields) {
        if (rows[0]!=undefined) {
            mysql_db.query('select * from user where id=? and password=?',[userId,userpassword], function (err, rows, fields) {
            if (rows[0]!=undefined) {
                req.session.user = {id:userId,score:rows[0].score,mail:rows[0].mail};
                res.redirect('/main');
            } else {
                res.send('<script type="text/javascript">alert("비밀번호가 틀렸어요")</script><script>location.href="/login";</script>');
            }
        });
        } else {
            res.send('<script type="text/javascript">alert("id 없어요 회원가입하세요")</script><script>location.href="/login";</script>');
        }
    });
}
});

module.exports = router;