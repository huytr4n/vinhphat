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
		cretedAt: {default: new Date, type: Date},
		updatedAt: Date
	});
		
	mongoose.model('Product', User, 'products');
};