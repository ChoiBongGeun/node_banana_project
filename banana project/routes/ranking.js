/*show-all-data.js*/
var express = require('express');
var router = express.Router();

var mysqlDB = require('../mysql-db');

router.get('/', function (req, res, next) {
    if(!res.locals.user){
        res.send('<script type="text/javascript">alert("잘못된 접근입니다 로그인하고 이용하세요")</script><script>location.href="/login";</script>');
    }
    else{
    mysqlDB.query('select id,mail,score from user order by score desc limit 0,10', function (err, rows) {
        if (!err) {
            console.log('rows :' +  rows);
            res.render('list', { title:'ranking List', rows: rows ,res: res});
        } else {
            console.log('query error : ' + err);
            res.send(err);
        }
    });
}
});

module.exports = router;