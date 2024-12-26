const ketnoi = require('./connectMysql');

// Truy vấn dữ liệu để vẽ biểu đồ cột: số lượng sản phẩm bán được theo thương hiệu
function getSalesByBrand(callback) {
    ketnoi.query(`
        SELECT b.name AS brand_name, SUM(p.sold) AS total_sold
        FROM product p
        JOIN brand b ON p.brand_id = b.id
        GROUP BY b.name
    `, function(err, result) {
        if (err) throw err;
        callback(result);
    });
}

// Truy vấn dữ liệu cho biểu đồ đường: doanh thu theo thời gian
function getRevenueOverTime(callback) {
    ketnoi.query(`
        SELECT created_at, SUM(price * sold) AS revenue
        FROM product
        GROUP BY created_at
        ORDER BY created_at ASC
    `, function(err, result) {
        if (err) throw err;
        callback(result);
    });
}

// Truy vấn dữ liệu cho biểu đồ tròn: tỷ lệ các vai trò của người dùng
function getUserRoles(callback) {
    ketnoi.query(`
        SELECT role, COUNT(*) AS count
        FROM account
        GROUP BY role
    `, function(err, result) {
        if (err) throw err;
        callback(result);
    });
}

// Truy vấn dữ liệu cho biểu đồ cột so sánh: Sản phẩm yêu thích theo tài khoản
function getFavouriteProductsComparison(callback) {
    ketnoi.query(`
        SELECT a.name AS account_name, COUNT(f.product_id) AS favourite_count
        FROM favourite f
        JOIN account a ON f.account_id = a.id
        GROUP BY a.name
    `, function(err, result) {
        if (err) throw err;
        callback(result);
    });
}

module.exports = {
    getSalesByBrand,
    getRevenueOverTime,
    getUserRoles,
    getFavouriteProductsComparison
};
