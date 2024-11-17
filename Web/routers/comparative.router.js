const comparativeCtrl = require('../controllers/comparative.controller')

module.exports = function (app) {
    // Route: Hiển thị trang Comparative
    app.get('/comparative', comparativeCtrl.choose);

    // Route: Xử lý so sánh sản phẩm
    app.post('/compare', comparativeCtrl.compare);


}