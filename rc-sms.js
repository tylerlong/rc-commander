var program = require('commander');


program
  .version(require('./package.json').version)
  .option('-n, --number <number>', 'send to which number')
  .option('-t, --text <text>', 'text of the sms')
  .parse(process.argv);


console.log("sending sms...");


var SDK = require('ringcentral');
var fs = require('fs');

var config = JSON.parse(fs.readFileSync(process.env['HOME'] + '/.rc-commander.json', 'utf8'));
var rcsdk = new SDK({ server: config.server,
  appKey: config.appKey,
  appSecret: config.appSecret });

var platform = rcsdk.platform();

platform
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
