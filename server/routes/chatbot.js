const express = require("express");
const router = express.Router();
const structjson = require("./structjson.js");
const uuid = require('uuid');
const config = require('../config/dev');
const {PythonShell} =require("python-shell");
// Text query Route



router.post('/textQuery', async (req, res) => {

    var result="";

    var option={
        mode:'text',
        pythonPath:'',
        pythonOptions:['-u'],
        scriptPath:'',
        args:[req.body.text]
    }
    
    PythonShell.run('./chat/chatbot.py', option,function(err,data){
        
        console.log(typeof(data));

        data= data.toString();
        data.replace('"', '');
        console.log('챗봇의 답변 %s 원', data);
        
        res.json(data);
    });
    
    }

)


router.post('/eventQuery', async (req, res) => {
        
        
    }

)







module.exports = router;