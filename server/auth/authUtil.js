const jwt = require('jsonwebtoken');
const secretKey = require('../config/jwtConfig').secretKey;
const authUtil = {
    checkToken: async (req, res, next) => {
        const token = req.cookies.w_auth;
        console.log(token);
        // 토큰 없음
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
        next();
    }
}

module.exports = authUtil;