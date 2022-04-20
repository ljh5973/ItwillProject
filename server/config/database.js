const mysql = require('mysql');

var db_info = {
    host: "jinho-test.cuvbn89lbyyp.ap-northeast-2.rds.amazonaws.com",
    user: "admin",
    password:"rptdoa00!!",
    port:"3306",
    database:"login_lecture"
}

module.exports = {
    init: function () {
        return mysql.createConnection(db_info);
    },
    connect: function(conn) {
        conn.connect(function(err) {
            if(err) console.error('mysql connection error : ' + err);
            else console.log('mysql is connected successfully!');
        });
    },
}