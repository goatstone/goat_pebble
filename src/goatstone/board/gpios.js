var GPIO = require('./gpio.js')
function GPIOS(pins){
    this.gpios = []
    pins.forEach(function(x){
	this.gpios.push(new GPIO(x))
    }.bind(this))
    this.l = [1,2,3]
    this.i = 0
}
GPIOS.prototype.nextTo = function(direction){
    this.i = this.i + direction
    this.i = (this.i < 0)? this.gpios.length-1 : this.i
    this.i = (this.i >= this.gpios.length)? 0 : this.i
    return this.gpios[this.i]
}
GPIOS.prototype.allOn = function(){
    var i = 0;
    var self = this;
    function gEng(){
	self.gpios[i].on()
	i++
	if(i < self.gpios.length){
	    setTimeout(gEng, 0)
	    //gEng()
	}
    }
    gEng()
}
GPIOS.prototype.allOff = function(){
    var i = 0
    var self = this;
    (function offEng(){
	self.gpios[i].off()
	i++
	if(i < self.gpios.length){
	    setTimeout(offEng, 0)
	    //offEng()
	}
    })()
}
GPIOS.prototype.blink = function(n, t){
    var g = this.gpios[n]
    g.on()
    setTimeout(function(){g.off()}, t)
}
module.exports = GPIOS