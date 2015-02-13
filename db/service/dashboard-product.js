var mongoose = require('mongoose'),
		async = require('async'),
		_ = require('underscore'),
		BaseDBService = require('../base-service');

// import necessary models
require('../schema/dashboard-product')();

// define models variable
var Product = mongoose.model('Product');

/**
 * Expose api.
 */
module.exports = BaseDBService.extend({
		modelClass: Product
});