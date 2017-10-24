require('babel-core/register');
require("babel-polyfill");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = require("./router").default;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/', function (req, res, next) {
        res.header("Access-Control-Allow-Credentials", true);
        res.header("Access-Control-Allow-Origin", req.headers.origin);
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,X-Token");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", ' 3.2.1');
        res.header("Content-Type", "application/x-www-form-urlencoded");
        if(req.method == 'OPTIONS'){
            res.end("OK");
        }else
            next()
});

app.use("/getUserPosition",router.getUserPosition);

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`server running @${port}`);
});