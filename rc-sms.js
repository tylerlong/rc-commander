var program = require('commander');
var config = require('./config');
var rcsdk = require('./rcsdk');
var errorHandler = require('./errorHandler');


program
  .version(require('./package.json').version)
  .option('-t, --text <text>', 'text of the sms')
  .option('-n, --number <number>', 'send to which number')
  .parse(process.argv);


if(program.text === undefined || program.number === undefined) {
  console.log('options required: -t <text> -n <number>');
  return;
}


console.log("sending sms...");


rcsdk.platform()
  .login({
      username: config.username,
      extension: '',
      password: config.password
  })
  .then(function(response) {
    rcsdk.platform().post('/account/~/extension/~/sms', {
      text: program.text,
      from: { phoneNumber: config.username },
      to: [{ phoneNumber: program.number }],
    })
      .then(function() { console.log('sms sent'); })
      .catch(errorHandler);
  })
  .catch(errorHandler);
