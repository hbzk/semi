//=========== Stop watch
var	clsStopwatch = function(lapTime) {
	var	startAt	= 0;	// Time of last start / resume. (0 if not running)
	var	lapTime;	// Time on the clock when last stopped in milliseconds
	var	now	= function() {
		return (new Date()).getTime(); 
	}; 
	this.start = function() {
		startAt	= startAt ? startAt : now();
	};
	this.stop = function() {
		lapTime	= startAt ? lapTime + now() - startAt : lapTime;
		startAt	= 0; // Paused
	};
	this.reset = function() {
		lapTime = startAt = 0;
	};
	this.time = function() {
		return lapTime + (startAt ? now() - startAt : 0); 
	};
};

var x = new clsStopwatch(0);
var $time;
var clocktimer;

function timer_update(id) {
	$id.innerHTML = formatTime(x.time());
}

function timer_stop() {
	x.stop();
	clearInterval(clocktimer);
}

function timer_reset() {
	timer_stop();
	x.reset();
	timer_update();
}

//타이머 출력 함수
function timer_doing(id) {
	lapTime = 1000000;
	
	$id = document.getElementById(id);
	$id.innerHTML = formatTime(x.time());
	clocktimer = setInterval("timer_update("+ id + ")", 1);
	x.start();
}

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
	// 출력 형태 제어
	if (h < 1) {
		newTime = pad(m, 2) + ':' + pad(s, 2);
	} else {
		newTime = pad(h, 2) + ':' + pad(m, 2);
	}
	return newTime;
}
