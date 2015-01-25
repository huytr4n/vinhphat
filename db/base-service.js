var oop = require('node-g3').oop;

var mongoose = require('mongoose'),
		async = require('async'),
		_ = require('underscore');


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
		mongoose.connect('mongodb://localhost:27017/base', fn);
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
		this.getService().modelClass.findOne(opts, callback);
	},

	findById: function (id, callback) {
		this.getService().modelClass.findOne({_id: id}, callback);
	},

	create: function (data, callback) {
		new this.modelClass(data).save(callback);
	},

	update: function (data, callback) {
		// TODO
	},

	del: function (id, callback) {
		this.modelClass.findByIdAndRemove(id, callback);
	},

	getService: function () {
		return this.modelClass;
	}
	
});