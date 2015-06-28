/* setDisplay : Jose Collas : 6.2015 */
//var Cylon = require('cylon');
//var querystring = require('querystring');
//var http = require('http');
//var request = require('request');
var msg = 'Welcome to the Pebble Accesory, PebbleFlash!';
var count = 0;
function setDisplay(my){
	console.log('update local display...', count);
	
	my.screen.setCursor(0, 4);
	var d = new Date();
	var dS = (d.getHours()) + ':' + (d.getMinutes()) + ':' + d.getSeconds();
	my.screen.write( dS );

	// write bottom half of screen
	my.screen.setCursor(1,0);
	my.screen.write('                ');
	my.screen.setCursor(1,0);
	//my.screen.write('XXX');
	var m = msg.substr(count, 20)
	my.screen.write(m);
	count = (count>30)? 0 : count + 2 ;       	     
}
exports.setDisplay = setDisplay;
