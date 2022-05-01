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

app.use(morgan('dev'));
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/chatbot', require('./routes/chatbot'));
app.use('/api/users', api);
app.use('/api/products', require('./routes/products'));
app.use('/api/boards', require('./routes/boards'));
app.use('/api/replys', require('./routes/replys'));

//const mail = require('./mailer');


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


// app.get("/auth/google/callback", async function (req, res) {
//     const displayName = await googleLogin(req.query.code);
//     console.log(displayName);

//     res.redirect("http://localhost:3000");
// });sudo  


// python 

// const computer=spawn("python3", ['product/product.py']);

// computer.stdout.on('data',function(data){
//     console.log(data.toString());
// })

// computer.stderr.on("data", function(data){
//     console.log(data.toString());
// })

// const camera=spawn("python3", ['product/camera.py']);

// camera.stdout.on('data',function(data){
//     console.log(data.toString());
// })

// camera.stderr.on("data", function(data){
//     console.log(data.toString());
// })

// app.use(cors());
// //api 미들웨어 등록


app.listen(port, () => console.log(`서버 가동 포트번호: ${port}`));