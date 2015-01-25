var oop = require('node-g3').oop,
		async = require('async');

module.exports = oop.Base.extend({
	constructor: function (wrapper) {
		this.app = wrapper.app || {};
		this.db = wrapper.db;
	},

	init: function () {
		var self = this;

		this.get(this.app);
		this.add(this.app);
		this.del(this.app);
	},

	get: function (app) {
		var self = this,
				dbUser = this.db.getInstance('dbUser');

		app.get('/user', function (req, res) {
			dbUser.getAll(function (err, users) {
				res.render('user/home', {users: users});
			});
		});
	},

	add: function (app) {
		var self = this,
				dbUser = this.db.getInstance('dbUser');

		app.get('/user/add', function (req, res) {
			res.render('user/add');
		});

		app.post('/user', function (req, res) {
			var body = req.body;

			dbUser.create(body, function () {
				res.redirect('/user');
			});
		});
	},

	del: function (app) {
		var self = this,
				dbUser = this.db.getInstance('dbUser');

		app.get('/user/del/:id', function (req, res) {
			async.waterfall(
				[
					function (callback) {
						dbUser.del(req.params.id, callback);
					}
				]
			, function () {
				res.redirect('/user');
			});
		});
	}
});