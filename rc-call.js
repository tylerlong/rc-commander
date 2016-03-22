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


var interval = null;
var ringout = {};

rcsdk.platform()
  .login({
      username: config.username,
      extension: '',
      password: config.password
  })
  .then(function(response){
    rcsdk.platform().post('/account/~/extension/~/ringout', {
      from: { phoneNumber: config.username },
      to: { phoneNumber: program.number  },
      playPrompt: true
    })
      .then(function(response){
        ringout = response.json();
        console.log('First status:', ringout.status.callStatus);
        interval = setInterval(function() {
          if(ringout.status && ringout.status.callStatus !== "InProgress") {
            console.log(ringout);
            clearInterval(interval);
          }
          rcsdk.platform().get(ringout.uri)
            .then(function(response){
              ringout = response.json();
              console.log('Current status:', ringout.status.callStatus);
            }).catch(errorHandler);
        }, 3000);
      })
      .catch(errorHandler);
  })
  .catch(errorHandler);


setTimeout(function() { // hangup
  clearInterval(interval);
  if(ringout.status && ringout.status.callStatus !== "InProgress") {
    rcsdk.platform().delete(ringout.uri).catch(errorHandler);
  }
}, 32000);
