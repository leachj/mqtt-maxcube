var MaxCube = require('../maxcube');
var mqtt = require('mqtt')

var myMaxCube = new MaxCube('192.168.1.101', '62910');

client = mqtt.createClient(1883, 'localhost');

client.subscribe('maxcube-control');

myMaxCube.once('connected', function (cubeStatus) {
  console.log(cubeStatus);
});

myMaxCube.once('metadataUpdate', function (metadata) {
  console.log(metadata);
});

myMaxCube.on('configurationUpdate', function (configuration) {
  console.log(configuration);
});

myMaxCube.on('statusUpdate', function (devicesStatus) {
  console.log(devicesStatus);
  client.publish('maxcube-status', JSON.stringify(devicesStatus));
});
