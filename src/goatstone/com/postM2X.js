/* pepple_edison : Jose Collas : 6.2015 */
var request = require('request');	   
function postM2X( out){
	//console.log('postM2X', out);
	var h = 'api-m2x.att.com';
        var p = '/v2/devices/815191bff4d7dd4ad5c92fa4cc7cdd8d/updates/';
        var pack = {"values":
		{
        	"temperature":[{timestamp:new Date(), "value":out.temperature}],
         	"sound":[{timestamp:new Date(), "value":out.sound}],
                "light":[{timestamp:new Date(), "value":out.light}]
                }};
         var jsonP = JSON.stringify(pack);
         var options = {
      		url: 'https://'+ h + p,
                port: 443,
                method:'POST',
                body: jsonP,
                headers: {
                	'Content-Type' : 'application/json',
                        'X-M2X-KEY' : 'ed685207dcc9b6d9914381dae7f717c5'
                }};
         request(options, function(e, r, b){
         	var s = JSON.stringify(Object.keys(r));
         	console.log('r:: ', r.body);
         });
}
exports.postM2X = postM2X;
