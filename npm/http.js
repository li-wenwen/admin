let http = require('http');
let fs = require('fs');
let path = require('path');
let mime = require('mime');
http.createServer(function (req,res) {
    let pathname = req.url;
    let pathobj = path.parse(pathname).ext.substring(1);
    let ext = pathobj.ext;
    if(pathname != '/favicon.ico'){
        if (pathname == '/'){
            pathname ='/index.html'
        }
        fs.readFile('view' + pathname,(err,data)=>{
            if (err){
                res.setHeader('Content-type','text/html');
                let data = fs.readFileSync('view/404.html');
                res.end(data);
            }else{
                res.setHeader('Content-type',conType);
                let ContentType = mime.getType();
                res.end(data);
            }
        })
    }
}).listen(3000,function () {
    console.log('haha');
})//开启服务器

