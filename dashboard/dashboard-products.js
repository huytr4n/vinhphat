var Base = require('basejs'),
		async = require('async'),
		_ = require('underscore');

module.exports = Base.extend({
	constructor: function (wrapper) {
		this.app = wrapper.app || {};
		this.db = wrapper.db;
	},

	init: function () {
		var self = this;

		this.router(this.app);
		this.api(this.app);
	},

	checkLogin: function (req, res, next) {
		if (req && req.session && req.session.user && req.session.user.role === 'admin')
			next();
		else
			res.redirect('/login');
	},

	/**
	 * Web routing
	 */
	router: function (app) {
		var self = this,
				dbProduct = this.db.getInstance('dbProduct');

		// admin manager page
		app.get('/dashboard-admin', this.checkLogin, function (req, res) {
			dbProduct.getAll({}, function (err, products) {
				products = products || [];

				res.render('dashboard/home', {count: _.size(products), items: products});
			});
		});

		// admin add page
		app.get('/dashboard-admin/add', this.checkLogin, function (req, res) {
			res.render('dashboard/add');
		});

		// admin edit page
		app.get('/dashboard-admin/:id', this.checkLogin, function (req, res) {
			var id = req.params.id;
			
			dbProduct.findById(id, function (err, product) {
				product = product || {};

				res.render('dashboard/edit', {product: product});
			});
		});
	},

	/**
	 * Api end point
	 */
	api: function (app) {
		var self = this,
				dbProduct = this.db.getInstance('dbProduct');

		// list
		app.get('/api/products', function (req, res) {
			var query = {};

			dbProduct.getAll(query, function (err, products) {
				res.send({
					count: _.size(products),
					items: products || []
				});
			});
		});
		
		// get
		app.get('/api/products/:id', function (req, res) {
			var id = req.params.id;

			dbProduct.findById(id, function (err, product) {
				product = product || {};
				res.send(product);
			});
		});

		// add
		app.post('/api/products', function (req, res) {
			var body = req.body;

			dbProduct.create(body, function (err, product) {
				if (err)
					res.send(err);
				else
					res.send(product);
			});
		});

		// update
		app.put('/api/products/:id', function (req, res) {
			var id = req.params.id,
					body = req.body;

			dbProduct.update(id, body, function (err, product) {
				if (err)
					res.send(err);
				else
					res.send(product);
			});
		});

		// remove
		app.delete('/api/products/:id', function (req, res) {
			var id = req.params.id;

			dbProduct.del(id, function (err) {
				if (err)
					res.send({success: false});
				else
					res.send({success: true, id: id});
			});
		});
	}
});