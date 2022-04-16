const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const api = require("./routes/users");
const cors = require('cors');
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



app.listen(port, () => console.log(`서버 가동 포트번호: ${port}`));