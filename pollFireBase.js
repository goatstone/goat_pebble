/* pepple_edison : Jose Collas : 6.2015 */
var Cylon = require('cylon');
var querystring = require('querystring');
var http = require('http');
var request = require('request');

function pollFireBase(my){
			//console.log('poll the server - - - ');
			var fullURL =  'https://pebblecontrolsea.firebaseio.com/feed.json';
			var options = {
				url: fullURL,
  				headers: {
					'User-Agent': 'request'
	  			}
			};
			function callback(error, response, body) {
				//console.log('callllll');
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
exports.pollFireBase = pollFireBase;
