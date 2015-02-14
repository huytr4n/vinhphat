var oop = require('node-g3').oop,
		async = require('async'),
		_ = require('underscore');

module.exports = oop.Base.extend({
	constructor: function (wrapper) {
		this.app = wrapper.app || {};
		this.db = wrapper.db;
	},

	init: function () {
		var self = this;

		this.get(this.app);
		this.homepage(this.app);		
	},

	get: function (app) {
		var self = this,
				dbProduct = this.db.getInstance('dbProduct');
		
		app.get('/products/:id', function (req, res) {
			var id = req.params.id;
			
			dbProduct.findById(id, function (err, product) {
				product = product || {};

				res.render('product/detail', {product: product});
			});
		});
	},

	homepage: function (app) {
		var dbProduct = this.db.getInstance('dbProduct');

		app.get('/', function (req, res) {
			dbProduct.getAll(function (err, products) {
				products = products || [];

				res.render('index', {count: _.size(products), items: products});
			});
		});
	}

	// add: function (app) {
	// 	var self = this,
	// 			dbUser = this.db.getInstance('dbUser');

	// 	app.get('/user/add', function (req, res) {
	// 		res.render('user/add');
	// 	});

	// 	app.post('/user', function (req, res) {
	// 		var body = req.body;

	// 		dbUser.create(body, function () {
	// 			res.redirect('/user');
	// 		});
	// 	});
	// },

	// del: function (app) {
	// 	var self = this,
	// 			dbUser = this.db.getInstance('dbUser');

	// 	app.get('/user/del/:id', function (req, res) {
	// 		async.waterfall(
	// 			[
	// 				function (callback) {
	// 					dbUser.del(req.params.id, callback);
	// 				}
	// 			]
	// 		, function () {
	// 			res.redirect('/user');
	// 		});
	// 	});
	// }
});