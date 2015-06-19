/* pepple_edison : Jose Collas : 6.2015 */
var Cylon = require('cylon');
Cylon.robot(
{
	connections:{
		edison:{adaptor: 'intel-iot'}
	},
	devices: {
		led: {driver:'led', pin:4},
		screen: {driver: 'upm-jhd1313m1'},
		button: {driver: 'button', pin:2},
		touch: { driver: 'button', pin: 7, connection: 'edison' }, 
		rotary: { driver: 'analogSensor', pin: 1, connection: 'edison', lowerLimit: 1, upperLimit: 179 },
		temperature: {driver: 'analogSensor', pin: 0},
		light: {driver: 'analogSensor', pin:3},
		sound: {driver: 'analogSensor', pin:2}
	},
	work: function(my){
		var out = {};
		my.screen.setColor(255,150,0);
		my.sound.on('analogRead', function(d){
			out.sound = d;
		});
		my.light.on('analogRead', function(d){
			out.light = d;
		});
		my.temperature.on('analogRead', function(d){
			out.temperature = d;
		});
		my.rotary.on('analogRead', function(data){
			my.screen.setColor(255, 0, Math.round(data/5));
		});
		my.button.on('push', function(){
			my.led.toggle();
		});
  		my.touch.on('push', function() {
			console.log('touch...');
		});
		my.touch.on('release', function(){
			console.log('release...');
		});
		every((2).second(), function(){	
			var o = Object.keys(out).map(function(e, i){
				return ' '+e.substr(0,1)+':'+out[e];
			});
			my.screen.setCursor(0, 0);
			my.screen.write(o.slice(0,2).join("") );
			my.screen.setCursor(1,0);
			my.screen.write(o.slice(2,3).join(""));
		});
	}
}).start();
