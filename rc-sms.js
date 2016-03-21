var program = require('commander');
var config = require('./config');
var rcsdk = require('./rcsdk');


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
        username: config.username, // phone number in full format
        extension: '', // leave blank if direct number is used
        password: config.password
    })
    .then(function(response) {
      rcsdk.platform().post('/account/~/extension/~/sms', {
        text: program.text,
        from: { phoneNumber: '17322764403' },
        to: [{ phoneNumber: program.number }],
      }).then(function() { console.log('sms sent'); })
        .catch(function(e) { console.log(e); });
    })
    .catch(function(e) {
        console.log(e.message  || 'Server cannot authorize user');
    });
