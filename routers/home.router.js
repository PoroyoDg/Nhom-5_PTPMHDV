const homeCtrl = require('../controllers/home.controller')

module.exports = function (app) {
    app.get('/', homeCtrl.home);
    app.get('/about', homeCtrl.about);
    app.get('/contact', homeCtrl.contact);
    app.get('/adminDashboard', homeCtrl.db1);
    app.get('/adminDashboard2', homeCtrl.db2);
    app.get('/profile', function (req, res) {
        res.render('profile')
    });
    

}