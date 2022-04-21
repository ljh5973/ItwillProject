// require("dotenv").config();
// const jwt = require('jsonwebtoken');

// const token = () => {
//     return{
//         access(id) {
//             return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRT, {
//                 expiresIn: "15m",
//             });
//         },
//         refresh(id) {
//             return jwt.sign({id}, process.env.REFRESH_TOKEN_SECRET , {
//                 expiresIn: "180 days",
//             });
//         }
//     }
// }

// module.exports = {
//     'secret' : '005c9780fe7c11eb89b4e39719de58a5',
//     secretKey : 'YoUrSeCrEtKeY', // 원하는 시크릿 ㅍ키
//     option : {
//         algorithm : "HS256", // 해싱 알고리즘
//         expiresIn : "30m",  // 토큰 유효 기간
//         issuer : "issuer" // 발행자
//     }
// }

const jwtConfig = {
    secretKey : 'JwTtOkEnTeSt',
    options : {
        algorithm : "HS256",
        expiresIn : "60m",
        //expiresIn : "10s", //10초 테스트용
        
        issuer : "issuer",
        // isSuccess: false,
    }
}

module.exports = jwtConfig;
