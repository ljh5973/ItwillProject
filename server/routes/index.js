const express = require("express");
const router = express();

router.get('/test', (req, res) => {
    res.send({test: "Test"});
});
// router.post('/api/users/register', (req, res) => {
//     // 회원 가입 할때 필요한 정보들을 client에서 가져오면
//     // 그것들을 데이터 베이스에 넣어준다.
    
//     console.log('api test')
//     connection.query("select * from users", (err, rows, fields) => {
//         res.send(rows);
//         console.log(rows);
//     });
// })


module.exports = router;