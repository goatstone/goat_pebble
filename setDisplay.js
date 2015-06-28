/* setDisplay : Jose Collas : 6.2015 */
//var Cylon = require('cylon');
//var querystring = require('querystring');
//var http = require('http');
//var request = require('request');

function setDisplay(my){
	//console.log('update local display...');
	my.screen.setCursor(0, 4);
	var d = new Date();
	var dS = (d.getHours()) + ':' + (d.getMinutes()) + ':' + d.getSeconds();
	my.screen.write( dS );            
}
exports.setDisplay = setDisplay;
