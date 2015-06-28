/* pepple_edison : Jose Collas : 6.2015 */
var Cylon = require('cylon');
var querystring = require('querystring');
//var http = require('http');
var request = require('request');
	   
function postM2X( out){
			//console.log('postM2X', out);
                        var h = 'api-m2x.att.com';
                        var p = '/v2/devices/815191bff4d7dd4ad5c92fa4cc7cdd8d/updates/';
                        var pack = {"values":{
                                "temperature":[{timestamp:new Date(), "value":out.temperature}],
                                "sound":[{timestamp:new Date(), "value":out.sound}],
                                "light":[{timestamp:new Date(), "value":out.light}]
                                }
                        };
                        var jsonP = JSON.stringify(pack);
                        var options = {
                                url: 'https://'+ h + p,
                                port: 443,
                                method:'POST',
                                body: jsonP,
                               headers: {
                                        'Content-Type' : 'application/json',
                                        'X-M2X-KEY' : 'ed685207dcc9b6d9914381dae7f717c5'
                                }
                        };
                        request(options, function(e, r, b){
                                var s = JSON.stringify(Object.keys(r));
                                console.log('r:: ', r.body);
                        });


/*
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
				r.on('error', function(e){console.log('e', e);});
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
			//console.log(JSON.stringify(pack));
			var s = JSON.stringify(pack);
			httpRqst.write(s);
			httpRqst.end();
*/
}
exports.postM2X = postM2X;
