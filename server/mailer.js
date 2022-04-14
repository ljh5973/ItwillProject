const nodemailer = require("nodemailer");
const mailauth = require('./config/mail.json');

const mailConfig={
    mailId:mailauth.auth.user,
    mailPw:mailauth.auth.pass
}


// 메일 전송 객체

const send = async(data)=>{
    // 옵션 설정
    nodemailer.createTransport({
        //사용하고자 하는 서비스, gmail계정으로 전송
        service:"gmail",
        host:"smtp.gmail.com",
        port:587,
        secure:false,
        auth:{
            user:mailConfig.mailId,
            pass:mailConfig.mailPw
    
        }
    }).sendMail(data, function(err,info){
        if(err){
            console.log(err);
        }else{
            console.log(info);
            return info.response;
        }
    });

}


const content={
    from:"wlsgh6650@gmail.com",
    to:"ljh6650@naver.com",

    subject: "이메일 개발중",
    html: `<h1>이메일 인증</h1>
    <div>
      아래 버튼을 눌러 인증을 완료해주세요.
      <a href='http://localhost:3000/'>이메일 인증하기</a>
    </div>`,
text: "인증메일입니다.",
}

send(content);