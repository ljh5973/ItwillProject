const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const api = require("./routes/users");
const cors = require('cors');

const spawn=require("child_process").spawn;

const logger = require('./config/logger');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const { google } = require("googleapis");
const googleClient = require('./config/google.json');

app.use(morgan('tiny'));
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const googleConfig
    = {
    clientId: googleClient.web.client_id,
    clientSecret: googleClient.web.client_secret,
    redirect: googleClient.web.redirect_uris[0]
}

const scopes = [
    'https://www.googleapis.com/auth/plus.me'
];


const oauth2Client = new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
);

//   google + api 를 사용하기 위해 google+ api 에 대한 정보 입력

const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes
});
function getGooglePlusApi(auth) {
    return google.plus({ version: 'v1', auth });
}

// 실질적으로 로그인해서 정보를 불러올 코드 작성
// 리프레시토큰 엑세스토큰 displayName과 id를 얻어와본다.
// async function googleLogin(code) {
//     const { tokens } = await oauth2Client.getToken(code);
//     oauth2Client.setCredentials(tokens);
//     oauth2Client.on('tokens', (token) => {
//         if (token.refresh_token) {
//             console.log("리프레시 토큰 : ", tokens.refresh_token);
//         }
//         console.log("액세스 토큰 : ", tokens.access_token);
//     });
//     const plus = getGooglePlusApi(oauth2Client);
//     const res = await plus.people.get({ userId: 'me' });
//     console.log(`Hello ${res.data.displayName}! ${res.data.id}`);
//     return res.data.displayName;
// }

// app.get('/googleLogin', function (req, res) {
//     res.redirect(url);
// });

// app.get("/auth/google/callback", async function (req, res) {
//     const displayName = await googleLogin(req.query.code);
//     console.log(displayName);

//     res.redirect("http://localhost:3000");
// });


// python 

// const result=spawn("python", ['product.py']);

// result.stdout.on('data',function(data){
//     console.log(data.toString());
// })

// result.stderr.on("data", function(data){
//     console.log(data.toString());
// })


app.use(cors());
//api 미들웨어 등록
app.use('/api/users', api);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    connection.query("select * from users", (err, rows, fields) => {
        res.send(rows);
    });
});


app.get('/api/users/product', (req, res) => {
    connection.query(
        
        "select * from product", (err, rows, fields) => {
            res.send(rows);
        }
    )
});

// api/users 들어가는 있는 거는 users.js(routes)에 넣어야 하는데 작동 안될 거에요. ㅠ
const multer = require('multer');
const upload = multer({dest: './upload'});
app.use('/image', express.static('./upload'));
app.post('/api/users/productUpload', upload.single('image'), (req, res) => {
    let sql = 'insert into product values (null, ?, ?, ?, ?)';
    let product_name= req.body.product_name;
    let product_desc = req.body.product_desc;
    let product_price = req.body.product_price;
    let product_image = 'http://localhost:5000/image/' + req.file.filename;
    let params = [product_name, product_desc, product_price, product_image];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        }
        )
})

app.delete('/api/users/product/:id', (req, res) => {
    let sql = 'delete from product where id= ?';
    let params = [req.params.id];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        })
})

app.get('/api/users/productDetail/:id', (req, res) =>{
    let sql = 'select * from product where id= ?';
    let params = [req.params.id];
    connection.query(sql, params,
        (err, rows, fields) =>{
            res.send(rows);
            console.log(rows);
        })
})

app.get('/api/users/productUpdate/:id', (req, res) => {
    let sql = 'select * from product where id= ?';
    let params = [req.params.id];
    connection.query(sql, params,
        (err, rows, fields) =>{
            res.send(rows);
            console.log(rows);
        })
})

app.post('/api/users/productUpdate/:id', upload.single('image'), (req, res) => {
    console.log(req.body);
    let sql = 'update product set product_name=?, product_desc=?, product_price=?, product_image=? where id=?';
    let product_name= req.body.product_name;
    let product_desc = req.body.product_desc;
    let product_price = req.body.product_price;
    let product_image = 'http://localhost:5000/image/' + req.file.filename;
    let params = [product_name, product_desc, product_price, product_image, req.params.id];
    connection.query(sql, params,
        (err, rows, fields) =>{
            res.send(rows);
            console.log(rows);
        })
})



app.listen(port, () => console.log(`서버 가동 포트번호: ${port}`));