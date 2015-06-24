/* pepple_edison : Jose Collas : 6.2015 */
var Cylon = require('cylon');
var querystring = require('querystring');
var http = require('http');
Cylon.robot(
{
	connections:{
		edison:{adaptor: 'intel-iot'}//,
		//m2x: { adaptor: 'm2x', apiKey: 'ed685207dcc9b6d9914381dae7f717c5', feedId: '815191bff4d7dd4ad5c92fa4cc7cdd8d'}
	},
	devices: {
		led: {driver:'led', pin:4},
		screen: {driver: 'upm-jhd1313m1'},
		button: {driver: 'button', pin:2},
		//touch: { driver: 'button', pin: 7, connection: 'edison' }, 
		rotary: { driver: 'analogSensor', pin: 1, connection: 'edison', lowerLimit: 1, upperLimit: 179 },
		temperature: {driver: 'analogSensor', pin: 0},
		light: {driver: 'analogSensor', pin:3},
		sound: {driver: 'analogSensor', pin:2}
	    	//m2x: { driver: 'm2x' }
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
  		//my.touch.on('push', function() {
		//	console.log('touch...');
		//});
		//my.touch.on('release', function(){
		//	console.log('release...');
		//});
		every((2).second(), function(){
			//console.log('update local display...');
                        var o = Object.keys(out).map(function(e, i){
                                return ' '+e.substr(0,1)+':'+out[e];
                        });
                        my.screen.setCursor(0, 0);
                        my.screen.write(o.slice(0,2).join("") );
                        my.screen.setCursor(1,0);
                        my.screen.write(o.slice(2,3).join(""));
		});
		every((2).second(), function(){	
			var h = 'api-m2x.att.com';
			var p = '/v2/devices/815191bff4d7dd4ad5c92fa4cc7cdd8d/updates/';
			var headers = {
			        host: h,
			        port: 80,
			        method: 'POST',
			        path: p,
			        headers: {
					'Content-Type' : 'application/json',
					'X-M2X-KEY' : 'ed685207dcc9b6d9914381dae7f717c5'
			        }
    			};
			var httpRqst = http.request(headers, function(r){
				var cont = '';
				r.on('data', function(d) {
					cont += d;
	    			});
				r.on('end', function(d){
					console.log('end...', cont);
				});
			});

var analogValue = my.temperature.analogRead();
var voltage = (analogValue * 5.0) / 1024;
var temperature = (voltage - 0.5) * 100;
console.log('t', temperature);

			var pack = {"values":{
				"temperature":[{timestamp:new Date(), "value":out.temperature}],
                                "sound":[{timestamp:new Date(), "value":out.sound}],
                                "light":[{timestamp:new Date(), "value":out.light}]
				}
			};
			httpRqst.write(JSON.stringify(pack));
			httpRqst.end();
		});
	}
}).start();
