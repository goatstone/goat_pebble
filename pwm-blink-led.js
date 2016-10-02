var mraa = require('mraa')
var bNum = 0
//var LEDon
//var digLED = new mraa.Gpio( 4 ); 
var ledPWM = new mraa.Pwm(3)
ledPWM.enable(true)
ledPWM.write(0.1)
//digLED.dir(mraa.DIR_OUT)
//LEDon = true
var time = 1000
blink()
function blink(){
    console.log('bli    nk', bNum)
    ledPWM.write(bNum)
    bNum = (bNum >1.0)?0 : bNum + 0.2 
    time = (bNum === 0 )? 15000 : 1000 
    setTimeout(function(){
	blink()
    }, time)
}

console.log(' pem: ')
//    digLED.write( LEDon? 1 : 0 )
//    LEDon =  !LEDondigLED.write( LEDon? 1 : 0 )
