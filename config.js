var fs = require('fs');


var config = JSON.parse(fs.readFileSync(process.env['HOME'] + '/.rc-commander.json', 'utf8'));


module.exports = config;
