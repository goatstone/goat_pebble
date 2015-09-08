 /* goatstone.robot.edflash.js : Jose Collas : 8.2015  
	A Cylon object that represents the robot edflash
 */
var Cylon = require('cylon');
var pstM2X = require('/home/goat/goat_pebble/src/goatstone/com/postM2X');
var express = require('express');

// express app to serve the robots web page, device stats messages and controls
var app = express();
app.use(express.static('public'));
app.get('/', function (req, res) {
  res.sendFile( '/home/goat/goat_pebble/public/index.html');
});
var server = app.listen(8000, '192.168.1.7', function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log(' edflash server  listening at http://%s:%s', host, port);
});
Cylon.api('socketio',
{
        host: '192.168.1.7',
        port: '3000'
});

// edflash the robot
Cylon.robot(
{	
	name: 'edflash',
	// This is how we define custom events that will be registered by the API.
	events: ['turned_on', 'turned_off', 'msg', 'log'],
	commands: function() {
    		return {
      			hello: this.hello,
			LEDOff: this.LEDOff,
			LEDOn: this.LEDOn,
                        LEDToggle: this.LEDToggle,
			rotate: this.rotate
    		};
  	},
	hello: function(){
		console.log('hello');
	},
	LEDToggle: function(){
		this.led2.toggle();
	},
	LEDOff: function(){
		this.led2.turnOff();
	},
	LEDOn: function(){
		this.led2.turnOn();
	},
	lastRotate: new Date().getTime(),
	rotate: function(val){
		var currT = new Date().getTime();
		var diff = currT - this.lastRotate;
                //console.log('rotate:  ', this.lastRotate, currT,    diff );
		// reject calls that are too close together
		if(diff < 50){
			//console.log('too many calls'); 
			return;
		}
		var currentAngle = this.servo.currentAngle();
		var a = (currentAngle > 180)? 0 :  currentAngle+15 ;
		this.lastRotate = currT; 
                this.servo.angle(a,function(err, val){
                        console.log('call back', val);
                });
	},
	connections:{
		edison:{adaptor: 'intel-iot'}
	},
	devices: {
		led2: {driver:'led', pin:4},
		//screen: {driver: 'upm-jhd1313m1'},
		button: {driver: 'button', pin:2},
		rotary: { driver: 'analogSensor', pin: 1, connection: 'edison', lowerLimit: 1, upperLimit: 179 },
		temperature: {driver: 'analogSensor', pin: 0},
		light: {driver: 'analogSensor', pin:3},
		sound: {driver: 'analogSensor', pin:2},
                touch: {driver: 'button', pin: 6},
		servo: {driver: 'servo', pin: 5, connection: "edison" },
		buzzer: {driver: 'direct-pin', pin: 7, connection: 'edison'}
	},	
	work: function(robot){
		var out = {};
		//robot.buzzer.digitalWrite(0);
		robot.touch.on('push', function(){
			console.log('touch...');
		});
		robot.sound.on('analogRead', function(d){
			out.sound = d;
		});
		robot.light.on('analogRead', function(d){
			out.light = d;
		});
		robot.temperature.on('analogRead', function(d){
			out.temperature = d;
		});
		var prev = 0;
		var prevRT = new Date().getTime();
		robot.rotary.on('analogRead', function(val){
			// limit the amout of signal from rotary dial
			// determine the direction of the rotation, call left or right on se
			var rDirection = (val-prev>0)? 'up': 'down';
			var driftMax = 10;
			if(Math.abs( val - prev)  > driftMax){				
				var currRT = new Date().getTime();
				var diff = currRT - prevRT;
 				if(diff<50){
					return;
				}
				prevRT = currRT;
				robot.rotate({source:'dial'});
			}
			prev = val;
		});
		robot.button.on('push', function(){
			robot.led2.toggle();
		});
		every((2).second(), function(){
			robot.emit('log', {source:'cylon', data: out})
			pstM2X.postM2X(out);
		});
	}	
});
Cylon.start();

