const util = require('node:util');
const ketnoi = require('../connectMysql');
const query = util.promisify(ketnoi.query).bind(ketnoi);

const Brand = function(){}

Brand.getAll = function(req, callback){
    let sql = "SELECT * FROM brand";
    let _name = req.query.name;
    if(_name){
        sql += " WHERE name LIKE '%" + _name + "%'"
    }
    ketnoi.query(sql, function(err, data){
        callback(err, data);
    })
}

Brand.comboBox = function(myFun){
    ketnoi.query("SELECT id, name FROM brand ORDER BY name ASC", (err, data) => {
        myFun(err, data);
    })
}

Brand.delete = async function(id, myFun){
    let sql_select = "SELECT * FROM brand WHERE id = ?";
    let cat = await query(sql_select,[id]);
    let sql_delete = "DELETE FROM brand WHERE id = ?";
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
            myFun(false, cat[0]);
        }
    })
}

Brand.store = function(bodyData, myFun){
    let sql = "INSERT INTO brand SET ?";
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

Brand.getOne = function(id,myFun){
    
    ketnoi.query("SELECT * FROM brand WHERE id = ?",[id],(err,data) =>{
        if(data.length){
            myFun(false, data[0])
        } else {
            myFun({msg:'khong tim thay du lieu',errno: 404},data[0])
        }
    })
}

Brand.update = function(req, myFun) {
    let id = req.params.id;
    let sql = "UPDATE brand SET ? WHERE id = ?";
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
module.exports = Brand;