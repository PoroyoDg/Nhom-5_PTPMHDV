const util = require('node:util');
const ketnoi = require('../connectMysql');
const query = util.promisify(ketnoi.query).bind(ketnoi);
const Product = require('../models/product.model');
const Brand = require('../models/brand.model');


exports.index = function(req,res){
    Product.getAll(req, function(err, data){
        res.render('products',{
            data: data || []
        })
    })
   
    
}

exports.delete = function(req,res){
    let id = req.params.id;
    Product.delete(id, function(err, data){
        if(err){
            res.render('error',{
                message: err.msg,
                code: err.errno
            });
        } else {
            res.redirect('/products');
        }
    })
}

exports.create = (req,res) => {
    Brand.comboBox(function(err, data){
        if(err){
            return res.status(500).send('Error fetching data');
        }
        res.render('addProduct', {
            data: data.length ? data : []
        });
    });
    
}

exports.store = (req,res) =>{
    let bodyData = req.body;
    bodyData.image1 = req.file.filename;     
    Product.store(bodyData, function(err, data){
        if(err){
            res.render('error',{
                message: err.msg,
                code: err.errno
            });
        } else {
            res.redirect('/products');
        }
    })
}

exports.edit = (req,res) => {
    // let id = req.params.id;
    // Product.getOne(id, function(err, data){
    //     if(err){
    //         res.render('error',{
    //             message: err.msg,
    //             code: err.errno
    //         });
    //     } else {
    //         res.render('editProduct', {
    //             prd: data
    //         });
    //     }

    // })
    
    let id = req.params.id;
    
    // Lấy thông tin sản phẩm trước
    Product.getOne(id, function(err, data) {
        if (err) {
            return res.render('error', {
                message: err.msg,
                code: err.errno
            });
        }
        
        // Sau khi có thông tin sản phẩm, lấy danh sách Brand
        Brand.comboBox(function(err, br) {
            if (err) {
                return res.render('error', {
                    message: err.msg,
                    code: err.errno
                });
            }

            // Render trang editProduct với dữ liệu sản phẩm và Brand
            res.render('editProduct', {
                prd: data,
                br: br.length ? br : []
            });
        });
    });

}

exports.update = async(req,res) =>{
    let bodyData = req.body;
    // Kiểm tra xem có file ảnh mới không
    if (req.file) {
        bodyData.image1 = req.file.filename;
    }
    // bodyData.image1 = req.file.filename;
    Product.update(req, function(err,data){
        if(err){
            res.render('error',{
                message: err.msg,
                code: err.errno
            });
        } else {
            res.redirect('/products');
        }
    })
}

exports.details = (req,res) => {
    let id = req.params.id;
    Product.getOne(id, function(err, data){
        if(err){
            res.render('error',{
                message: err.msg,
                code: err.errno
            });
        } else {
            res.render('productView', {
                prd: data
            });
        }

    })
}


