var mraa = require('mraa')

function GPIO(pinN){
    this.p = new mraa.Gpio(2)
    this.p.dir(mraa.DIR_OUT)
}
GPIO.prototype.on = function(){
    this.p.write(1)
}
GPIO.prototype.off = function(){
    this.p.write(0)
}

module.exports = GPIO