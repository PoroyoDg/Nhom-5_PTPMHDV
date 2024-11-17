const util = require('node:util');
const ketnoi = require('../connectMysql');
const query = util.promisify(ketnoi.query).bind(ketnoi);

const Product = function(){}

Product.getAll = function(req, callback){
    let sql = "SELECT p.*,c.name as cname FROM product p JOIN brand c ON p.brand_id = c.id";
    let _name = req.query.name;
    if(_name){
        // sql += " WHERE p.name LIKE '%" + _name + "%'"
        sql += " WHERE LOWER(p.name) LIKE LOWER('%" + _name + "%')";
    }
    ketnoi.query(sql, function(err, data){
        callback(err, data);
    })
}

Product.delete = function(id, myFun){
    
    let sql_delete = "DELETE FROM product WHERE id = ?";
    ketnoi.query(sql_delete,[id],function(err,data){
        if(err){
            let msg ='';
            if(err.errno == 1451){
                msg = 'Lỗi 1451';
            }
            else if (err.errno == 2000){
                msg = 'Lỗi 2000';
            }
            else {
                msg = 'Da co loi, vui long thu lai';
            }
            myFun({msg, errno: err.errno},null);
        } else {
            myFun(false, data);
        }
    })
}

Product.store = function(bodyData, myFun){
    let sql = "INSERT INTO product SET ?";
    ketnoi.query(sql, bodyData, (err, data) =>{
        if(err){
            let msg ='';
            if(err.errno == 1451){
                msg = 'Lỗi 1451';
            }
            else if (err.errno == 1054){
                msg = err.message;
            }
            else {
                msg = 'Da co loi, vui long thu lai';
            }

            myFun({msg, errno: err.errno},null);
        } else {
            myFun(false, data);
        }
    })
}

Product.getOne = function(id,myFun){
    
    ketnoi.query("SELECT * FROM product WHERE id = ?",[id],(err,data) =>{
        if(data.length){
            myFun(false, data[0])
        } else {
            myFun({msg:'khong tim thay du lieu',errno: 404},data[0])
        }
    })
}

Product.update = function(req, myFun) {
    let id = req.params.id;
    let sql = "UPDATE product SET ? WHERE id = ?";
    ketnoi.query(sql, [req.body, id], (err, data) =>{
        if(err){
            let msg ='';
            if(err.errno == 1451){
                msg = 'Lỗi 1451';
            }
            else if (err.errno == 1054){
                msg = err.message;
            }
            else {
                msg = 'Da co loi, vui long thu lai';
            }

            myFun({msg, errno: err.errno},null);
        } else {
            myFun(false, data);
        }
    })
}
module.exports = Product;