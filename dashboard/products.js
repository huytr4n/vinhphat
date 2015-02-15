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
		this.solution(this.app);
		this.about(this.app);
	},

	get: function (app) {
		var self = this,
				dbProduct = this.db.getInstance('dbProduct');
		
		// all products
		app.get('/products', function (req, res) {
			var params = req.query,
					query = self.normalize(params);

			dbProduct.getAll(query, function (err, products) {
				res.render('product/home', {
					count: _.size(products),
					items: self.toJSONs(products),
					page: 'product',
					title: 'Product Page',
					productType: query.type
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

	solution: function (app) {
		app.get('/solution', function (req, res) {
			res.render('solution', {page: 'Solution', title: 'Solution'});
		});
	},

	about: function (app) {
		app.get('/about', function (req, res) {
			res.render('about', {page: 'About', title: 'About'});
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
	},

	normalize: function (params) {
		var type = params.type,
				name = params.name,
				query = {};

		if (type && type !== 'all')
			query.type = type;

		if (name)
			query.name = new RegExp(name, 'gi');

		return query;
	}
});