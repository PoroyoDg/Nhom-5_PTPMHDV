const util = require('node:util');
const ketnoi = require('../connectMysql');
const query = util.promisify(ketnoi.query).bind(ketnoi);
const Brand = require('../models/brand.model')

exports.index = function(req,res){

    Brand.getAll(req, function(err, data){
        res.send({
            result: data ? data: [], 
            message: "",
            code:200
        })
        
    })
   
    
}

exports.delete = function(req,res){
    let id = req.params.id;
    Brand.getOne(id, function(err, data){
        if(err){
            res.send({
                result: " ",
                message: err.msg,
                code: err.errno
            });
        } else {
            Brand.delete(id, function(err, data){
                if(err){
                    res.send({
                        result: " ",
                        message: err.msg,
                        code: err.errno
                    });
                } else {
                    res.send({
                        result: data,
                        message: 'Delete Successfully',
                        code: 200
                    });
                }
            })
        }

    })
    
}

exports.store = (req,res) =>{
    let bodyData = req.body;
    Brand.store(bodyData, function(err, data){
        if(err){
            res.send({
                result: " ",
                message: err.msg,
                code: err.errno
            });
        } else {
            req.body.id = data.insertId;
            res.send({
                result: req.body,
                message: 'Add Successfully',
                code: 200
            });
        }
    })
}

exports.edit = (req,res) => {
    let id = req.params.id;
    Brand.getOne(id, function(err, data){
        if(err){
            res.send({
                result: " ",
                message: err.msg,
                code: err.errno
            });
        } else {
            res.send({
                result:data,
                message: " ",
                code: 200
            });
        }

    })
}

exports.update = async(req,res) =>{
    Brand.getOne(req.params.id, function(err, data){
        if(err){
            res.send({
                result: " ",
                message: err.msg,
                code: err.errno
            });
        } else {
            Brand.update(req, function(err,data){
                if(err){
                    res.send({
                        result: " ",
                        message: err.msg,
                        code: err.errno
                    });
                } else {
                    req.body.id = req.params.id;
                    res.send({
                        result: req.body,
                        message: 'Update Successfully',
                        code: 200
                    });
                }
            })
        }

    })
    
}
