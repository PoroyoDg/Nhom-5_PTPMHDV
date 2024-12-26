const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sessionStorage = require('node-sessionstorage');
const { render } = require('ejs');

const cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(bodyParser.json());

app.set('view engine','ejs');
const PORT = process.env.PORT || 3012;
app.use(express.static('public'));

app.use(function(req,res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});

require('./routers/login.router')(app);
app.use(function(req,res,next){
    let accountJSON = sessionStorage.getItem('admin_login');
    if(accountJSON){
        global.account = JSON.parse(accountJSON);
        next();
    }else{
        res.redirect('/login');
    }
   
})

require('./routers/home.router')(app);
require('./routers/product.router')(app);
require('./routers/brand.router')(app);
require('./routers/comparative.router')(app);
require('./routers/api.brand.router')(app);
require('./routers/api.product.router')(app);
require('./routers/api.account.router')(app);
require('./routers/api.favourite.router')(app);

app.get('/adminLogIn', function(req,res){
    res.render('adminLogIn')
});

app.listen(PORT, function(){
    console.log("Server run on http://localhost:"+PORT)
})