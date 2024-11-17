const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const { render } = require('ejs');
app.use(bodyParser.urlencoded({
    extended:false
}));

require('./routers/home.router')(app);
require('./routers/product.router')(app);
require('./routers/brand.router')(app);
require('./routers/comparative.router')(app);

const PORT = process.env.PORT || 3012;

app.set('view engine','ejs');
app.use(express.static('public'));


app.get('/adminLogIn', function(req,res){
    res.render('adminLogIn')
});

app.get('/adminLogUp', function(req,res){
    res.render('adminLogUp')
});



app.get('/setting', function(req,res){
    res.render('setting')
});

app.get('/profile', function(req,res){
    res.render('profile')
});

app.get('/profile', function(req,res){
    res.render('profile')
});

app.listen(PORT, function(){
    console.log("Server run on http://localhost:"+PORT)
})