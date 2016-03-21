#! /usr/bin/env node


var program = require('commander');


program
  .version(require('./package.json').version)
  .command('sms', 'send sms')
  .parse(process.argv);
