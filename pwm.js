var mraa = require('mraa')
var bNum = 0
//var LEDon
//var digLED = new mraa.Gpio( 4 ); 
var ledPWM = new mraa.Pwm(3)
ledPWM.enable(true)
ledPWM.write(0.1)
//digLED.dir(mraa.DIR_OUT)
//LEDon = true
blink()
function blink(){
    console.log('blink', bNum)
    ledPWM.write(bNum)
    bNum = (bNum >1.0)?0 : bNum + 0.05 
    setTimeout(function(){
	blink()
    }, 300)
}

console.log(' pem: ')
//    digLED.write( LEDon? 1 : 0 )
//    LEDon =  !LEDondigLED.write( LEDon? 1 : 0 )
