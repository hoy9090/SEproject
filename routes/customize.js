var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool(
{
	host: 'localhost',
	user: 'root',
	password: '1234'
});

router.get('/', function(req, res, next)
{
	var type = req.query.type;
	var subtype = req.query.subtype;
	var typeString;

	if (type == 0) {
		if (subtype == 0) {
			typeString = "Longboard";
		} else if (subtype == 1) {
			typeString = "Cruserboard";
		} else if (subtype == 2) {
			typeString = "Skateboard";
		}
	} else if (type == 1) {
		if (subtype == 0) {
			typeString = "Truck";
		} else if (subtype == 1) {
			typeString = "Wheel";
		} else if (subtype == 2) {
			typeString = "Deck";
		}
	} else if (type == 2) {
		if (subtype == 0) {
			typeString = "Cleaning";
		} else if (subtype == 1) {
			typeString = "Protects";
		}
	}
	pool.getConnection(function(err, conn)
	{
		if(err)
			console.error(err);

		conn.query('use board');

		// product
		conn.query('select SN, name, price, img_url from Product where type=? and subtype=? order by SN desc', [type, subtype], function(err, result, field)
		{
			if(err)
				console.error(err);
			conn.release();
			res.render('customize', {list: result, type: typeString});
		});

		// customize load
		conn.query('select board_type, deck_SN, truck_SN, wheel_SN, wheel_color from Customize where buyer_SN='+req.session.userno, function(err, result, field) {
			if (err)
				console.error(err);
			conn.release();
			res.render('MYpage_show_customizing', {info: result[0]});
		});

		// customize write
		console.log(req.body);
		var SN = req.body.NO;
		var deck_color = req.body.deck_color;
		var truck_color = req.body.truck_color;
		var wheel_color = req.body.wheel_color;
		var comment = req.body.comment;
		var queryString = "";
		if (deck_color != null)
			queryString = queryString.concat("deck_color='"+deck_color+"', ");
		if (truck_color != null)
			queryString = queryString.concat("truck_color='"+truck_color+"', ");
		if (wheel_color != null)
			queryString = queryString.concat("wheel_color='"+wheel_color+"', ");
		if (comment != null)
			queryString = queryString.concat("comment='"+comment+"', ");
		queryString = queryString.slice(0, -2);
		conn.query('update Customize set '+queryString+' where buyer_SN='+SN, function(err, result, field) {
			conn.release();
			if (err) {
				console.error(err);
				res.send({reg_success: false});
			} else {
				res.send({reg_success: true});
			}
		});
	});
});

module.exports = router;
