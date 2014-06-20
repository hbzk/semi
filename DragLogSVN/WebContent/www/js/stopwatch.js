//	Simple example of using private variables
//
//	To start the stopwatch:
//		obj.start();
//
//	To get the duration in milliseconds without pausing / resuming:
//		var	x = obj.time();
//
//	To pause the stopwatch:
//		var	x = obj.stop();	// Result is duration in milliseconds
//
//	To resume a paused stopwatch
//		var	x = obj.start();	// Result is duration in milliseconds
//
//	To reset a paused stopwatch
//		obj.stop();
//
var	clsStopwatch = function() {
		// Private vars
		var	startAt	= 0;	// Time of last start / resume. (0 if not running)
		var	lapTime = 0;	// Time on the clock when last stopped in milliseconds
 
		var	now	= function() {
				return (new Date()).getTime(); 
			}; 
 
		// Public methods
		// Start or resume
		this.start = function(lap) {
				lapTime = lap;
				startAt	= startAt ? startAt : now();
			};
 
		// Stop or pause
		this.stop = function() {
				// If running, update elapsed time otherwise keep it
				lapTime	= startAt ? lapTime + now() - startAt : lapTime;
				startAt	= 0; // Paused
			};
 
		// Reset
		this.reset = function() {
				lapTime = startAt = 0;
			};
 
		// Duration
		this.time = function() {
				return lapTime + (startAt ? now() - startAt : 0); 
			};
	};
 
var x = new clsStopwatch();
var $time;
var clocktimer;
 
function pad(num, size) {
	var s = "0000" + num;
	return s.substr(s.length - size);
}
 
function formatTime(time) {
	var h = m = s = ms = 0;
	var newTime = '';
 
	h = Math.floor( time / (60 * 60 * 1000) );
	time = time % (60 * 60 * 1000);
	m = Math.floor( time / (60 * 1000) );
	time = time % (60 * 1000);
	s = Math.floor( time / 1000 );
	ms = time % 1000;
 
	//newTime = pad(h, 2) + ':' + pad(m, 2) + ':' + pad(s, 2) + ':' + pad(ms, 3);
	// 출력 형태 제어
	if (h < 1) {
		newTime = pad(m, 2) + ':' + pad(s, 2);
	} else {
		newTime = pad(h, 2) + ':' + pad(m, 2);
	}
	return newTime;
}
 
function stopwatch_update() {
	$time.innerHTML = formatTime(x.time());
}

/*function stopwatch_show() {
	$time = document.getElementById('timer');
	stopwatch_update();
}
function stopwatch_start() {
	clocktimer = setInterval("stopwatch_update()", 1);
	x.start(100000);
}
function stopwatch_stop() {
	x.stop();
	clearInterval(clocktimer);
}
*/
function stopwatch_reset() {
	x.stop();
	clearInterval(clocktimer);
	x.reset();
	stopwatch_update();
}

function stopwatch_doing(lap) {
	$time = document.getElementById('timer');
	clocktimer = setInterval("stopwatch_update()", 1);
	x.start(lap);
}