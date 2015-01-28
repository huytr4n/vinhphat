var http = require('http'),
		express = require('express'),
 		path = require('path'),
 		favicon = require('serve-favicon'),
 		logger = require('morgan'),
 		cookieParser = require('cookie-parser'),
 		bodyParser = require('body-parser'),
 		configs = require('../utils/configs'),
 		port = configs.get('server:port');

module.exports = function (wrapper, callback) {
	var app = wrapper.app = express();

		// set port
		app.set('port', port);

		// view engine setup
		app.set('views', path.join(__dirname, '/../views'));
		app.set('view engine', 'jade');

		// uncomment after placing your favicon in /public
		//app.use(favicon(__dirname + '/public/favicon.ico'));
		app.use(logger('dev'));
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: false }));
		app.use(cookieParser());
		app.use(express.static(path.join(__dirname, '/../public')));

		// home page
		app.get('/', function (req, res) {
			res.render('index');
		});

		// create server
		var server = http.createServer(app);

		server.listen(port, function () {
		  console.log('Server is started at port', port);

		  callback && callback();
		});
};