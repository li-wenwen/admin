let express = require('express');
let app = express();
let ejs = require('ejs');
let mysql = require('mysql');
let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database:'travel',
    port:'3306'
});
connection.connect();
app.get('/', function (req, res) {
    connection.query('select * from nav',function (error,result) {
        let nav = result;
        ejs.renderFile('views/index.ejs',{name:'ejs',nav:nav},(err,str)=>{
            if (err){
                throw err;
            }else{
                res.end(str);
            }
        });
    })
    connection.end();
})
app.listen(3000, () => console.log('Example app listening on port 3000!'))