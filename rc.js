var SDK = require('ringcentral');
var fs = require('fs');

var config = JSON.parse(fs.readFileSync(process.env['HOME'] + '/.rc-commander.json', 'utf8'));
var rcsdk = new SDK({ server: config.server,
  appKey: config.appKey,
  appSecret: config.appSecret });

var platform = rcsdk.platform();

rcsdk.platform()
    .login({
        username: config.username, // phone number in full format
        extension: '', // leave blank if direct number is used
        password: config.password
    })
    .then(function(response) {
      rcsdk.platform().post('/account/~/extension/~/sms', {
        text: 'hello world',
        from: { phoneNumber: '17322764403' },
        to: [{ phoneNumber: '147258369' }],
      }).then(function() { console.log('sms sent'); })
        .catch(function(e) { console.log(e); });
    })
    .catch(function(e) {
        console.log(e.message  || 'Server cannot authorize user');
    });
