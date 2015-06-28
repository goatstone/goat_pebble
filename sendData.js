/* pepple_edison : Jose Collas : 6.2015 */
var Cylon = require('cylon');
var querystring = require('querystring');
var http = require('http');
var request = require('request');
	   
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
