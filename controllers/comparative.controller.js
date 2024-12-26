const util = require('node:util');
const ketnoi = require('../connectMysql');
const query = util.promisify(ketnoi.query).bind(ketnoi);
const Product = require('../models/product.model');
// const Brand = require('../models/brand.model');
const Comparative = require('../models/comparative.model');

exports.choose = function (req, res) {
    Comparative.choose(req, function (err, data) {
        res.render('comparative', {
            title: 'Comparative Products',
            data: data ? data : []

        });
    })
    
  }

exports.compare = function (req, res) {
    let selectedIds = req.body.productIds;
  
    // Kiểm tra nếu không có sản phẩm nào được chọn
    if (!selectedIds) {
        return res.redirect('/comparative');
    }
  
    // Đảm bảo `selectedIds` là mảng
    if (!Array.isArray(selectedIds)) {
        selectedIds = [selectedIds];
    }
  
    // Truy vấn MySQL để lấy thông tin các sản phẩm đã chọn
    const placeholders = selectedIds.map(() => '?').join(',');
    const sql = `
    SELECT 
        p.id, 
        p.name, 
        p.brand_id, 
        p.price, 
        p.image1, 
        p.discribe, 
        c.name as cname,
        ps.screen as cscreen,
        ps.chipset as cchipset,
        ps.ram_storage as cram_storage,
        ps.battery as cbattery,
        ps.connectivity as cconnectivity,
        ps.water_dust_resistance as cwater_dust_resistance,
        ps.camera as ccamera,
        ps.os as cos,
        ps.audio as caudio
    FROM 
        product p 
    JOIN 
        brand c ON p.brand_id = c.id 
    JOIN 
        product_specs ps ON p.id = ps.product_id
    WHERE 
        p.id IN (${placeholders})
    `;




    ketnoi.query(sql, selectedIds, (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn CSDL:', err);
            return res.status(500).send('Lỗi khi truy vấn CSDL');
        }
  
        // Render trang compareResult với kết quả so sánh
        res.render('compareResult', {
            title: 'Comparison Result',
            products: results
        });
    });
  }


  