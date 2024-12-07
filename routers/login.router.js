const ketnoi = require('../connectMysql');
const sessionStorage = require('node-sessionstorage'); 
module.exports = function(app){
    app.get('/login',(req,res)=>{
        res.render('adminLogIn',{
            err_msg:" "
        });
    });
    app.get('/logout',(req,res)=>{
        sessionStorage.removeItem('admin_login');
        res.redirect('/login');
    });
    app.post('/login',(req,res)=>{
        let sql = "SELECT id,name,email FROM account WHERE email = ? AND password = ? AND role = 'admin'";
        ketnoi.query(sql,[req.body.email, req.body.password], (err, data)=>{
            if(err || data.length == 0){
                res.render('adminLogIn',{
                    err_msg:'Account and password are incorrect'
                });
            } else{
                let accountJSON = JSON.stringify(data[0]);
                sessionStorage.setItem('admin_login', accountJSON);
                res.redirect('/');
            }

        })
    });
}