const express = require("express");
const router = express.Router();
const uuid = require('uuid');
const config = require('../config/dev');
const { PythonShell } = require("python-shell");
// Text query Route
const db_config = require('../config/database.js');
const conn = db_config.init();



router.post('/computer', async (req, res) => {


    const option = {
        mode: 'text',
        pythonPath: '',
        pythonOptions: ['-u'],
        scriptPath: '',
        args: [req.body.text],
        encoding: 'utf-8'
    }

    PythonShell.run('./chat/computer.py', option, function (err, result) {

        console.log(result);
        let data = result[0].replace(`b\'`, '').replace(`\'`, '');

        let buff = Buffer.from(data, 'base64'); 
        
        let text = buff.toString('utf-8');

       
        // console.log(typeof(text));
        // text=text.replace("품명",'').replace('가격','').replaceAll(",", "").replace(/\d{5,10}원$/g,"").trim();
        text=text.replace("품명",'').replace('가격','').trim();
        
        text = text.substr(3);
      
        res.json(text);
        // var patten=/[원$]/;
        // text=text.match(patten);
        // console.log(typeof(data));
        // console.log("일단 첫번째 데이터 값", data);
        // data= data.toString();
        // data.replace('"', '');
        // console.log('챗봇의 답변', data);

    });

}

)


router.post('/answer', async (req, res) => {

    console.log(req.body.text);
    const option = {
        mode: 'text',
        pythonPath: '',
        pythonOptions: ['-u'],
        scriptPath: '',
        args: [req.body.text],
        encoding: 'utf-8'
    }
    PythonShell.run('./chat/answer.py', option, function (err, result) {
        
        let data = result[0].replace(`b\'`, '').replace(`\'`, '');

        let buff = Buffer.from(data, 'base64'); 
        
        let text = buff.toString('utf-8');
        text=text.substr(5,16);
        console.log(text);
        console.log(typeof(text));


        res.json(text);
    })
}
)
router.post('/notebook', async (req, res) => {

    console.log(req.body.text);
    const option = {
        mode: 'text',
        pythonPath: '',
        pythonOptions: ['-u'],
        scriptPath: '',
        args: [req.body.text],
        encoding: 'utf-8'
    }
    PythonShell.run('./chat/notebook.py', option, function (err, result) {
        console.log(result);
        // let data = result[0].replace(`b\'`, '').replace(`\'`, '');

        // let buff = Buffer.from(data, 'base64'); 
        
        // let text = buff.toString('utf-8');
        // console.log(text);
        // console.log(typeof(text));


        // res.json(text);
    })
}
)
router.post('/camera', async (req, res) => {


    const option = {
        mode: 'text',
        pythonPath: '',
        pythonOptions: ['-u'],
        scriptPath: '',
        args: [req.body.text]
    }

    PythonShell.run('./chat/camera.py', option, await function (err, result) {
        console.log("왜 또 널값만 뜨냐고");
        console.log(result);
        // let data = result[0].replace(`b\'`, '').replace(`\'`, '');

        // let buff = Buffer.from(data, 'base64'); 
        
        // let text = buff.toString('utf-8');

        // text=text.replace("품명",'').replace('가격','').trim();
        // // text = text.substr(3);

        // console.log(text);
        // console.log(typeof(text))


        // res.json(text);
    });

}

)

router.post('/eventQuery', async (req, res) => {


}

)

module.exports = router;