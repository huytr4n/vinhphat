var Base = require('basejs'),
		_ = require('underscore'),
		async = require('async'),

		dbManager = require('./db/'),
		ServerManager = require('./dashboard/server');

var Server = Base.extend({
	constructor: function () {
		var db = this.db = new dbManager(this, db);
	},

	initDabase: function (callback) {
		this.db.init(['dbUser', 'dbProduct'], callback);
	},

	startServer: function (callback) {
		ServerManager(this, callback);
	},

	addControllers: function () {
		var self = this,
				controllers = {
					'users': 'users',
					'products': 'products',
					'dashboard-products': 'dashboard-products'
				};

		_.each(controllers, function (direct, name) {
			var tmpControl = new require('./dashboard/' + direct)(self);

			tmpControl.init();
		});
	}
});

// start
var server = new Server();

async.series(
	[
		function (callback) {
			server.initDabase(callback);
		},
		function (callback) {
			server.startServer(callback);
		},
		function (callback) {
			server.addControllers();
			callback();
		}
	]
	, function (err) {

});