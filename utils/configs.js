var nconf = require('nconf'),
		path = require('path'),
		fs = require('fs');

var CONFIG_PATH = path.join(__dirname, '/../configs/local.json'),
		DEFAULT_PATH = path.join(__dirname, '/../configs/default.json');

if (fs.existsSync(DEFAULT_PATH))
   CONFIG_PATH = DEFAULT_PATH;

nconf.argv()
       .env()
       .file({ file: CONFIG_PATH });

console.log('Start with this configuration:', nconf.stores.file.file);

// console.log(nconf.get('server:port'));

module.exports = nconf;