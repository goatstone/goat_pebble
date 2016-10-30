var mraa = require('mraa')

function GPIO(pinN){
    if(!pinN) throw 'Pin Number Needed.'
    this.p = new mraa.Gpio(pinN)
    this.p.dir(mraa.DIR_OUT)
}
GPIO.prototype.on = function(){
    this.p.write(1)
}
GPIO.prototype.off = function(){
    this.p.write(0)
}
GPIO.prototype.blink = function(t){
    var t = t || 1000
    this.p.write(1)
    setTimeout(function(){
	this.p.write(0)
    }.bind(this), t)
}
module.exports = GPIO