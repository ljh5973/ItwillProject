const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const mysql = require('mysql');
//const jwt = require('jsonwebtoken');

const jwt = require('../middlewares/middlewares');

const db_config = require('../config/database.js');
const conn = db_config.init();

const cookieParser = require('cookie-parser');
router.use(express.urlencoded({ extended: true }));
router.use(cookieParser());
//const {User} = require("../models/User");

require('dotenv').config();

router.post("/login", async (req, res) => {
    db_config.connect(conn);
    let sql = "select * from users where email=? and pw=?";
    let userEmail = req.body.email;
    let userPw = req.body.password;
    let params = [userEmail, userPw];
    conn.query(sql, params, async (err, rows, fields) => {
        //정보
        console.log(rows);
        if (rows.length > 0) { //로그인 성공
            //res.json({ loginSuccess: true });
            const jwtToken =  await jwt.sign(userEmail);
            // const verify =  await jwt.verify(jwtToken.token);

            res.cookie("w_auth", jwtToken.token).status(200).json({loginSuccess: true, token: jwtToken.token});

        } else { //로그인 실패
            res.status(404).json({ loginSuccess: false });
        }
    })
})


router.post('/register', (req, res) => {
    // 회원 가입 할때 필요한 정보들을 client에서 가져오면
    // 그것들을 데이터 베이스에 넣어준다.
    db_config.connect(conn);

    let sql = "insert into users values(?,?,?,?,?)";
    let userEmail = req.body.email;
    let userName = req.body.name;
    let userPw = req.body.password;
    let userAddr = req.body.address;
    let zip = req.body.zip;

    let params = [userEmail, userName, userPw, userAddr, zip];

    conn.query('select * from users where email=?', [userEmail], (err, data) => {
        if (data.length == 0) {
            console.log("회원가입 성공");
            conn.query(sql, params, (err, rows, fields) => {
                if (err) res.json({ success: false, err })
                return res.status(200).json({
                    success: true
                })
            })
        } else {
            console.log("회원가입 실패");
            res.json({ success: false, err })
        }
    })
});
// router.get('/payload', (req, res) => {
//    //db_config.connect(conn);
//     let token = req.cookies.w_auth;
//     const verify =  jwt.verify(token);
//     console.log(verify);
//     console.log(token);
//     return res.status(200).json({
//         success: true,
//     });
// });

router.get('/logout', (req, res) => {
    //db_config.connect(conn);

     let token = req.cookies.w_auth;
     const verify =  jwt.verify(token);
     //console.log(verify);
     console.log(token);
     if(token) {
         //로그아웃 클릭시 res.clearCookie로 구글 및 카카오 쿠키 삭제
        res.clearCookie("w_auth").json({success: true,});
        //return res.status(200).json({ success: true,});
        //res.redirect('/');
     } else {
         return res.json({success: false});
     }
 });

 


module.exports = router;