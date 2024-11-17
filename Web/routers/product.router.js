const productCtrl = require('../controllers/product.controller')
const upload = require('../upload-multer');
module.exports = function(app){
    app.get('/products', productCtrl.index);
    app.get('/deleteProduct/:id',productCtrl.delete);
    app.get('/editProduct/:id',productCtrl.edit );
    app.post('/editProduct/:id', upload.single('image'), productCtrl.update);
    app.get('/addProduct', productCtrl.create);
    app.post('/addProduct', upload.single('image'), productCtrl.store);
    app.get('/productView/:id',productCtrl.details );
}