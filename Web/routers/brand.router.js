const brandCtrl = require('../controllers/brand.controller')
module.exports = function(app){
    app.get('/brand', brandCtrl.index);
    app.get('/deleteBrand/:id',brandCtrl.delete);
    app.get('/editBrand/:id',brandCtrl.edit );
    app.post('/editBrand/:id', brandCtrl.update);
    app.get('/addBrand', brandCtrl.create);
    app.post('/addBrand', brandCtrl.store);
}