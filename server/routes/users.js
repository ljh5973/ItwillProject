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
db_config.connect(conn);

require('dotenv').config();
router.post("/login", async (req, res) => {
    //db_config.connect(conn);
    let sql = "select * from users where email=? and pw=?";
    let userEmail = req.body.email;
    let userPw = req.body.password;
    let params = [userEmail, userPw];
    conn.query(sql, params, async (err, rows, fields) => {
        //정보
        //console.log(rows);
        if (rows.length > 0) { //로그인 성공
            //res.json({ loginSuccess: true });
            console.log(rows[0].name);
            const jwtToken =  await jwt.sign(rows[0].name);
            const verify =  await jwt.verify(jwtToken.token);
            console.log(verify);
            res.cookie("w_auth", jwtToken).status(200).json({loginSuccess: true, token: jwtToken.token, result: rows[0]});

        } else { //로그인 실패
            res.status(404).json({ loginSuccess: false });
        }
    })
})


router.post('/register', (req, res) => {
    // 회원 가입 할때 필요한 정보들을 client에서 가져오면
    // 그것들을 데이터 베이스에 넣어준다.
    // db_config.connect(conn);

    let sql = "insert into users values(?,?,?,?,?,?)";
    console.log(req.body);
    let userEmail = req.body.email;
    let userName = req.body.name;
    let userPw = req.body.password;
    let zip = req.body.zip;
    let userAddr = req.body.address;
    let userSecondAddr = req.body.secondaddr;



    let params = [userEmail, userName, userPw, userAddr,userSecondAddr, zip];

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
     const verify =  jwt.verify(token.token);
     //console.log(verify);
     console.log(token);
     if(token) {
         //로그아웃 클릭시 res.clearCookie로 구글 및 카카오 쿠키 삭제
         console.log('쿠키 제거 성공')
        res.clearCookie("w_auth").json({success: true,});
        //return res.status(200).json({ success: true,});
        //res.redirect('/');
     } else {
         return res.json({success: false});
     }
 });

 

router.get('/product', (req, res) => {
    // db_config.connect(conn);
    conn.query(
        "select * from product", (err, rows, fields) => {
            res.send(rows);
        }
    )
});

// api/users 들어가는 있는 거는 users.js(router)에 넣어야 하는데 작동 안될 거에요. 되나?
const multer = require('multer');
const upload = multer({dest: './upload'});
router.use('/image', express.static('./upload'));
router.post('/productUpload', upload.single('image'), (req, res) => {
    // db_config.connect(conn);
    let sql = 'insert into product values (null, ?, ?, ?, ?)';
    let product_name= req.body.product_name;
    let product_desc = req.body.product_desc;
    let product_price = req.body.product_price;
    let product_image = 'http://localhost:5000/image/' + req.file.filename;
    let params = [product_name, product_desc, product_price, product_image];
    conn.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        }
        )
})

router.delete('/product/:id', (req, res) => {
    // db_config.connect(conn);
    let sql = 'delete from product where id= ?';
    let params = [req.params.id];
    conn.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        })
})

router.get('/productDetail/:id', (req, res) =>{
    // db_config.connect(conn);
    let sql = 'select * from product where id= ?';
    let params = [req.params.id];
    conn.query(sql, params,
        (err, rows, fields) =>{
            res.send(rows);
            console.log(rows);
        })
})

router.get('/productUpdate/:id', (req, res) => {
    // db_config.connect(conn);
    let sql = 'select * from product where id= ?';
    let params = [req.params.id];
    conn.query(sql, params,
        (err, rows, fields) =>{
            res.send(rows);
            console.log(rows);
        })
})

router.post('/productUpdate/:id', upload.single('image'), (req, res) => {
    // db_config.connect(conn);
    console.log(req.body);
    let sql = 'update product set product_name=?, product_desc=?, product_price=?, product_image=? where id=?';
    let product_name= req.body.product_name;
    let product_desc = req.body.product_desc;
    let product_price = req.body.product_price;
    let product_image = 'http://localhost:5000/image/' + req.file.filename;
    let params = [product_name, product_desc, product_price, product_image, req.params.id];
    conn.query(sql, params,
        (err, rows, fields) =>{
            res.send(rows);
            console.log(rows);
        })
})

 


module.exports = router;