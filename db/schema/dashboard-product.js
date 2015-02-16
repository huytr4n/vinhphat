// import the necessary modules
var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

// create an export function to encapsulate the model creation
module.exports = function () {
		// define schema
	var User = new Schema({
		name: String,
		price: Number,
		currency: String,

		imageURL: String,
		type: String, // laptop, desktop, phone, other
		hashtags: Array,

		guarantee: String,
		promotion: String,

		description: String,

		code: String,

		status: {default: true, type: Boolean},

		cretedAt: {default: new Date, type: Date},
		updatedAt: Date
	});
		
	mongoose.model('Product', User, 'products');

	// Middleware
	User.pre('save', function (next) {
		this.code = Math.round(Math.random() * 10000).toString();
		next();
	});
};