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
    let sql = 'insert into product values (null, ?, ?, ?, ?, ?)';
    let product_name= req.body.product_name;
    let product_desc = req.body.product_desc;
    let product_price = req.body.product_price;
    let email = req.body.email;
    console.log("??????", req.body);
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

router.post('/cameraUpload', upload.single('image'), (req, res) => {
    db_config.connect(conn);
    let sql = 'insert into camera values (null, ?, ?, ?, ?, ?)';
    let camera_name= req.body.camera_name;
    let camera_desc = req.body.camera_desc;
    let camera_price = req.body.camera_price;
    let email = req.body.email;
    console.log(req.body);
    let camera_image = 'http://localhost:5000/api/products/image/' + req.file.filename;
    let params = [camera_name, camera_desc, camera_price, camera_image, email];
    conn.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        }
        )
})

router.get('/camera', (req, res) => {
   // db_config.connect(conn);
   conn.query(
       "select * from camera order by id desc", (err, rows, fields) => {
           res.send(rows);
       }
   )
});

router.get('/cameraDetail/:id', (req, res) =>{
   // db_config.connect(conn);
   let sql = 'select * from camera where id= ?';
   let params = [req.params.id];
   conn.query(sql, params,
       (err, rows, fields) =>{
           res.send(rows);
           console.log(rows);
       })
})

router.delete('/camera/:id', (req, res) => {
   // db_config.connect(conn);
   let sql = 'delete from camera where id= ?';
   let params = [req.params.id];
   conn.query(sql, params,
       (err, rows, fields) => {
           res.send(rows);
       })
})

router.post('/cameraUpdate/:id', upload.single('image'), (req, res) => {
   // db_config.connect(conn);
   console.log(req.body);
   let sql = 'update camera set camera_name=?, camera_desc=?, camera_price=?, camera_image=? where id=?';
   let camera_name= req.body.camera_name;
   let camera_desc = req.body.camera_desc;
   let camera_price = req.body.camera_price;
   let camera_image = 'http://localhost:5000/api/products/image/' + req.file.filename;
   let params = [camera_name, camera_desc, camera_price, camera_image, req.params.id];
   conn.query(sql, params,
       (err, rows, fields) =>{
           res.send(rows);
           console.log(rows);
       })
})

router.post('/cart', (req, res) => {
   console.log(req.body)
   let sql = 'insert into cart values(?, ?, null, ?)';
   let id = req.body.id;
   let email = req.body.email;
   let num = req.body.num;
   let params = [id, email, num]
   conn.query(sql, params,
       (err, rows, fields) => {
           res.send(rows);
           console.log(rows);
       })
})

router.post('/cartNum', (req, res) => {
   console.log(req.body);
   let sql = 'select * from cart where email = ?'
   let params = req.body.email;
   conn.query(sql, params,
       (err, rows, fields) => {
           res.send(rows);
       })
})

router.get('/updateProduct/:id', (req, res) => {
    let sql = 'select * from product where id=?';
    let params = req.params.id;

    conn.query(sql, params, 
        (err, rows, fields) => {
            res.send(rows);
        }
        )
})

router.get('/updateCamera/:id', (req, res) => {
    let sql = 'select * from camera where id = ?'
    let params = req.params.id;
    conn.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        }
        )
})


module.exports = router;