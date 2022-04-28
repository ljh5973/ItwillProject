const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');

const db_config = require('../config/database.js');
const conn = db_config.init();

router.get('/read/:bno', (req,res) => {
    bno = req.params.bno;
    sql = 'select * from replys where bno = ?'
    
    conn.query(sql, bno, (err, rows) => {
        res.json(rows);
    });
});

router.post('/insert', (req, res) => {
    let bno = req.body.bno;
    let comment = req.body.comment;
    let email = req.body.email;

    params = [bno, comment, email]
    sql = 'insert into replys (bno, comment, email) values(?,?,?)'
    conn.query(sql, params, (err, rows) => {
        if(!err) {
            res.json({success : true});
        } else {
            res.json({success : false});
        }
    });
})


module.exports = router;