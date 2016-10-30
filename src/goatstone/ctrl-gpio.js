var GPIOS = require('./board/gpios.js')

var pins = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
var running = true
var ran = 1000
var gpios = new GPIOS(pins)
var recurTime = 1000
var bt = 1000 // blinkTime
eng() 
function eng(){
    console.log(' - gpio - -  ', gpios.i, bt)
    bt = 2000
    var n = (Math.random()<0.5)? 1 : -1    
    gpios.nextTo(1).blink(4000)
    bt = 4000
    //gpios.nextTo(1).blink(bt)
    //blinkTime = Math.sqrt(blinkTime)
    //gpios.nextTo(1).blink(6000)
    //bt = (bt<=1000)? 6000  : bt - 1000
    ran = Math.floor( Math.random() * 6000 )
    if(running){
	setTimeout(function(){eng()}, recurTime)
    }
}
 