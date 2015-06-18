/* pepple_edison : Jose Collas : 6.2015 */
var Cylon = require('cylon');

Cylon.robot(
{
	connections:{edison:{adaptor: 'intel-iot'}},
	devices: {led: {driver:'led', pin:4}},
	work: function(my){
		every((1).second(), my.led.toggle)
	}
}).start();

