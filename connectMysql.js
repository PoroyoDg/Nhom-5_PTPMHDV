const mysql = require('mysql');

const ketnoi = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: '',
    database: 'admin'
});

ketnoi.connect(function(err){
    if(err){
        console.log('Kết nối CSDl không thành công, kiểm tra lại CSDL!')
    }
});

module.exports = ketnoi; 