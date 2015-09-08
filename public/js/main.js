/* Edflash */
var Edflash = {
	control:{
		init:function(){
                        var  robot = io('http://192.168.1.7:3000/api/robots/edflash');
			var count = 0;
			var e = document.createElement('div');
			var e2  = document.createElement('div');
			e.innerHTML = '&nbsp;';
			e2.innerHTML = '&nbsp;';
			var message = document.querySelector('div.message');
			message.appendChild(e);
			message.appendChild(e2);

                        var rBtn = document.createElement('button');
                        rBtn.appendChild(document.createTextNode('Rotate'));
                        rBtn.addEventListener('click', function(){
                                robot.emit('rotate', {source:'api socke.io'});
                        });

                        var btn0 = document.createElement('button');
                        btn0.appendChild(document.createTextNode(' LED On'));
                        btn0.addEventListener('click', function(){
                                robot.emit('LEDOn');
                        });

			var btn = document.createElement('button');
			btn.appendChild(document.createTextNode(' LED Off'));
			btn.addEventListener('click', function(){
    				robot.emit('LEDOff');
			});

                        var btn2 = document.createElement('button');
                        btn2.appendChild(document.createTextNode('Toggle LED'));
                        btn2.addEventListener('click', function(){
                                robot.emit('LEDToggle');
                                robot.emit('msg', { data: 'pass some data to the listener'});
                        });

			document.body.appendChild(btn0);			
			document.body.appendChild(btn);
                        document.body.appendChild(btn2);
			document.body.appendChild(rBtn);
			robot.on('log', function(d){
				var str = 'edflash data: light: ' + d.data.light + ' Temperature: ' +
				d.data.temperature + ' Sound:' + d.data.sound + ' : ';				
				e2.innerHTML = str;
			})
      			robot.on('message', function(msg) {
        			var m = JSON.stringify(msg);
        			count++;
        			e.innerHTML = 'call count: ' +  count ;
      			});
		}	
	}
};
window.onload = function() {
	Edflash.control.init();
};
 
