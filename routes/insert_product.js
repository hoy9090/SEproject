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
	var upload = multer({dest: 'public/images/products/'+image_path}).array('file');
	upload(req, res, function (err) {
		if (!err)
	  	pool.getConnection(function(err, conn) {
				conn.query('use board');
				conn.query('insert into Product(type, subtype, name, price, stock, date, img_url, color, Seller_SN) values(?, ?, ?, ?, ?, now(), ?, ?, ?)', [req.body.type, req.body.subtype, req.body.name, req.body.price, req.body.stock, img_path, req.body.color, req.session.userno], function(err, result, field) {
					if (err) {
						console.error(err);
					}
					conn.release();
					for (var index in req.files)
						fs.rename('public/images/products/'+image_path+'/'+req.files[index].filename, 'public/images/products/'+image_path+'/'+index);
					res.redirect('/');
				});
			});  
  });
});

module.exports = router;