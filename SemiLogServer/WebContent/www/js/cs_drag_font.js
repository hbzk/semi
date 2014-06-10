/* timer */
var now = new Date();
var minute = now.getMinutes().toString();
var second = now.getSeconds().toString();
minute = 00;
second = 00;
end=0;

var dragIcon;
var icons;
var defaultValue;
/* ------- */


var startIcon, lastIcon, lastDragger, lastDraggerClass; // 드래그 관련 변수

// DB 관련 변수
var dbLoad;
var actionName, startTime, endTime, resultWhile;
var iconName, defaultTime;
var db = window.openDatabase("Database", "1.0", "LogDB", 2 * 1024 * 1024);

$(window).load(function(){
	db_init(); // DB 초기화
	db_init_reSet();
	db_init_time();  // DB 디폴트시간 저장		

	
	
	
	
	
	startIcon = $('#start').html();
	dragdrop_doing();
	dragdrop_drop();
	
	$('#middle').mouseup(function(){ // 미들 클릭시 초기화
		dragdrop_timerCheck();
		
		/* 타이머 초기화 */
		
		clearTimeout(timeClock);
		
		
		/* ---- */
	});
	

	
	
	$(".drag").click(function(){
		
		var clickIcon = $(this).find('i')[0].className;
		//console.log(clickIcon);
		db.transaction(function(tx) {
			// tx.executeSql('drop table if exists ACTION'); // DB 초기화
			tx.executeSql('INSERT or REPLACE into ICONSTIME (ICON_NAME, CLASS_NAME) VALUES ("lastclick", ?)', [clickIcon]);
		});
		
		
	
		setInterval(function(){
			location.href = "functionEdit.html";
		}, 3);
		

	});
	
	
	
	
	
		

	
	
	

});




function db_init() {
	db.transaction(function(tx) {
		// tx.executeSql('drop table if exists ACTION'); // DB 초기화
		tx.executeSql('create table if not exists ACTION (id integer primary key, TITLE text, START_TIME date, END_TIME date, WHILE integer)');
	});
}

function db_insertQuery() {
	db.transaction(function(tx) {
		tx.executeSql('insert into ACTION (TITLE, START_TIME, END_TIME, WHILE) VALUES (?,?,?,?)', [actionName, startTime, endTime, resultWhile], function(tx, res) {
		   tx.executeSql('select * from ACTION;', [], function(tx, res) {
		     //console.log('res.rows.length --> ' + res.rows.length);
		   });
		 }, function(e) {
		   //console.log("ERROR: " + e.message);
		 });
	});
}


// 타이머

