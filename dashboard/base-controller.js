// var oop = require('node-g3').oop;

// module.exports = oop.Base.extend({

// 	/**
// 	 * db register name
// 	 */
// 	dbName: null,

// 	/**
// 	 * override
// 	 */
// 	constructor: function (app, db) {
// 		this.app = app;
// 		this.db = db;

// 		return this;
// 	},

// 	getAll: function (opts, callback) {
// 		this.getService().modelClass.find(opts, callback);
// 	},

// 	getOne: function (opts, callback) {
// 		this.getService().modelClass.findOne(opts, callback);
// 	},

// 	findById: function (id, callback) {
// 		this.getService().modelClass.findOne({_id: id}, callback);
// 	},

// 	save: function (data, callback) {
// 		this.getService.modelClass(opts).save(callback);
// 	},

// 	update: function (data, callback) {
// 		// TODO
// 	},

// 	del: function (id, callback) {
// 		// TODO
// 	},

// 	getService: function () {
// 		console.log(this.app);
// 		console.log(this.db);
// 		return this.db && this.db.getInstance(this.dbName);
// 	}


// });