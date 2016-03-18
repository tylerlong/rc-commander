var program = require('commander');
var nunjucks = require('nunjucks');
var path = require('path');
var configuration = require('./configuration');
var file = require('./file');


program
  .version(require('./package.json').version)
  .option('-n, --number <number>', 'send to which number')
  .option('-t, --text <text>', 'text of the sms')
  .parse(process.argv);
