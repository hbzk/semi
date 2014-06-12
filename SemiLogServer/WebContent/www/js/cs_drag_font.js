/* timer */
var now = new Date();
var minute = now.getMinutes().toString();
var second = now.getSeconds().toString();
minute = 00;
second = 00;
end=0;


var icons;
var defaultValue;
var iconsName;
var clickIcon;
/* ------- */

var startIcon, lastIcon, lastDragger, lastDraggerClass; // 드래그 관련 변수

// DB 관련 변수
var dbLoad;
var actionName, className, startTime, endTime, resultWhile;
var iconName, defaultTime;
var db = window.openDatabase("Database", "1.0", "LogDB", 2 * 1024 * 1024);

$(window).load(function(){
	db_init(); // DB 초기화
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
		console.log(this);
		
		
		clickIcon = $(this).find('i')[0].className;
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
		//tx.executeSql('drop table if exists ACTION'); // DB 초기화
		tx.executeSql('create table if not exists ACTION (id integer primary key, TITLE text, CLASSNAME text, START_TIME date, END_TIME date, WHILE integer)');
	});
}

function db_insertQuery() {
	db.transaction(function(tx) {
		tx.executeSql('insert into ACTION (TITLE, CLASSNAME, START_TIME, END_TIME, WHILE) VALUES (?,?,?,?,?)', [actionName, className, startTime.toISOString(), endTime.toISOString(), resultWhile], function(tx, res) {
		   tx.executeSql('select * from ACTION;', [], function(tx, res) {
		     console.log('res.rows.length --> ' + res.rows.length);
		   });
		 }, function(e) {
		   console.log("ERROR: " + e.message);
		 });
	});
}




//타이머

function db_init_time() {
	db.transaction(function(tx) {
		//tx.executeSql('drop table if exists ICONSTIME'); // DB 초기화
		tx.executeSql('create table if not exists ICONSTIME (ICON_NAME text primary key, CLASS_NAME text, TIMER_VAL integer)');
		
		tx.executeSql('INSERT OR IGNORE INTO ICONSTIME '  
				+ ' SELECT "headphones" AS ICON_NAME, "fa fa-headphones" AS CLASS_NAME, 80 AS TIMER_VAL '
				+ ' UNION SELECT "music", "fa fa-music", 60 '
				+ ' UNION SELECT "automobile", "fa fa-automobile", 60 '
				+ ' UNION SELECT "phone", "fa fa-phone", 80 '
				+ ' UNION SELECT "banknote", "li li_banknote", 60 '
				+ ' UNION SELECT "comment", "fa fa-comment", 60 '
				+ ' UNION SELECT "dribbble", "fa fa-dribbble", 60 '
				+ ' UNION SELECT "plane", "fa fa-plane", 60 '
				+ ' UNION SELECT "gamepad", "fa fa-gamepad", 60 '
				+ ' UNION SELECT "puzzle", "fa fa-puzzle-piece", 60 '
				+ ' UNION SELECT "beer", "fa fa-beer", 60 '
				+ ' UNION SELECT "glass", "fa fa-glass", 60 '
				+ ' UNION SELECT "video", "li li_video", 60 '
				+ ' UNION SELECT "hospital", "fa fa-hospital-o", 60 '
				+ ' UNION SELECT "cutlery", "fa fa-cutlery", 60 '
				+ ' UNION SELECT "desktop", "fa fa-desktop", 60 '
				+ ' UNION SELECT "moon", "fa fa-moon-o", 60 '
				+ ' UNION SELECT "mobile", "fa fa-mobile", 90 '
				+ ' UNION SELECT "coffee", "fa fa-coffee", 60 '
				+ ' UNION SELECT "tv", "li li_tv", 65 '
				+ ' UNION SELECT "shirt", "li li_t-shirt", 60 '
				+ ' UNION SELECT "home", "fa fa-home", 60 '
				+ ' UNION SELECT "trash", "li li_trash", 60 '
				+ ' UNION SELECT "scissors", "fa fa-scissors", 60 '
				+ ' UNION SELECT "flask", "fa fa-flask", 60 '
				+ ' UNION SELECT "leaf", "fa fa-leaf", 60 '
				+ ' UNION SELECT "pen", "li li_pen", 60 '
				+ ' UNION SELECT "bulb", "li li_bulb", 60 '
				+ ' UNION SELECT "book", "fa fa-book", 60 '
				+ ' UNION SELECT "bookmark", "fa fa-bookmark", 60 '
				+ ' UNION SELECT "child", "fa fa-child", 60 '
				+ ' UNION SELECT "stethoscope", "fa fa-stethoscope", 60 '
				+ ' UNION SELECT "spoon", "fa fa-spoon", 60 '
				+ ' UNION SELECT "code", "fa fa-code", 60 '
				+ ' UNION SELECT "keyboard", "fa fa-keyboard-o", 60 ');
		
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
			console.log('event.toElement == div');
			lastDragger = $(event.toElement);
			lastIcon = lastDragger.children('i');
		}
		
		
		
		
		
		
		/* 타이머 */
		 
	      db.transaction(function(tx){
	        tx.executeSql('SELECT * FROM ICONSTIME', [], function(tx, rs){
	        	
	        	
	        	var dragIcon = lastIcon.context.className;
	        	
	        	for(var i=0;i<35;i++) {
	        		iconsName = rs.rows.item(i).CLASS_NAME;
	        		//console.log(iconsName);
	        		
	        		
	        		if(dragIcon == iconsName) {
	        			
	        			
	        			minute = rs.rows.item(i).TIMER_VAL;
	        			console.log(minute);
	        			
	        			end = 0;
	        			timeclock();	
	        			
	        		}
	        	}
	        });
	    });
	
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
		actionName = lastIcon[0].attributes[0].value;
		//class이름
		className = lastIcon[0].className;
		className = className.replace(/ ui-draggable/g,'').replace(/ ui-droppable/g,'');
		//actionName = actionName.replace(/-/g, '').replace(/_/g, '').replace(/fa/g, '').replace(/li/g, '');
		startTime = new Date();
	}});
}

// 타이머 구동 확인 + 저장 + 초기화
function dragdrop_timerCheck() {
	if ($('#timer').hasClass('iconMain')) { // 실행 중인지 확인
		$('#result').append(formatTime(x.time()) + ' '); // DB 구현 전까지 타이머 저장 대용
		
		// 종료시간, 활동시간 저장 
		endTime = new Date();
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