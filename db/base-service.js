var oop = require('node-g3').oop;

var mongoose = require('mongoose'),
		async = require('async'),
		_ = require('underscore'),
		configs = require('../utils/configs'),
		isConnecting = false,
		isConnected = false,
		fnQueue = [];


module.exports = oop.Base.extend({

	modelClass: null,

	constructor: function (app, db) {
		this.app = app;
		this.db = db;

		return this;
	},

	/**
	 * @overriden
	 */
	init: function (fn) {
		fnQueue.push(fn);

		if (isConnecting) {
			return;
		} else {
			isConnecting = true;
		}

		if (!isConnected) {
			mongoose.connect(configs.get('database:connectionString'));

			mongoose.connection.once('open', function callback () {
        isConnecting = false;
        isConnected = true;
	        _.each(fnQueue, function (oneFn) {
	           oneFn && oneFn();
	        });
		    });		
    } else {
			fn && fn();
		}
	},

	/**
	 * Terminal service
	 * Should be overriden by subclass
	 */
	terminal: function (fn) {
		fn && fn();
	},

	getAll: function (opts, callback) {
		this.modelClass.find(opts, callback);
	},

	getOne: function (opts, callback) {
		this.modelClass.findOne(opts, callback);
	},

	findById: function (id, callback) {
		this.modelClass.findOne({_id: id}, callback);
	},

	create: function (data, callback) {
		new this.modelClass(data).save(callback);
	},

	update: function (id, data, callback) {
		this.findById(id, function (err, item) {
			if (err || !item)
				return callback && callback();

			_.each(data, function (value, key) {
				if (value)
					item[key] = value;
			});

			item.save(callback);
		});
	},

	del: function (id, callback) {
		this.modelClass.findByIdAndRemove(id, callback);
	},

	getService: function () {
		return this.modelClass;
	}
	
});