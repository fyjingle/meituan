const http = require("http");

function apiRequest(host,path,method,data,okCallback,errorCallback){

    
    let option = {
        hostname:host,
        method:method,
        path:path,
        data:data,
        headers:'application/x-www-form-urlencoded'
    };
    const client = http.request(option,
        (res) =>{
            res.on("error",(error) => {
                errorCallback(error);
            });
            let chunks = [];
            res.on("data", (chunk) =>{
                chunks.push(chunk);
            });
            res.on("end",() =>{
                let body = Buffer.concat(chunks);
                let response = body.toString();
                res.setEncoding("utf-8");
                okCallback(response,res.statusCode);
            })
        });
    client.end();

}
module.exports = apiRequest;