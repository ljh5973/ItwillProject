// exports.verifyToken = (req, res, next) => {
//     try {
//       req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
//       return next();
//     } catch (error) {
//       if (error.name === 'TokenExpiredError') { // 유효기간 초과
//         return res.status(419).json({
//           code: 419,
//           message: '토큰이 만료되었습니다',
//         });
//       }
//       return res.status(401).json({
//         code: 401,
//         message: '유효하지 않은 토큰입니다',
//       });
//     }
//   };

//   if (rows.length > 0) { //로그인 성공
//     jwt.sign({
//         email: userEmail,
//     },
//     config.secrect,
//     {
//         expiresIn: "15m",
//     },
//     (err, token) => {
//         if (err) {
//             console.log(err);
//             res.status(401).json({success:false, errormessage:'token sign fail'});
//         } else {
//             res.json({success:true, accessToken:token});
//         }
//     }
//     )
//     res.json({ loginSuccess: true });

const randToken = require('rand-token');
const jwt = require('jsonwebtoken');
const secretKey = require('../config/jwtConfig').secretKey;
const options = require('../config/jwtConfig').options;

module.exports = {
    sign: async (info) => {
        const payload = {
            name: info,
        };
        console.log('payload: ' + payload);
        const result = {
            
            token: jwt.sign(payload, secretKey, options),
            refreshToken: randToken.uid(256),
            isSuccess: true,
            payload,
            
            
        };
        
        return await result;
    },
    verify: async (token) => {
        let decoded;
        try {
            decoded = jwt.verify(token, secretKey);
        } catch (error) {
            if(error.message === 'jwt expired') {
                console.log('유효기간 완료 토큰 입니다.');
            } else if(error.message === 'invalid token') {
                console.log('유효하지 않은 토큰입니다.');
            } else {
                console.log('유효하지 않은 토큰입니다.');
            }
        }

        return decoded;
    }


}