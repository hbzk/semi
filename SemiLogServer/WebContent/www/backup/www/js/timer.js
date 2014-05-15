function dragDrop(){
	var dragSrc, dragImg, dropSrc, draggingEleId,droppedEleClass, wholeTag, mainSrc;

	var mainTag = $(".droppableMain")[0].outerHTML;

	console.log("mainTag=="+ mainTag);


	$( ".draggingItem" ).draggable({

		start: function(event, ui) {

			var Startpos = $(this).offset();

			pos_left = Startpos.left; 
			pos_top = Startpos.top; 
			$(this).removeClass('ui-draggable-dragging');
			draggingEleId = event.target.getAttribute('id');
			droppedEleClass = event.target.getAttribute('class');
			wholeTag = $(this)[0].outerHTML;
			dragImg = $(this).find('img');
			console.log(dragImg);
			dragSrc = $(this).find('img').attr('src');
			$(this).css('z-index','999');
			countC();

			//**wholeTag

		},
		stop: function(event, ui) {
			// Show dropped position.
			var Stoppos = $(this).offset();

			$(this).css('position', "fixed");
			$(this).css('left', pos_left);
			$(this).css('top', pos_top); 
			$(this).css('z-index','0');
			countC();
		}
	});


	$( ".droppableMain" ).droppable({
		accept: ".draggingItem",
		drop: function( event, ui ) {
			if($(".draggingItem").length==6){
				mainSrc=$(this).find('img').attr('src');
				dropSrc = $(this).find('img').attr('src',dragSrc);
				console.log("droppable=>"+ dropSrc);
				dragImg.removeAttr('src');
				document.getElementById(draggingEleId).remove(); //drag된 아이템 객체 지우기
				
				// 타이머 출력
				doing('result');
				$('#layout').find('#result').addClass(droppedEleClass)
					.removeClass('draggingItem ui-widget-content circular ui-draggable');
				

				countC();
				console.log("wholeTag====="+wholeTag);
				$("#droppableMain").on('click',function(){
					if($(".draggingItem").length==5){
						$(this).find('img').attr('src',mainSrc);
						$(wholeTag).appendTo("#iconMainDiv");
					}
					dragDrop();
				});

			}
		}

	});

	function countC(){ 
		var length = $(".draggingItem").length;

		console.log("lengthClass====="+length);
	}

	function tagInit(){
		wholeTag;
	}

}

window.onload=dragDrop;


//=========== Stop watch
var	clsStopwatch = function() {
	var	startAt	= 0;	// Time of last start / resume. (0 if not running)
	var	lapTime	= 0;	// Time on the clock when last stopped in milliseconds
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
	// 출력 형태 제어
	if (h < 1) {
		newTime = pad(m, 2) + ':' + pad(s, 2);
	} else {
		newTime = pad(h, 2) + ':' + pad(m, 2);
	}
	return newTime;
}


function update(id) {
	$id.innerHTML = formatTime(x.time());
}
function stop() {
	x.stop();
	clearInterval(clocktimer);
}
function reset() {
	stop();
	x.reset();
	update();
}

//타이머 출력 함수
function doing(id) {
	$id = document.getElementById(id);
	$id.innerHTML = formatTime(x.time());
	clocktimer = setInterval("update("+ id+ ")", 1);
	x.start();
}

