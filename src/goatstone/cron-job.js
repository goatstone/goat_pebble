/* goatstone.mrra_bot.mrraBot : Control an Edison Intel board with the MRAA library : Jose Collas 10.2015 */
var https = require('https')
var mraa = require('mraa'); 
var async = require('async')
// gpio 
var dp4 = new mraa.Gpio( 4 ); 
dp4.dir(mraa.DIR_OUT)
dp4.write(1)
setTimeout( function(){dp4.write(0) }, 30000 )
var sVal = 20 // float btw 20 and 40
var isOnLED = 1; 
// analog 
var analogPin = new mraa.Aio(3); // light
var dial = new mraa.Aio(1) // dial
var sound = new mraa.Aio(2) 
var tempt =  new mraa.Aio(0)
var running = true; 
var runCount = 1;
    var h = 'api-m2x.att.com'
    var p = '/v2/devices/f80a6fbdb95f4b612afe23a20e62a988/updates/'
    var pack = {"values":{        	
        "light_level":[{timestamp:new Date(), "value":analogPin.read() }],
	"temperature":[{timestamp:new Date(), "value": tempt.read() }]
     }};
    var jsonP = JSON.stringify(pack)
var options2 = {
  hostname: h,
  port: 443,
  path: p,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-M2X-KEY' : 'ea05e4b0227f62ea40b3abc3547a0cf6'
  }
}  
var q = async.queue(function(task, callback) {
    console.log('hello ' + task.name);
    callback();
}, 2);
// add some items to the queue
q.push({name: 'foo'}, function(err) {
    console.log('finished processing foo');
});
q.push({name: 'bar'}, function (err) {
    console.log('finished processing bar');
});
loopEngine();
function loopEngine(){
    //    q.drain = function() {
    //	console.log('all items have been processed');
    //  }
    console.log('.......')    
    //    q.push({name: 'abc'+ new Date() }, function (err) {
    console.log('abc')
    var req = https.request(options2, function(res) {
	console.log('STATUS: ${res.statusCode}', res.statusCode );
//		    		setTimeout( function(){loopEngine()}, 1000 );
	res.setEncoding('utf8');
	res.on('data', function(chunk) {
	    console.log('BODY: ${chunk}`', chunk);
	});
	res.on('end', function() {
	    console.log('No more data in response.')
	})
    })
    req.on('error', function(e) {
	console.log('problem}', e);
    });
    req.write(jsonP)
    req.end()
    
  //  q.drain = function() {
//	console.log('all items have been processed');
  //  }  
    //    }
    
      if( running ){
    	//setTimeout( function(){loopEngine()}, 10000 );
    //	runCount++;
    //	if( runCount > 10 ){
    //running = false;
    //	}
    }
}
