var SDK = require('ringcentral');
var config = require('./config');


var rcsdk = new SDK({ server: config.server,
  appKey: config.appKey,
  appSecret: config.appSecret });


module.exports = rcsdk;