function db_init_time() {
	db.transaction(function(tx) {
		tx.executeSql('drop table if exists ICONSTIME'); // DB 초기화
		tx.executeSql('create table if not exists ICONSTIME (NO integer primary key, ICON_NAME text unique, CLASS_NAME text, TIMER_VAL integer)');
		
		
tx.executeSql('INSERT or REPLACE into ICONSTIME (ICON_NAME, CLASS_NAME, TIMER_VAL) VALUES (?,?,?)', ['headphones', 'fa fa-headphones', 70]);
tx.executeSql('INSERT or REPLACE into ICONSTIME (ICON_NAME, CLASS_NAME, TIMER_VAL) VALUES (?,?,?)', ['music', 'fa fa-music', 30]);
tx.executeSql('INSERT or REPLACE into ICONSTIME (ICON_NAME, CLASS_NAME, TIMER_VAL) VALUES (?,?,?)', ['automobile', 'fa fa-automobile', 20]);
tx.executeSql('INSERT or REPLACE into ICONSTIME (ICON_NAME, CLASS_NAME, TIMER_VAL) VALUES (?,?,?)', ['phone', 'fa fa-phone', 50]);
tx.executeSql('INSERT or REPLACE into ICONSTIME (ICON_NAME, CLASS_NAME, TIMER_VAL) VALUES (?,?,?)', ['banknote', 'li li_banknote', 80]);
tx.executeSql('INSERT or REPLACE into ICONSTIME (ICON_NAME, CLASS_NAME, TIMER_VAL) VALUES (?,?,?)', ['comment', 'fa fa-comment', 50]);
tx.executeSql('INSERT or REPLACE into ICONSTIME (ICON_NAME, CLASS_NAME, TIMER_VAL) VALUES (?,?,?)', ['dribbble', 'fa fa-dribbble', 40]);
tx.executeSql('INSERT or REPLACE into ICONSTIME (ICON_NAME, CLASS_NAME, TIMER_VAL) VALUES (?,?,?)', ['plane', 'fa fa-plane', 65]);
tx.executeSql('INSERT or REPLACE into ICONSTIME (ICON_NAME, CLASS_NAME, TIMER_VAL) VALUES (?,?,?)', ['gamepad', 'fa fa-gamepad', 35]);
tx.executeSql('INSERT or REPLACE into ICONSTIME (ICON_NAME, CLASS_NAME, TIMER_VAL) VALUES (?,?,?)', ['puzzle', 'fa fa-puzzle-piece', 22]);
tx.executeSql('INSERT or REPLACE into ICONSTIME (ICON_NAME, CLASS_NAME, TIMER_VAL) VALUES (?,?,?)', ['beer', 'fa fa-beer', 15]);
tx.executeSql('INSERT or REPLACE into ICONSTIME (ICON_NAME, CLASS_NAME, TIMER_VAL) VALUES (?,?,?)', ['glass', 'fa fa-glass', 77]);
tx.executeSql('INSERT or REPLACE into ICONSTIME (ICON_NAME, CLASS_NAME, TIMER_VAL) VALUES (?,?,?)', ['video', 'li li_video', 50]);
tx.executeSql('INSERT or REPLACE into ICONSTIME (ICON_NAME, CLASS_NAME, TIMER_VAL) VALUES (?,?,?)', ['hospital', 'fa fa-hospital-o', 05]);
tx.executeSql('INSERT or REPLACE into ICONSTIME (ICON_NAME, CLASS_NAME, TIMER_VAL) VALUES (?,?,?)', ['cutlery', 'fa fa-cutlery', 96]);
tx.executeSql('INSERT or REPLACE into ICONSTIME (ICON_NAME, CLASS_NAME, TIMER_VAL) VALUES (?,?,?)', ['desktop', 'fa fa-desktop', 56]);
tx.executeSql('INSERT or REPLACE into ICONSTIME (ICON_NAME, CLASS_NAME, TIMER_VAL) VALUES (?,?,?)', ['moon', 'fa fa-moon-o', 45]);
tx.executeSql('INSERT or REPLACE into ICONSTIME (ICON_NAME, CLASS_NAME, TIMER_VAL) VALUES (?,?,?)', ['mobile', 'fa fa-mobile', 52]);
tx.executeSql('INSERT or REPLACE into ICONSTIME (ICON_NAME, CLASS_NAME, TIMER_VAL) VALUES (?,?,?)', ['coffee', 'fa fa-coffee', 54]);
tx.executeSql('INSERT or REPLACE into ICONSTIME (ICON_NAME, CLASS_NAME, TIMER_VAL) VALUES (?,?,?)', ['tv', 'li li_tv', 45]);
tx.executeSql('INSERT or REPLACE into ICONSTIME (ICON_NAME, CLASS_NAME, TIMER_VAL) VALUES (?,?,?)', ['shirt', 'li li_t-shirt', 65]);
tx.executeSql('INSERT or REPLACE into ICONSTIME (ICON_NAME, CLASS_NAME, TIMER_VAL) VALUES (?,?,?)', ['home', 'fa fa-home', 50]);
tx.executeSql('INSERT or REPLACE into ICONSTIME (ICON_NAME, CLASS_NAME, TIMER_VAL) VALUES (?,?,?)', ['trash', 'li li_trash', 21]);
tx.executeSql('INSERT or REPLACE into ICONSTIME (ICON_NAME, CLASS_NAME, TIMER_VAL) VALUES (?,?,?)', ['scissors', 'fa fa-scissors', 22]);
tx.executeSql('INSERT or REPLACE into ICONSTIME (ICON_NAME, CLASS_NAME, TIMER_VAL) VALUES (?,?,?)', ['flask', 'fa fa-flask', 33]);
tx.executeSql('INSERT or REPLACE into ICONSTIME (ICON_NAME, CLASS_NAME, TIMER_VAL) VALUES (?,?,?)', ['leaf', 'fa fa-leaf', 44]);
tx.executeSql('INSERT or REPLACE into ICONSTIME (ICON_NAME, CLASS_NAME, TIMER_VAL) VALUES (?,?,?)', ['pen', 'li li_pen', 66]);
tx.executeSql('INSERT or REPLACE into ICONSTIME (ICON_NAME, CLASS_NAME, TIMER_VAL) VALUES (?,?,?)', ['bulb', 'li li_bulb', 88]);
tx.executeSql('INSERT or REPLACE into ICONSTIME (ICON_NAME, CLASS_NAME, TIMER_VAL) VALUES (?,?,?)', ['book', 'fa fa-book', 77]);
tx.executeSql('INSERT or REPLACE into ICONSTIME (ICON_NAME, CLASS_NAME, TIMER_VAL) VALUES (?,?,?)', ['bookmark', 'fa fa-bookmark', 85]);
tx.executeSql('INSERT or REPLACE into ICONSTIME (ICON_NAME, CLASS_NAME, TIMER_VAL) VALUES (?,?,?)', ['child', 'fa fa-child', 43]);
tx.executeSql('INSERT or REPLACE into ICONSTIME (ICON_NAME, CLASS_NAME, TIMER_VAL) VALUES (?,?,?)', ['stethoscope', 'fa fa-stethoscope', 67]);
tx.executeSql('INSERT or REPLACE into ICONSTIME (ICON_NAME, CLASS_NAME, TIMER_VAL) VALUES (?,?,?)', ['spoon', 'fa fa-spoon', 53]);
tx.executeSql('INSERT or REPLACE into ICONSTIME (ICON_NAME, CLASS_NAME, TIMER_VAL) VALUES (?,?,?)', ['code', 'fa fa-code', 60]);
tx.executeSql('INSERT or REPLACE into ICONSTIME (ICON_NAME, CLASS_NAME, TIMER_VAL) VALUES (?,?,?)', ['keyboard', 'fa fa-keyboard-o', 88]);

		
		
		tx.executeSql('select * from ICONSTIME;', [], function(tx, res) {
			//console.log('res.rows.length --> ' + dbLoad);
		  });
		}, function(e) {
		   //console.log("ERROR: " + e.message);
		});
}

