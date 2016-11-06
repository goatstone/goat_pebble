var mraa = require('mraa') 
var running = true
var pins = [0,1,2,3,4,5]
var gs = []
var intervalTime = 2000
pins.forEach(function(x){
	gs.push(new mraa.Aio(x))
})
loopEngine()
function loopEngine(){
	gs.forEach(function(x, i){
		var v = x.read()
		console.log( i, 'v: ', v)
	})
    	if(running){
    		setTimeout(function(){loopEngine()}, intervalTime)
    	}
}
