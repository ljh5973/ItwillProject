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


//python 

// const result=spawn("python", ['product.py']);

// result.stdout.on('data',function(data){
//     console.log(data.toString());
// })

// result.stderr.on("data", function(data){
//     console.log(data.toString());
// })

const jwt = require('./middlewares/middlewares')

// app.get(`/`, async (req, res) => {
// 	const jwtToken = await jwt.sign();
//     const verify = await jwt.verify(jwtToken.token);
//     res.send(jwtToken.token +"       "+ verify);
// });


app.use(cors());
//api 미들웨어 등록
app.use('/api/users', api);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db_config = require('./config/database');
const conn = db_config.init();


//이메일만 받으면 되는건가?
app.get("/", (req, res) => {
    //console.log(req.token);
    //console.log("테스트");
    token = req.cookies.w_auth;
   //console.log(token);
    if(token) {
        const verify = jwt.verify(token.token);
        console.log(verify);
        //console.log("권한이 있음");
        //res.json({info: verify.name});
        res.send(verify);
    } else {
        console.log(verify);
        //console.log("권한이 없음");
        res.json({info: verify});
    }
});




app.listen(port, () => console.log(`서버 가동 포트번호: ${port}`));