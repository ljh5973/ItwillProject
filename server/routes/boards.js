const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');

const db_config = require('../config/database.js');
const conn = db_config.init();

//게시글 전체조회
router.get('/read', (req, res) => {
    //let sql = 'select * from boards order by bno desc';
    let sql = 'select bno, title, content, regdate, view_cnt, like_cnt, filename, email, (select count(*) from replys where bno=b.bno) as cnt from boards as b order by bno desc';
    conn.query(sql, (err, rows) => {
        res.json(rows);
    })
});

//게시글 bno조회
router.get('/read/:bno', (req, res) => {
    let sql = 'select bno, title, content, regdate, view_cnt, like_cnt, filename, email, (select count(*) from replys where bno=b.bno) as cnt from boards as b where bno = ?';
    //var url = require('url');
    let bno = req.params.bno;

    conn.query(sql, bno, (err, rows) => {
        res.json(rows);
    })
})

//게시글 post
router.post('/create', (req, res) => {
    let sql = 'insert into boards values (null, ?,?,CURRENT_TIMESTAMP, 0,0,0, ?, ?)';
    let bno = req.body.bno;
    let title = req.body.title;
    let content = req.body.content;
    let regdate = req.body.regdate;
    let view_cnt = req.body.view_cnt;
    let like_cnt = req.body.like_cnt;
    let filename = req.body.filename;
    let email = req.body.email;
    console.log(req.body);
    params = [title, content, filename ,email];

    conn.query(sql, params, (err, rows) => {
        if (!err) {
            res.json(rows);
        } else {
            res.json(err);
        }
    })
})

//게시글 수정
// TODO: email 일치할 시 보여주기
router.put('/update/:bno', async (req, res) => {
    //이메일 받기
    let token = req.cookies.w_auth;
    try {
        let email = await jwt.decode(token).name;
    } catch {
        return res.json({ success: false });
    }
    let sql = 'update boards set title = ?, content= ?, regdate =  CURRENT_TIMESTAMP, filename = ? where bno = ?'
    let bno = req.params.bno;
    let title = req.body.title;
    let content = req.body.content;
    let filename = req.body.filename;
    let params = [title, content, filename, bno];
    conn.query(sql, params, (err, rows) => {
        console.log(rows);
        if (rows) {//성공
            res.json({ success: true });
        } else { //실패
            res.json({ success: false });
        }
    })
});

//게시글 삭제
//TODO: email 일치할 시 삭제
router.delete('/delete/:bno', (req, res) => {
    bno = req.params.bno;

    let sql = 'delete from boards where bno = ?'
    conn.query(sql, bno, (err, rows) => {
        if(!err) {
            res.json({success: true});    
        } else {
            res.json({success: false});
        }
        
    });
    

});

//댓긋 수 upcount
router.get('/count', (req, res) => {
    
    let sql = 'select count(replys.bno) as count from boards inner join replys on boards.bno = replys.bno';
    conn.query(sql, (err, rows) => {
        if (!err) {
            res.json(rows);
        } else {
            res.json(err);
        }
    })
})


//조회수 upcount
router.put('/view/:bno', (req, res) => {
    
    bno = req.params.bno;

    let sql = 'update boards set view_cnt= view_cnt+1 where bno = ? '

    conn.query(sql, bno, (err, rows ) => {
        
        if(!err) {
            res.json({success: true});    
        } else {
            res.json({success: false});
        }
    })
})

//좋아요
router.post('/like/:bno', (req, res) => {
    let type = req.body.type;
    bno = req.params.bno;
    console.log(bno);
    let sql = '';
    if(type === true) {
        sql = 'update boards set like_cnt= like_cnt-1 where bno = ? '
    } else {
        sql = 'update boards set like_cnt= like_cnt+1 where bno = ? '
    }
    
    conn.query(sql, bno, (err, rows) => {
        if(!err) {
            res.json({success: true});    
        } else {
            console.log(err);
            res.json({success: false});
        }
    })
})



const multer = require("multer");
const path = require("path");
router.use('/image', express.static('./upload'));

let storage = multer.diskStorage({ //multer disk storage settings
    destination: function(req, file, callback) {
        callback(null, "upload/")
    },
    filename: function(req, file, callback) {
        let extension = path.extname(file.originalname);
        let basename = path.basename(file.originalname, extension);
        callback(null, basename + "-" + Date.now() + extension);
    }
});


//특정 파일형식만 저장하기 위해서는 fileFilter함수를 사용한다. 
const upload = multer({ //multer settings
    storage: storage,
    fileFilter: function(req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== '.xlsx' && ext !== '.pdf' && ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only .xlsx .pdf .png, .jpg .gif and .jpeg format allowed!'))
        }
        callback(null, true)
    },
}).any(); //.any()는 전달받는 모든 파일을 받는다. 파일배열은 req.files에 저장되어 있다. 

router.post('/files', (req, res, next) => {
    const reqFiles = [];
    try {
        upload(req, res, function(err) {
            if (err) {
                return res.status(400).send({ //에러발생하면, 에러 메시지와 빈 파일명 array를 return한다. 
                    message: err.message,
                    files: reqFiles
                });
            }

            for (var i = 0; i < req.files.length; i++) { //저장된 파일명을 차례로 push한다. 
                reqFiles.push(req.files[i].filename)
            }

            res.status(200).send({ //저장 성공 시, 저장성공 메시지와 저장된 파일명 array를 return한다. 
                message: "Uploaded the file successfully",
                files: reqFiles
            });
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: `Could not upload the file: ${err}`,
            files: reqFiles
        });
    }
});

module.exports = router;