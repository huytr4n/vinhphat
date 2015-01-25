// import the necessary modules
var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

// create an export function to encapsulate the model creation
module.exports = function () {
		// define schema
	var User = new Schema({
		name: String,
		username: String,
		password: String,
		email: String,
		cretedAt: {default: new Date, type: Date},
		updatedAt: Date
	});
		
	mongoose.model('User', User, 'users');
};