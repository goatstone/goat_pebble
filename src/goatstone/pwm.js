var mraa = require('mraa')

function PWM(pinN){
    if(!pinN) throw 'Pin Number Needed.'
    this.pinN = pinN
    this.pin = new mraa.Pwm(pinN)
    this.pin.enable(true)
}
PWM.prototype.go = function (duty, duration){
    var duty = duty || 1.0
    this.pin.write( duty )
}

module.exports = PWM