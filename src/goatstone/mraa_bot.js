/* goatstone.mrra_bot.mrraBot : Control an Edison Intel board with the MRAA library : Jose Collas 10.2015 */
var pm = require('/home/goat/mraa_bot/postM2X');
// mraa library 
var mraa = require('mraa'); 
// gpio 
var digitalPinLED = new mraa.Gpio( 4 ); 
var serv =  new mraa.Pwm(5)
serv.enable(true)
serv.period_us( 19000000 )
var sVal = 20 // float btw 20 and 40

// turn off an LED
var dLED = new mraa.Gpio( 0 )
dLED.write( 0 )
digitalPinLED.dir( mraa.DIR_OUT ); 
digitalPinLED.write( 1 )
var isOnLED = 1; 
// analog 
var analogPin = new mraa.Aio(3); // light
var dial = new mraa.Aio(1) // dial
var sound = new mraa.Aio(2) 
var tempt =  new mraa.Aio(0)

var running = true; 
var runCount = 1;
//pm.postM2X( {light:0} );
loopEngine();
function loopEngine(){
    var val = parseFloat( '0.' + sVal  )
    console.log( val, 'd:', dial.read(), ' sound: ', sound.read(), tempt.read() )    
    serv.write( val )
  //sVal = ( sVal >= 40 )? 20 :  sVal + 10 
    if(dial.read() > 500){
	sVal = 41
    }
    else{ sVal = 20 }

    digitalPinLED.write( isOnLED );
 // pm.postM2X( { light:analogPin.read() } );
    console.log( ' - - '+ analogPin.read(), '::', digitalPinLED.read() );
  
    if( running ){
	setTimeout( loopEngine, 500 );
	isOnLED = digitalPinLED.read() === 1 ? 0 : 1;
	runCount++;
	if( runCount > 10 ){
	    //running = false;
	}
  }
}
