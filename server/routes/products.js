const express = require("express");
const router = express.Router();

const db_config = require('../config/database.js');
const conn = db_config.init();


router.get('/product', (req, res) => {
    // db_config.connect(conn);
    conn.query(
        "select * from product order by id desc", (err, rows, fields) => {
            res.send(rows);
        }
    )
});

// api/users 들어가는 있는 거는 users.js(router)에 넣어야 하는데 작동 안될 거에요. 되나?
const multer = require('multer');
const { verify } = require("jsonwebtoken");
const e = require("express");
const upload = multer({dest: './upload'});
router.use('/image', express.static('./upload'));
router.post('/productUpload', upload.single('image'), (req, res) => {
    // db_config.connect(conn);
    let sql = 'insert into product values (null, ?, ?, ?, ?,?)';
    let product_name= req.body.product_name;
    let product_desc = req.body.product_desc;
    let product_price = req.body.product_price;
    let email = 'test@naver.com';
    console.log(req.body);
    let product_image = 'http://localhost:5000/api/products/image/' + req.file.filename;
    let params = [product_name, product_desc, product_price, product_image, email];
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
    let product_image = 'http://localhost:5000/api/products/image/' + req.file.filename;
    let params = [product_name, product_desc, product_price, product_image, req.params.id];
    conn.query(sql, params,
        (err, rows, fields) =>{
            res.send(rows);
            console.log(rows);
        })
})


module.exports = router;