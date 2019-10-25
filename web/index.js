//服务器 数据库
let http = require('http');
let ejs = require('ejs');
let mysql = require('mysql');
//
http.createServer((req,res)=>{
    let connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database:'travel',
        port:'3306'
    });
    connection.connect();
    let parthname = req.url;
    if(parthname != '/favicon.ico'){
        if(parthname == '/query'){
            connection.query('select * from nav',function (error,result) {
                let nav = result;
                ejs.renderFile('view/index.ejs',{name:'ejs',nav:nav},(err,str)=>{
                    if (err){
                        throw err;
                    }else{
                        res.end(str);
                    }
                });
            })
            connection.end();
        }else if(parthname == 'insert'){

        }else if(parthname == 'update'){

        }
    }
}).listen(8080,()=>{
    console.log('haha');
})