var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '1234'
});
var path = require('path');
var fs = require('fs');
var multer = require('multer');
var md5 = require('md5');

/* POST insert_product. */
router.post('/', function(req, res, next) {
	var image_path = md5(new Date()+'boardatoz');
	var upload = multer({dest: 'public/images/product/'+image_path}).array('file');
	upload(req, res, function(err) {
		if (!err)
	  	pool.getConnection(function(err, conn) {
				conn.query('use board');
				conn.query('insert into Product(type, subtype, name, price, stock, date, color, Seller_SN) values(?, ?, ?, ?, ?, now(), ?, ?)', [req.body.type, req.body.subtype, req.body.name, req.body.price, req.body.stock, req.body.color, req.session.userno], function(err, result, field) {
					if (err) {
						console.error(err);
					}
					var filename = [0, 0];
					for (var index in req.files) {
						filename[index] = image_path+'/'+req.files[index].filename;
					}
					conn.query('select SN from Product order by SN desc limit 0, 1', function(err, result, field) {
						if (err) {
							console.error(err);
						}
						var SN = result[0].SN;
						conn.query('update Product set img_url=?, detail_image_url=? where SN='+SN, [filename[0], filename[1]], function(err, result,field) {
							if (err)
								console.error(err);
							conn.release();
							res.redirect('/');
						});
					});
				});
			});
	 	else
	 		console.error(err);
  });
});

module.exports = router;