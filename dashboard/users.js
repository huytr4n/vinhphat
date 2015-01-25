var oop = require('node-g3').oop;

module.exports = oop.Base.extend({
	constructor: function (wrapper) {
		this.app = wrapper.app || {};
		this.db = wrapper.db;
	},

	init: function () {
		var self = this;

		this.app.get('/user', function (req, res) {
			self.db.getInstance('dbUser').getAll(function (err, users) {
				res.render('user', {users: users});
			});
		});
	}
});