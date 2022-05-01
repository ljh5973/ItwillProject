const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
//const jwt = require('jsonwebtoken');

const jwt = require('../middlewares/middlewares');

const db_config = require('../config/database.js');
const conn = db_config.init();

//const authUtil = require('../auth/authUtil').checkToken;
const authTest = require('../auth/authUtil');

const cookieParser = require('cookie-parser');
const mailer = require('../mailer');

// router.use(express.urlencoded({ extended: true }));
router.use(cookieParser());
//const {User} = require("../models/User");
db_config.connect(conn);


require('dotenv').config();

//로그인
router.post("/login", async (req, res) => {
    //db_config.connect(conn);
    console.log(req.body);
    console.log('hellow');

    let sql = "select * from users where email=?";
    let userEmail = req.body.email;
    let userPw = req.body.password;
    let params = [userEmail];
    //이메일 잘못 입력시 에러
    conn.query(sql, params, async (err, rows, fields) => {
        //비밀번호 암호화
        try {
            const same = await bcrypt.compareSync(userPw, rows[0].pw);    
            console.log(same);
            if(same) {
                const jwtToken = await jwt.sign(rows[0].email);
            res.cookie("w_auth", jwtToken.token).status(200).json({ loginSuccess: true, token: jwtToken.token, result: rows[0] });
            console.log('good');
            } else {
                console.log('bad');
                return res.json({ loginSuccess: false });       
            }
        } catch (error) {
            console.log('not good');
            return res.json({ loginSuccess: false });   
        }
    })


})


//회원가입
router.post('/register',(req, res) => {
    let sql = "insert into users values(?,?,?,?,?,?)";
    console.log(req.body);
    let userEmail = req.body.email;
    let userName = req.body.name;
    let userPw = req.body.password;
    let zip = req.body.zip;
    let userAddr = req.body.address;
    let userSecondAddr = req.body.secondaddr;

    conn.query('select * from users where email=?',  [userEmail], async(err, data) => {

        const encyptedPW = await bcrypt.hashSync(userPw, saltRounds);
        // console.log(encyptedPW);

        let params = [userEmail, userName, encyptedPW, userAddr, userSecondAddr, zip];

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

//로그아웃
router.get('/logout',(req, res) => {

     let token = req.cookies.w_auth;
     const verify =  jwt.verify(token);
     if(verify) {
         //로그아웃 클릭시 res.clearCookie로 구글 및 카카오 쿠키 삭제
        console.log('쿠키 제거 성공')
        res.clearCookie("w_auth").json({success: true,});
        //return res.status(200).json({ success: true,});
     } else {
         res.json({success: false});
     }
 });

 //회원정보 수정
router.put('/user_update', async (req, res) => {
    let token = req.cookies.w_auth;
    let info = await jwt.verify(token);

    console.log(req.body)
    if (token) {
        let email = info.name;
        let name = req.body.name;
        let pw = req.body.password;
        let addr = req.body.addr;
        let secondAddr = req.body.secondAddr;
        //비크립트 
        const encyptedPW = await bcrypt.hashSync(pw, saltRounds);
        console.log(encyptedPW);
        //회원정보 수정하면 TOKEN값도 다시 줘야함 ㅇㅋ? -> 안줘도 될듯? email값은 같으니까
        let param = [name, encyptedPW, addr, secondAddr, email];
        let sqlupdate = 'update users set name = ?, pw = ?, addr = ?, secondAddr = ? where email = ?'
        conn.query(sqlupdate, param, async (err, rows, fields) => {
            console.log(rows);
            console.log(email);
            if (!err) {
                //성공
                res.json({success: true});
            } else {
                //실패
                console.log(err);
                res.json({success: false});
            }
        });
    } else {
        res.json({success: false});
    }
})

// 회원정보 가져오기
router.get('/get_user', async(req, res) => {
    token = req.cookies.w_auth;
<<<<<<< Updated upstream
    // const verify = await jwt.verify(token);
        const  verify = await jwttest.decode(token);
        console.log(verify);
        if(verify!=null){
            let sql = 'select * from users where email = ?';
            let params = [verify.name];
            conn.query(sql, params, async (err, rows, fields) => {
                res.send(rows);
            });
        }
    
    
=======
    const verify = await jwt.verify(token);
    //console.log(verify.name)
    let sql = 'select * from users where email = ?';
    let params = [verify.name];
    conn.query(sql, params, async (err, rows, fields) => {
        res.send(rows);
    });
>>>>>>> Stashed changes
})

//회원탈퇴
//정말로 삭제하시겠습니까? client -> alert(yes)
router.delete('/delete', async(req,res) => {
    token = req.cookies.w_auth;
    const verify = await jwt.verify(token);

    let sql = 'delete from users where email = ?';
    params = [verify.name];
    conn.query(sql, params, async(err, rows) => {
        if(!err) {
            res.clearCookie('w_auth').json({delete: true})
        } else {
            res.json({delete: false});
        }
    })
})
 



//인증
const jwttest = require('jsonwebtoken');
router.get("/auth",  async (req, res) => {
    token = req.cookies.w_auth || req.cookies.auth;
    const verify = jwt.verify(token);
    //console.log(jwttest.decode(token).name);
    const check = await verify.then( res => {
        return res;
    })
    //console.log(check);
    try {
        //유효기간 체크
        if (check) {
            verify.then(verify => {
                res.json(verify);
            })
            console.log("권한이 있음");

        } else { //권한이 없으면 자동 로그아웃
            console.log("권한이 없음");
            verify.then(verify => {
                res.clearCookie('w_auth').json(verify);
            })
        }
    } catch {
        res.clearCookie('w_auth').json(verify);
    }



});

// 이메일 인증
router.post("/emailAuth", async(req,res)=>{
    console.log("받아온 이메일 :", req.body.email);
   
    mailer.mail(req.body.email);

    res.json("이메일 발송을 하였습니다.");
        
        // mail.send()
})
router.get("/mailModify/:info", async(req,res)=>{
    console.log(req.params.info);
    console.log(req.body);
})

// gooogleLogin
router.post('/googleLogin', function (req, res) {
    console.log(req.body.tokenId);
    res.cookie("w_auth", req.body.tokenId).status(200).json({loginSuccess:true});
});


router.post('/kakaotoken', (req, res) => {
    console.log(req.body);
    res.cookie("w_auth", req.body.id_token).status(200).json({loginSuccess: true, kakaoToken: id_token})
    //console.log("token", req.body.access_token);
  
})



router.post('/cartList', (req, res) => {
    console.log(req.body)
    let sql = 'select * from cart inner join product on cart.id = product.id where cart.email=?'
    let params = [req.body.email]
    conn.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
            console.log(rows);
        })

})

router.post('/cameraCartList', (req, res) => {
    console.log(req.body)
    let sql = 'select * from cart inner join camera on cart.id = camera.id where cart.email=?'
    
    let params = [req.body.email]
    conn.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
            console.log("cartList: ", rows);
        })
})

router.get('/cartDelete:id', (req, res) => {
   let sql = 'delete from cart where id = ?'
   let params = [req.params.id];
   conn.query(sql, params,
    (err, rows, fields) => {
        res.send(rows);
    })
})
 


module.exports = router;