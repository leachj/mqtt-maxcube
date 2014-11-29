var MaxCube = require('../maxcube');
var mqtt = require('mqtt')

var myMaxCube = new MaxCube('192.168.1.101', '62910');

client = mqtt.createClient(1883, 'localhost');

client.subscribe('maxcube-control');

myMaxCube.once('connected', function (cubeStatus) {
  console.log(cubeStatus);
  
  client.subscribe('maxcube-control');

	client.on('message', function (topic, message) {
  		console.log(message);
  		var address = message.split(" ")[0];
  		var temp = message.split(" ")[1];
  		console.log("setting "+address+" to "+temp);
		myMaxCube.setTemperature(address, temp);
	});
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
