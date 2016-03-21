var program = require('commander');
var config = require('./config');
var rcsdk = require('./rcsdk');
var errorHandler = require('./errorHandler');


program
  .version(require('./package.json').version)
  .option('-n, --number <number>', 'call which number')
  .parse(process.argv);


if(program.number === undefined) {
  console.log('options required: -n <number>');
  return;
}


console.log("calling...");


var timeout = null;
var ringout = {
  from: { phoneNumber: config.username },
  to: { phoneNumber: program.number  },
  playPrompt: true
};

rcsdk.platform()
  .login({
      username: config.username, // phone number in full format
      extension: '', // leave blank if direct number is used
      password: config.password
  })
  .then(function(response){
    rcsdk.platform().post('/account/~/extension/~/ringout', ringout)
      .then(function(response){
        console.log(response.json().status.callStatus);
      })
      .catch(errorHandler);
  })
  .catch(errorHandler);
