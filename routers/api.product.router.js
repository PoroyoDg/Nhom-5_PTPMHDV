const ketnoi = require('../connectMysql');

module.exports = function(app){
    app.get('/api/product', (req,res)=>{
        let _limit = req.query.limit;
        _limit = _limit != undefined ? _limit : 4;
        let sql = "SELECT id, name, image1, image2,image3,image4, price,brand_id,discribe FROM product Order By id DESC";
        ketnoi.query(sql,(err, data) =>{
            let results = [];
            data.forEach(prod => {
                if(prod.id > 90){
                    prod.image1 = 'http://localhost:3012/image/' + prod.image1;
                }
                results.push(prod)
            });

            res.send({
                result: results,
                code:200,
                message: ""
            })
        })
    });

    
}



// const ketnoi = require('../connectMysql');

// module.exports = function(app) {
//     app.get('/api/product', (req, res) => {
//         let placeholders = req.query.ids ? req.query.ids.split(',').map(id => Number(id)).join(',') : '1, 2, 3, 4'; // Thay đổi cho phù hợp

//         let sql = `
//             SELECT 
//                 p.id, 
//                 p.name, 
//                 p.price, 
//                 p.image1, 
//                 p.discribe, 
//                 ps.screen AS cscreen,
//                 ps.chipset AS cchipset,
//                 ps.ram_storage AS cram_storage,
//                 ps.battery AS cbattery,
//                 ps.connectivity AS cconnectivity,
//                 ps.water_dust_resistance AS cwater_dust_resistance,
//                 ps.camera AS ccamera,
//                 ps.os AS cos,
//                 ps.audio AS caudio
//             FROM 
//                 product p 
//             LEFT JOIN 
//                 product_specs ps ON p.id = ps.product_id
//             WHERE 
//                 p.id IN (${placeholders})`;

//         ketnoi.query(sql, (err, data) => {
//             if (err) {
//                 return res.send({
//                     result: [],
//                     code: 500,
//                     message: "Lỗi truy vấn dữ liệu."
//                 });
//             }

//             let results = [];
//             data.forEach(row => {
//                 // Tìm sản phẩm trong results
//                 let product = results.find(prod => prod.id === row.id);
//                 if (!product) {
//                     // Nếu sản phẩm chưa tồn tại, tạo mới
//                     product = {
//                         id: row.id,
//                         name: row.name,
//                         price: row.price,
//                         image1: row.image1,
//                         discribe: row.discribe,
//                         product_specs: [] // Mảng để chứa thông số kỹ thuật
//                     };
//                     results.push(product);
//                 }

//                 // Nếu có thông số kỹ thuật, thêm vào mảng
//                 if (row.cscreen) {
//                     product.product_specs.push({
//                         screen: row.cscreen,
//                         chipset: row.cchipset,
//                         ram_storage: row.cram_storage,
//                         battery: row.cbattery,
//                         connectivity: row.cconnectivity,
//                         water_dust_resistance: row.cwater_dust_resistance,
//                         camera: row.ccamera,
//                         os: row.cos,
//                         audio: row.caudio
//                     });
//                 }

//                 // Cập nhật đường dẫn hình ảnh
//                 if (product.id > 90) {
//                     product.image1 = 'http://localhost:3012/image/' + product.image1;
//                 }
//             });

//             res.send({
//                 result: results,
//                 code: 200,
//                 message: ""
//             });
//         });
//     });
// }