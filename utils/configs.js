var nconf = require('nconf'),
		path = require('path');

var CONFIG_PATH = path.join(__dirname, '/../configs/local.json');

nconf.argv()
       .env()
       .file({ file: CONFIG_PATH });

console.log('Start with this configuration:', nconf.stores.file.file);

// console.log(nconf.get('server:port'));

module.exports = nconf;