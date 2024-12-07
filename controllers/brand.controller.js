const util = require('node:util');
const ketnoi = require('../connectMysql');
const query = util.promisify(ketnoi.query).bind(ketnoi);
const Brand = require('../models/brand.model')

exports.index = function(req,res){
    Brand.getAll(req, function(err, data){
        res.render('brand',{
            data: data
        })
    })
   
    
}

exports.delete = function(req,res){
    let id = req.params.id;
    Brand.delete(id, function(err, data){
        if(err){
            res.render('error',{
                message: err.msg,
                code: err.errno
            });
        } else {
            res.redirect('/brand');
        }
    })
}

exports.create = (req,res) => {
    res.render('addBrand')
}

exports.store = (req,res) =>{
    let bodyData = req.body;
    Brand.store(bodyData, function(err, data){
        if(err){
            res.render('error',{
                message: err.msg,
                code: err.errno
            });
        } else {
            res.redirect('/brand');
        }
    })
}

exports.edit = (req,res) => {
    let id = req.params.id;
    Brand.getOne(id, function(err, data){
        if(err){
            res.render('error',{
                message: err.msg,
                code: err.errno
            });
        } else {
            res.render('editBrand', {
                br: data
            });
        }

    })
}

exports.update = async(req,res) =>{
    Brand.update(req, function(err,data){
        if(err){
            res.render('error',{
                message: err.msg,
                code: err.errno
            });
        } else {
            res.redirect('/brand');
        }
    })
}
