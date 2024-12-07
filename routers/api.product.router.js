const ketnoi = require('../connectMysql');

module.exports = function(app){
    app.get('/api/product', (req,res)=>{
        let _limit = req.query.limit;
        _limit = _limit != undefined ? _limit : 4;
        let sql = "SELECT id, name, image1, price,brand_id FROM product Order By id DESC LIMIT " + _limit;
        ketnoi.query(sql,(err, data) =>{
            let results = [];
            data.forEach(prod => {
                if(prod.id > 90){
                    prod.image = 'http://localhost:3012/image/' + prod.image;
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