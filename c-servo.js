var mraa = require('mraa')
var bNum = 0
var cServoPWM = new mraa.Pwm(3)
cServoPWM.enable(true)
cServoPWM.write(0.1)
var time = 1000
driveServo()
function driveServo(){
    console.log('bli    nk', bNum)
    cServoPWM.write(bNum)
    bNum = (bNum >1.0)?0 : bNum + 0.2 
    time = (bNum === 0 )? 5000 : 1000 
    setTimeout(function(){
	driveServo()
    }, time)
}