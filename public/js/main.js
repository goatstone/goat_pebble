/* Edflash */
var Edflash = {
	control:{
		init:function(){
			var  device = io('http://192.168.1.7:3000/api/robots/edflash/devices/led');
			var count = 0;
			var e = document.createElement('div');
			var e2  = document.createElement('div');
			e.innerHTML = 'XXX';
			e2.innerHTML = 'AAAA';
			var message = document.querySelector('div.message');
			message.appendChild(e);
			message.appendChild(e2);
      			e.innerHTML = ' device.nsp: '+ device.nsp;
      			device.on('message', function(msg) {
        			var m = JSON.stringify(msg);
        			count++;
        			//console.log(m);                                   
        			e2.innerHTML = 'call count: ' +  count ;
      			});
	      		setInterval(function() {
        			device.emit('toggle');
      			}, 1000);
		}	
	}
};
window.onload = function() {
	Edflash.control.init();
};
 
