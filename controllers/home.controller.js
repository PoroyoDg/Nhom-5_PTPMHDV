const ketnoi = require('../connectMysql');
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
    // Truy vấn tổng số người dùng
    ketnoi.query('SELECT COUNT(id) AS totalUsers FROM account', (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Có lỗi khi truy vấn cơ sở dữ liệu");
        }
        const totalUsers = result[0].totalUsers;

        // Truy vấn doanh thu và số lượng sản phẩm bán
        ketnoi.query('SELECT SUM(price * sold) AS totalRevenue, COUNT(id) AS totalProducts FROM product', (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Có lỗi khi truy vấn cơ sở dữ liệu");
            }
            const totalRevenue = result[0].totalRevenue;
            const totalProducts = result[0].totalProducts;

            // Truy vấn danh sách sản phẩm bán chạy nhất
            ketnoi.query('SELECT name, sold FROM product ORDER BY sold DESC LIMIT 5', (err, topProducts) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send("Có lỗi khi truy vấn cơ sở dữ liệu");
                }

                // Render trang dashboard với các thông tin đã lấy
                res.render('adminDashboard', {
                    totalUsers: totalUsers,
                    totalRevenue: totalRevenue,
                    totalProducts: totalProducts,
                    topProducts: topProducts
                });
            });
        });
    });
    
}


const { getSalesByBrand } = require('../data.chart');

exports.db2 = (req, res) => {
    getSalesByBrand(function(data) {
        // Chuyển đổi dữ liệu thành dạng thích hợp cho biểu đồ
        const labels = data.map(item => item.brand_name);
        const values = data.map(item => item.total_sold);
        res.render('adminDashboard2', {
            chartData: { labels, values }
        });
    });
};
