const brandCtrl = require('../controllers/api.brand.controller')
module.exports = function(app){
    app.get('/api/Brand', brandCtrl.index);
    app.delete('/api/Brand/:id',brandCtrl.delete);
    app.get('/api/Brand/:id',brandCtrl.edit );
    app.put('/api/Brand/:id', brandCtrl.update);
    app.post('/api/Brand', brandCtrl.store);
}