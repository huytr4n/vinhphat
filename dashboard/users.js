var Base = require('basejs'),
		async = require('async'),
		crypto = require('crypto'),
		configs = require('../utils/configs');

module.exports = Base.extend({
	constructor: function (wrapper) {
		this.app = wrapper.app || {};
		this.db = wrapper.db;
	},

	init: function () {
		var self = this;

		this.login(this.app);
	},

	login: function (app) {
		// get
		app.get('/login', function (req, res) {
			if (req && req.session && req.session.user)
				res.redirect('/dashboard-admin');
			else
				res.render('user/login');
		});

		// post
		app.post('/login', function (req, res) {
			var body = req.body || {},
					username = body.username,
					password = body.password;

			var hashPassword = crypto.createHash('md5').update(password).digest('hex');

			if (username && username === configs.get('auth:username')
				  && password && hashPassword === configs.get('auth:password')) {
				// set session
				req.session.user = {role: 'admin', username: username};

				console.log('debug:login:success');

				res.redirect('/dashboard-admin');
			} else {
				res.redirect('/login');
			}

		});
	},

	get: function (app) {
		var self = this,
				dbUser = this.db.getInstance('dbUser');

		app.get('/user', function (req, res) {
			dbUser.getAll(function (err, users) {
				res.render('user/user_home', {users: users});
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