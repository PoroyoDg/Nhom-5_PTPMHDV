const util = require('node:util');

const ketnoi = require('../connectMysql');
const query = util.promisify(ketnoi.query).bind(ketnoi);

module.exports = function (app) {
    app.get('/api/favourite/:account_id', (req, res) => {
        let account_id = req.params.account_id;
        let sql = "SELECT * FROM favourite WHERE account_id = ? Order By id DESC";
        ketnoi.query(sql, [account_id], (err, data) => {
            res.json({
                result: data,
                code: 200
            });
        })
    })

    app.post('/api/favourite', async function (req, res) {
        let sql_check = "SELECT * FROM favourite WHERE account_id = ? AND product_id = ?";
        let favourite = await query(sql_check, [req.body.account_id, req.body.product_id]);
        if (favourite.length > 0) {
            let sql = "DELETE FROM favourite WHERE account_id = ? AND product_id = ?";
            ketnoi.query(sql, [req.body.account_id, req.body.product_id], (err, data) => {
                if (err) {
                    res.json({
                        result: "",
                        message: err.message,
                        code: err.errno
                    });
                }
                else {
                    //     res.body.id = data.insertId;
                    res.json({
                        result: req.body,
                        message: "Delete to favorites successfully",
                        code: 200
                    });
                }
            })
        } else {
            let sql = "INSERT INTO favourite SET ?";

            ketnoi.query(sql, [req.body], (err, data) => {
                if (err) {
                    res.json({
                        result: "",
                        message: err.message,
                        code: err.errno
                    });
                }
                else {
                    // res.body.id = data.insertId;
                    res.json({
                        result: req.body,
                        message: "Add to favorites Successfully",
                        code: 200
                    });
                }
            })
        }

    });

    app.get('/favourite', (req, res) => {
        let sql = "SELECT p.name AS pname, a.name AS aname FROM favourite f JOIN product p ON f.product_id = p.id JOIN account a ON f.account_id = a.id";
        let _name = req.query.name;
        if (_name) {
            // sql += " WHERE p.name LIKE '%" + _name + "%'"
            sql += " WHERE LOWER(a.name) LIKE LOWER('%" + _name + "%')";
        }
        ketnoi.query(sql, function (err, data) {
            if (err) {
                console.log(err);
                return res.status(500).send('Server Error');
            }
            // Truyền dữ liệu vào view
            res.render('favourite', { data: data });
        });
    });

}