exports.home = (req,res) => {
    res.render('adminHome');
}

exports.about = (req,res) => {
    res.render('about');
}

exports.contact = (req,res) => {
    res.render('contact');
}

exports.db1 = function(req,res){
    res.render('adminDashboard')
}

exports.db2 = function(req,res){
    res.render('adminDashboard2')
}