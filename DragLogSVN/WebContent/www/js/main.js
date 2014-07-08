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
var iconClick = 0;

var dbLoad, iconName, defaultTime;
/* ------- */

// 드래그 관련 변수
var startIcon, lastIcon, lastDragger, lastDraggerClass; 

// DB 관련 변수
var actionName, className, startTime, endTime, resultWhile, lastRow;
var db = window.openDatabase("Database", "1.0", "LogDB", 2 * 1024 * 1024);

$(document).ready(function(){

	//$("#form").css("display", "none");
	
	startIcon = $('#start').html();
		
	loadMainIcon();
	
	dragdrop_doing();
	dragdrop_drop();
	
	
	
	
	/*$(".resultLink").click(function(){
		db.transaction(function(tx){
			tx.executeSql('SELECT * FROM LOG',[],function(tx,res){
				console.log(res.rows.item(0).END_TIME == null);
				if(res.rows.length == 0){
					alert("Please record first");
				} else if (res.rows.item(0).END_TIME == null) {
					alert("log 한적 없잖아!");
				} else {
					location.href="result_text.html";
				}
			});
		});
	});*/

	
	$('#middle').mouseup(function(){ // 미들 클릭시 초기화
		dragdrop_timerCheck();
		iconClick = 0;
		
		
		/* 타이머 초기화 */
		
		clearTimeout(timeClock);
		
		/* ---- */
		
	});
	
	
		$(".drag").click(function(){
		
		if(iconClick == 0) {
			
		console.log(this);
		
		clickIcon = $(this).find('i')[0].className;
		//console.log(clickIcon);
		db.transaction(function(tx) {
			// tx.executeSql('drop table if exists ACTION'); // DB 초기화
			tx.executeSql('INSERT or REPLACE into ACTION (ICON_NAME, CLASS_NAME) VALUES ("lastclick", ?)', [clickIcon]);
		});
		
		setInterval(function(){
			location.href = "functionEdit_sql.html";
		}, 2);
		
		} else {
			location.href="#";	
			iconClick(0);
		}
		
		iconClick = 1;
		
	});

	
	
	

	
	
	
	
	
	
});



//=====================================================================
//드롭
function dragdrop_drop() {
	$('#start').droppable({tolerance: 'touch'}, {accept: '.drag'}, {drop: function(event, ui){
		dragdrop_timerCheck(); // 이미 실행중인지 확인 후 초기화
		iconClick = 1;
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
	        tx.executeSql('SELECT * FROM ACTION', [], function(tx, rs){
	        	
	        	var dragIcon = lastIcon.context.className;
	        	for(var i=0;i<35;i++) {
	        		iconsName = rs.rows.item(i).CLASS_NAME;
	        		//console.log(iconsName);
	        		
	        		if(dragIcon == iconsName) {
	        			minute = rs.rows.item(i).TIMER_VAL;
	        			defaultValue = rs.rows.item(i).TIMER_VAL;
	        			console.log(defaultValue);
	        			
	        			end = 0;
	        			timeclock();	
	        		}
	        	}
	        });
	    });
	
	    /* ------ */
		
		showAction(0);		// 아이콘 배치, 타이머 출력
		
		// 액션 이름, 시작 시간 저장
		actionName = lastIcon[0].attributes[0].value;
		className = lastIcon[0].className;
		className = className.replace(/ ui-draggable/g,'').replace(/ ui-droppable/g,'');
		
		startTime = new Date();
		db_startQuery();	// 시작 기록
	}});
}

function showAction(lastWhile) {
	lastDragger.attr('style', '');
	lastDraggerClass = lastDragger[0].className;
	
	$('#middle').html(lastIcon).draggable({zIndex: 9}, {containment: "document"});		// 아이콘 중앙 배치
	$('#start').children().remove();		// 시작 아이콘 관련
	
	stopwatch_doing(lastWhile); // 타이머 출력
	$('#timer').addClass(lastDraggerClass).removeClass('drag ui-draggable ui-draggable-dragging');
	
}


