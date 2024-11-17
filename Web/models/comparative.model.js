const util = require('node:util');
const ketnoi = require('../connectMysql');
const query = util.promisify(ketnoi.query).bind(ketnoi);

const Comparative = function(){}

Comparative.choose = function (req, callback) {
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

  
  

module.exports = Comparative;