#! /usr/bin/env node


var program = require('commander');


program
  .version(require('./package.json').version)
  .command('sms', 'send sms')
  .command('call', 'make telephony call')
  .command('fax', 'send fax')
  .parse(process.argv);