function db_init_reSet() {
	db.transaction(function(tx) {
tx.executeSql('select * from ICONSTIME;', [], function(tx, res) {
	dbLoad = res.rows.length;
	//console.log('res.rows.length --> ' + res.rows.length);
	});
	}, function(e) {
	   //console.log("ERROR: " + e.message);
	});
}


// 드래그 대상 설정
function dragdrop_doing() {
	$('.drag').draggable({distance: 20}, {revert: true}, {revertDuration: 500}, {zIndex: 9});
}

// 드롭
function dragdrop_drop() {
	$('#start').droppable({tolerance: 'touch'}, {accept: '.drag'}, {drop: function(event, ui){
		
		dragdrop_timerCheck(); // 이미 실행중인지 확인 후 초기화
		
		
		// 드래그 대상 관련
		// 가끔 드래그 대상이 div로 인식되는 버그 대응 
		if (event.toElement.tagName == "I") {
			lastIcon = $(event.toElement);
			lastDragger = lastIcon.parent('div');
		} else {
			//console.log('event.toElement == div');
			lastDragger = $(event.toElement);
			lastIcon = lastDragger.children('i');
		}
		
		
		/* 타이머 */
		
		dragIcon = lastIcon.context;
		 
		for(var i=1;i<7;i++) {
			
			icons = window.document.getElementsByTagName("i")[i];
			
			if(dragIcon == icons) {
				
			defaultValue = dragIcon.getElementsByTagName("input")[0].value;
			minute = defaultValue;
			
		   end = 0;
			timeclock();	
			
			}
		}
		
		/* ------ */
		
		
		
		

		//lastDragger.draggable({revertDuration:0});
		lastDragger.attr('style', '');
		lastDraggerClass = lastDragger[0].className;
		
		// 아이콘 중앙 배치
		$('#middle').html(lastIcon).draggable({zIndex: 9});
		
		// 시작 아이콘 관련
		$('#start').children().remove();
		
		// 타이머 출력
		timer_doing('timer');
		$('#timer').addClass(lastDraggerClass)
			.removeClass('drag ui-draggable ui-draggable-dragging');
		
		// 액션 이름, 시작 시간 저장
		actionName = lastIcon[0].className;
		actionName = actionName.replace(/-/g, '').replace(/_/g, '').replace(/fa/g, '').replace(/li/g, '');
		startTime = new Date().getTime();
	}});
}

