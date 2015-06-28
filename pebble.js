/* pepple_edison : Jose Collas : 6.2015 */
var Cylon = require('cylon');
var querystring = require('querystring');
var http = require('http');
var request = require('request');
var sd = require('./setDisplay');

Cylon.robot(
{
	connections:{
		edison:{adaptor: 'intel-iot'}
	},
	devices: {
		led: {driver:'led', pin:4},
		screen: {driver: 'upm-jhd1313m1'},
		button: {driver: 'button', pin:2},
		rotary: { driver: 'analogSensor', pin: 1, connection: 'edison', lowerLimit: 1, upperLimit: 179 },
		temperature: {driver: 'analogSensor', pin: 0},
		light: {driver: 'analogSensor', pin:3},
		sound: {driver: 'analogSensor', pin:2}
	},
	work: function(my){
		var out = {};
		// Control
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
			//my.screen.setColor(Math.round(data/5), 0, Math.round(data/5));
		});
		my.button.on('push', function(){
			my.led.toggle();
		});
		// Timer
		every((1).second(), function(){sd.setDisplay(my);});
		every((2).second(), function(){pollFireBase(my);});
		every((1).second(), function(){sendData(my, out);});
	}	
}).start();


function pollFireBase(my){
			console.log('poll the server - - - ');
			var fullURL =  'https://pebblecontrolsea.firebaseio.com/feed.json';
			var options = {
				url: fullURL,
  				headers: {
					'User-Agent': 'request'
	  			}
			};
			function callback(error, response, body) {
				console.log('callllll');
				if (!error && response.statusCode == 200) {
   					var info = JSON.parse(body);
					//if(typeof info.color !== 'undefined'){
					//console.log('color');
					//info.color = 'green';
					var color = [150, 150, 150];
					if(info.color === 'blue'){
						color = [0,0,255];
					}
					else if(info.color === 'white'){
                        			color = [255,255,255];
					}
                			else if(info.color === 'red'){
                        			color = [255,0,0];
                			}
               	 			else if(info.color === 'green'){
                        			color = [0,255,0];
                			}		
					my.screen.setColor.apply(this, color);
				}
			}
        		request(options, callback);
}

function sendData(my, out){
			var h = 'api-m2x.att.com';
			var p = '/v2/devices/815191bff4d7dd4ad5c92fa4cc7cdd8d/updates/';
			var headers = {
			        host: h,
			        port: 443,
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
			// console.log('t', temperature);
			var pack = {"values":{
				"temperature":[{timestamp:new Date(), "value":out.temperature}],
                                "sound":[{timestamp:new Date(), "value":out.sound}],
                                "light":[{timestamp:new Date(), "value":out.light}]
				}
			};
			//httpRqst.write(JSON.stringify(pack));
			//httpRqst.end();
}
/*
function setDisplay(my){
	console.log('update local display...');
	my.screen.setCursor(0, 4);
	var d = new Date();
	var dS = (d.getHours()) + ':' + (d.getMinutes()) + ':' + d.getSeconds();
	my.screen.write( dS );            
}
*/
