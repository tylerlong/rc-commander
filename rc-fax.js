var program = require('commander');
var config = require('./config');
var rcsdk = require('./rcsdk');
var errorHandler = require('./errorHandler');
var FormData = require('form-data');
var fs = require('fs');


program
  .version(require('./package.json').version)
  .option('-f, --file <file>', 'file to send')
  .option('-t --text <text>', 'text to send')
  .option('-n, --number <number>', 'send to which number')
  .parse(process.argv);


if(program.text == undefined || program.file === undefined || program.number === undefined) {
  console.log('options required: -t <text> -f <file> -n <number>');
  return;
}

console.log('sending fax...');

var formData = new FormData();

var body = {
  to: [{ phoneNumber: program.number }],
  faxResolution: 'High'
};
formData.append('json', new Buffer(JSON.stringify(body)),
  {filename: 'request.json', contentType: 'application/json'});

formData.append('attachment', new Buffer(program.text),
  { filename: 'text.txt', contentType: 'text/plain' });

formData.append('attachment', fs.createReadStream(program.file),
  { filename: 'text.pdf', contentType: 'application/pdf',
    knownLength: fs.statSync(program.file)['size'] });

rcsdk.platform()
  .login({
      username: config.username,
      extension: '',
      password: config.password
  })
  .then(function(response) {
    rcsdk.platform().post('/account/~/extension/~/fax', formData)
      .then(function(){
        console.log('fax sent');
      }).catch(errorHandler);
  })
  .catch(errorHandler);
