 /* pepple_edison : Jose Collas : 6.2015  */
var Cylon = require('cylon');
//var sd = require('/home/goat/goat_pebble/src/goatstone/display/setDisplay');
var pstM2X = require('/home/goat/goat_pebble/src/goatstone/com/postM2X');

var express = require('express');
var app = express();
app.use(express.static('public'));
app.get('/', function (req, res) {
  res.sendFile( '/home/goat/goat_pebble/public/index.html');
});
server = app.listen(8000, '192.168.1.7', function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log(' goatstone.server.one  listening at http://%s:%s', host, port);
});

Cylon.robot(
{	
	name: 'edflash',
	connections:{
		edison:{adaptor: 'intel-iot'}
	},
	devices: {
		led: {driver:'led', pin:4},
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
	work: function(my){
		var out = {};
		// Control
		//my.servo.angle(100);
		//my.buzzer.digitalWrite(0);
		//my.screen.setColor(255,150,0);

		my.touch.on('push', function(){
			console.log('touch...');
		});

		my.sound.on('analogRead', function(d){
			out.sound = d;
		});
		my.light.on('analogRead', function(d){
			out.light = d;
		});
		my.temperature.on('analogRead', function(d){
			out.temperature = d;
		});
		my.rotary.on('analogRead', function(val){
			//ms(my.servo, val);
			//my.screen.setColor(Math.round(data/5), 0, Math.round(data/5));
		});
		my.button.on('push', function(){
			my.led.toggle();
		});
		// Timer
		//every((1).second(), function(){
			//sd.setDisplay(my);
		//});
		every((2).second(), function(){		
			pstM2X.postM2X(out);
		});
	}	
});
Cylon.api('socketio',
{
	host: '192.168.1.7', 
	port: '3000'
});
Cylon.start();

function ms(servo, val) {
    var currentAngle = servo.currentAngle();
    var angle = val.fromScale(0, 1023).toScale(0,180) | 0;
    if (angle <= currentAngle - 3 || angle >= currentAngle + 3) {
      console.log("turning lock:", angle);
      servo.angle(angle);
    }
}