// 타이머 구동 확인 + 저장 + 초기화
function dragdrop_timerCheck() {
	if ($('#timer').hasClass('iconMain')) { // 실행 중인지 확인
		$('#result').append(formatTime(x.time()) + ' '); // DB 구현 전까지 타이머 저장 대용
		
		// 종료시간, 활동시간 저장 
		endTime = new Date().getTime();
		resultWhile = Math.floor((endTime - startTime) / 1000);
	
		db_insertQuery(); // Query
		
		timer_reset(); // 타이머 초기화
		$('#timer').html('').removeClass(); // 타이머 출력 제거
		
		// 시작 아이콘 복구
		$('#start').html(startIcon); 
		$('#middle').attr('style','').removeClass();
		
		lastDragger.html(lastIcon);
		lastDragger.attr('style','');

		dragdrop_flip(); // 빙글빙글
		
		/* 타이머 초기화 */
		
		clearTimeout(timeClock);
		
		second = 0;
		
	
		/* ---- */
		
	}
}

//빙글빙글
function dragdrop_flip() {
	lastDragger.addClass('flipping');
	$('.drag').draggable({disabled:true}); // 전체 드래그 비활성화
	
	// 일정 시간 후 다시 드래그 활성화
	setTimeout(function(){
		$('.flipping').removeClass('flipping');
		$('.drag').draggable({disabled: false});
		
		// 안드로이드에서 3,5번 flip 궤도 이상 - 보정 
		lastDragger.attr('style','');
		
	}, 1000);
}


/* --------------------------timer------------------------------ */


function timeclock(){
  if(second == 00) {
    minute -= 1 ;
    second = 59 ;
  } else{
    second = second-1;
  }
  
  
  if ((minute < 0) && (end==0)) {
	 showConfirm();
	 end = 1;
  }
  
  
  if (second < 10) {
    document.clock.txtSecs.value = 0 + second.toString();
  } else {
    document.clock.txtSecs.value = second;
  }
  if (minute < 10) {
      document.clock.txtMins.value = 0 + minute.toString();
    } else {
      document.clock.txtMins.value = minute;
    }
  
  
  timeClock = setTimeout("timeclock()", 1000);
  
  
}







document.addEventListener("deviceready", onDeviceReady, false);


function onDeviceReady() {
	
}



// Beep three times
//
function playBeep() {
    navigator.notification.beep(3);
}

// Vibrate for 2 seconds
//
function vibrate() {
    navigator.notification.vibrate(2000);
}

function BnV() {
	 navigator.notification.beep(3);
    navigator.notification.vibrate(2000);
}

//process the confirmation dialog result
function onConfirm(buttonIndex) {
    if(buttonIndex == 1) {
    	second = 0;
    	minute = defaultValue;
    	end = 0;    	
    	clearTimeout(timeClock);
      timeclock();
    } else {
    	window.location.reload();
    }
}

// Show a custom confirmation dialog
//
function showConfirm() {
	 navigator.notification.vibrate(1000);
    navigator.notification.confirm(
        '알림을 종료할까요?', // message
         onConfirm,            // callback to invoke with index of button pressed
          '알림',           // title
        ['계속','중지']         // buttonLabels
    );
}