//타이머 구동 확인 + 저장 + 초기화
function dragdrop_timerCheck() {
	if ($('#timer').hasClass('iconMain')) { // 실행 중인지 확인
		
		// 종료시간, 활동시간 저장 
		endTime = new Date();
		
		db_endQuery(); // Query
		
		stopwatch_reset(); // 타이머 초기화
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


// 메인 아이콘 로드
function loadMainIcon(){
	db_selectLastRow();
	
	var iconDiv = $("#iconMainDiv .drag");
	console.log("Load DB - data (selectedIcon)");
	db.transaction(function(tx){
		tx.executeSql('SELECT * FROM ACTION', [], function(tx, res){
			for( var i=0 ; i < res.rows.length ; i++){
				var row = res.rows.item(i);
				if (row.POSITION > 0) {
					$($(iconDiv)[row.POSITION - 1]).append("<i data-name = '"+ row.ICON_NAME +"' class = '"+ row.CLASS_NAME +"'></i>");
				}
			}
			
			// LOG 실행중이면
			if (lastRow != 'none') {
				if (lastRow.END_TIME == null) {
					lastIcon = $('[data-name="'+lastRow.TITLE+'"]');
					lastDragger = lastIcon.parent('div');
					lastWhile = new Date() - new Date(lastRow.DURATION);
					showAction(lastWhile);
				}
			}
			
		});
	});
}

//마지막 INSERT row 얻기
function db_selectLastRow() {
	db.transaction(function(tx) {
		tx.executeSql('SELECT * FROM LOG ORDER BY ID DESC', [], function(tx, res){
			if (res.rows.length != 0) {
				lastRow = res.rows.item(0);
				console.log(lastRow);
			} else {
				lastRow = 'none';
			}
		});
	}, db_errorCB);
}

// LOG 시작시 쿼리
function db_startQuery() {
	db.transaction(function(tx) {
		tx.executeSql('INSERT INTO LOG (TITLE, CLASSNAME, START_TIME, DURATION) VALUES (?,?,?,?)', 
				[actionName, className, localISOString(startTime), startTime], function(tx, res) {
			tx.executeSql('SELECT * FROM LOG');
		});
	}, db_errorCB);
}



// LOG 종료 쿼리
function db_endQuery() {
	db_selectLastRow(); 		// 마지막 행 얻기
	db.transaction(function(tx) {
		startTime = new Date(lastRow.DURATION);
		resultWhile = Math.floor((endTime - startTime) / 1000);
		
		tx.executeSql('UPDATE LOG SET END_TIME=?, DURATION=? WHERE ID=?', [localISOString(endTime), resultWhile, lastRow.ID]);
	}, db_errorCB);
}


// ================================			 거의 수정 안하는 함수

//빙글빙글
function dragdrop_flip() {
	lastDragger.addClass('flipping');
	$('.drag').draggable({disabled:true}); // 전체 드래그 비활성화
	
	// 일정 시간 후 다시 드래그 활성화
	setTimeout(function(){
		$('.flipping').removeClass('flipping');
		$('.drag').draggable({disabled: false});
		lastDragger.attr('style','');
	}, 1000);
}

function db_errorCB(e) { // query 에러시 호출 함수
	console.log(e);
	console.log("e.message :" + e.message);
}

//드래그 대상 설정
function dragdrop_doing() {
	$('.drag').draggable({distance: 20}, {revert: true}, {revertDuration: 500}, {zIndex: 9},{containment: "document"});
}

//날짜 형태 만들기 (2014-06-19T14:12:35.261)
var localISOString = function(d) {
var pad = function (n){return n<10 ? '0'+n : n;};
return d.getFullYear()+'-'
  + pad(d.getMonth()+1)+'-'
  + pad(d.getDate())+'T'
  + pad(d.getHours())+':'
  + pad(d.getMinutes())+':'
  + pad(d.getSeconds())+'.'
  + pad(d.getMilliseconds());
};

/* --------------------------timer------------------------------ */


function timeclock(){
  if(second == 00) {
    minute -= 1 ;
    second = 2 ;
  } else{
    second = second-1;
  }
  
  
  if ((minute < 0) && (end==0)) {
	 window.alert();
	 //showConfirm();
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


function yes() {
	//window.location.reload();
}

function no() {
	second = 0;
	minute = defaultValue;
	end = 0;    	
	clearTimeout(timeClock);
   timeclock();
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
	 //navigator.notification.vibrate(1000);
    navigator.notification.confirm(
        '알림을 종료할까요?', // message
         onConfirm,            // callback to invoke with index of button pressed
          '알림',           // title
        ['계속','중지']         // buttonLabels
    );
}
