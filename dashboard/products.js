var oop = require('node-g3').oop,
		async = require('async'),
		_ = require('underscore'),
		numeral = require('numeral');

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
		
		// all products
		app.get('/products', function (req, res) {
			var query = {};

			dbProduct.getAll(query, function (err, products) {
				res.render('product/home', {
					count: _.size(products),
					items: self.toJSONs(products),
					page: 'product',
					title: 'Product Page'
				});
			});
		});
				
		// product detail
		app.get('/products/:id', function (req, res) {
			var id = req.params.id;
			
			dbProduct.findById(id, function (err, product) {
				product = product || {};

				res.render('product/detail', {product: self.toJSON(product)});
			});
		});
	},

	homepage: function (app) {
		var self = this,
				dbProduct = this.db.getInstance('dbProduct');

		app.get('/', function (req, res) {
			dbProduct.getAll(function (err, products) {
				products = products || [];

				res.render('index', {count: _.size(products), items: self.toJSONs(products)});
			});
		});
	},

	toJSONs: function (objs, opts) {
		var self = this,
				rawJsons = [];

		_.each(objs, function (obj) {
			rawJsons.push(self.toJSON(obj));
		});

		return rawJsons;
	},

	toJSON: function (obj) {
		var rawJson = obj.toJSON ? obj.toJSON() : obj;

		// format price
		rawJson.price = numeral(obj.price).format('0,0');

		return rawJson;
	}
});