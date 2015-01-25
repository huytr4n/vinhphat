var mongoose = require('mongoose'),
		async = require('async'),
		_ = require('underscore'),
		BaseDBService = require('../base-service');

// import necessary models
require('../schema/user')();

// define models variable
var User = mongoose.model('User');

/**
 * Expose api.
 */
module.exports = BaseDBService.extend({
		modelClass: User
});