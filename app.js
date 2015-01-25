var dbManager = require('./db/'),
		oop = require('node-g3').oop,
		_ = require('underscore'),
		async = require('async'),
		express = require('express'),
		http = require('http'),
		port = 9090;

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var Server = oop.Base.extend({
	constructor: function () {
		var db = this.db = new dbManager(this, db);
	},

	initDabase: function (callback) {
		this.db.init(['dbUser'], callback);
	},

	startServer: function (callback) {
		var app = this.app = express();

		// set port
		app.set('port', port);

		// view engine setup
		app.set('views', path.join(__dirname, 'views'));
		app.set('view engine', 'jade');

		// uncomment after placing your favicon in /public
		//app.use(favicon(__dirname + '/public/favicon.ico'));
		app.use(logger('dev'));
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: false }));
		app.use(cookieParser());
		app.use(express.static(path.join(__dirname, 'public')));

		app.get('/', function (req, res) {
			res.render('index');
		});

		// create server
		var server = http.createServer(app);

		server.listen(port, function () {
		  console.log('Server is started at port', port);

		  callback && callback();
		});
	},

	addControllers: function () {
		var self = this,
				controllers = {
					users: 'users'
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