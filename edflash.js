var m = require('mraa'); 
//var LCD  = require ('jsupm_i2clcd');
var LCD  = require ('jsupm_i2clcd');  
console.log('MRAA Version: ' + m.getVersion()); //write the mraa version to the console
var analogPin0 = new m.Aio(0); //setup access analog inpuput pin 0
var x = new m.I2c(3);
x.address(0x62)
x.writeReg(0, 0)
x.writeReg(1, 0)
//u = new m.Uart(0);
console.log(x);

//engine();
function engine(){
	var aValue = analogPin0.read(); //read the value of the analog pin
	var aValueFloat = analogPin0.readFloat(); //read the pin value as a float
	console.log('analog : ', aValue, aValueFloat );
	setTimeout(function(){
		engine();
	}, 1000);
}
