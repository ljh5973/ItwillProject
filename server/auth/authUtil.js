// const jwt = require('jsonwebtoken');
// const secretKey = require('../config/jwtConfig').secretKey;
// const authUtil = {
//     checkToken: async (req, res, next) => {
//         const token = req.cookies.w_auth;
//         // const kakaotoken = req.cookies.kakao;
//         console.log(token);

//         try {
//             decoded = jwt.verify(token, secretKey);
//         } catch (error) {
//             if(error.message === 'jwt expired') {
//                 console.log('유효기간 완료 토큰 입니다.');
//             } else if(error.message === 'invalid token') {
//                 console.log('유효하지 않은 토큰입니다.');
//             } else {
//                 console.log('유효하지 않은 토큰입니다.');
//             }
//         }
//         return decoded;
//         next();
//     }
// }

// module.exports = authUtil;
const jwt = require('jsonwebtoken');
const secretKey = require('../config/jwtConfig').secretKey;
const verifyToken = async (req, res, next) => {
    const token = req.cookies.w_auth;
    // const kakaotoken = req.cookies.kakao;
    console.log(token);
    var decoded;
    try {
        //decoded = jwt.verify(token, secretKey);
        decoded = await decodeToken(token);

        //next();
    } catch (error) {
        if (error.message === 'jwt expired') {
            console.log('유효기간 완료 토큰 입니다.');
            res.json({info: '유효기간 완료 토큰 입니다'})
        } else if (error.message === 'invalid token') {
            console.log('유효하지 않은 토큰입니다.');
            res.json({info: '유효하지 않은 토큰입니다.'})
        } else {
            console.log('유효하지 않은 토큰입니다.');
            res.json({info: error});
        }
    }
    return req.name = decoded.name;
    next();
};

function decodeToken(token) {
    return new Promise(
        (resolve, reject) => {
            jwt.verify(token, secretKey, (error, decoded) => {
                if(error) reject(error);
                resolve(decoded);
            })
        }
    )
}

module.exports = verifyToken;