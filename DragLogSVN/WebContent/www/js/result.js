var db = window.openDatabase("Database", "1.0", "LogDB", 2 * 1024 * 1024);
var actionName, startTime, endTime, resultWhile, resultDate, targetDate, scope, lastActionSql;
var dbId, clickedTable; 
var dayList = new Array();
var weekList = new Array();
var monthList = new Array();

$(document).ready(function(){
	db_dayList();			// 페이징을 위한 전체 목록
	db_selectLastDay();	// 마지막 날 출력
	
	$('#deleteAll').click(function(){
		if (confirm('정말 다 지움?')) {
			db.transaction(function(tx) { 
				tx.executeSql("DELETE FROM ACTION");
			}, db_errorCB);
			location.reload(true);
		}
	});
	
	$('#date .left').click(function(){
		if (scope == 'day') {
			targetDate = dayList[$.inArray(resultDate, dayList) - 1];
		} else if (scope == 'month') {
			targetDate = monthList[$.inArray(resultDate.substring(0,7), monthList) - 1].concat('-01');
		}
		db_selectSearch(targetDate, scope);
	});

	$('#date .right').click(function(){
		if (scope == 'day') {
			targetDate = dayList[$.inArray(resultDate, dayList) + 1];
		} else if (scope == 'month') {
			targetDate = monthList[$.inArray(resultDate.substring(0,7), monthList) + 1].concat('-01');
		}
		db_selectSearch(targetDate, scope);
	});
	
	
	
	// 일, 주, 월 지정
	$('#day').click(function(){
		scope = 'day';
		targetDate = dayList[dayList.length-1];
		db_selectSearch(targetDate, scope);
	});
	$('#week').click(function(){
		db_selectWeek(date);
	});
	$('#month').click(function(){
		scope = 'month';
		targetDate = monthList[monthList.length-1].concat('-01'); 	// 마지막 월을 추출해서 2014-06-01 형태로 만듬
		db_selectSearch(targetDate, scope);
	});
});
// <-- $(document).ready

function db_selectWeek(date) { // 주간 출력
	db.transaction(function(tx) {
		tx.executeSql("SELECT *, strftime('%Y-%m-%d', START_TIME) AS strtDay FROM ACTION "
			+" WHERE START_TIME BETWEEN date('2014-06-08', 'weekday 0') AND date('2014-06-08', 'weekday 6') ORDER BY START_TIME", [], function(tx, res) {
				db_listing(res, scope);
		}, db_errorCB);
	});
};



$(document).on("click",".rtDelete",function(e){
	if (confirm('정말 지움?')) {
		dbId = $(e.target).parent(".rtDelete").siblings(".rtIcon")[0].attributes[0].value;
		clickedTable = $(e.target).parent(".rtDelete").parent(".rtTable");
		db_delete(dbId);
	}
});

$(document).on("click",".rtTable",function(){
	$(clickedTable).fadeOut(700);
});


// ========================= 함수 정의
function db_delete(no){
	db.transaction(function(tx){
		tx.executeSql("DELETE FROM ACTION WHERE id = ?",	[no]);
	});
}

function db_errorCB(tx, e) { // query 에러시 호출 함수
	console.log(e);
	console.log("e.message :" + e.message);
}

function db_dayList() { // 페이징 용 날짜 목록 만들기
	db.transaction(function(tx) {
		tx.executeSql("SELECT strftime('%Y-%m-%d', START_TIME) AS strtDay, strftime('%Y-%m', START_TIME) AS strtMonth FROM ACTION ORDER BY strtDay", [], function(tx, res) {
			var len = res.rows.length;
			console.log("ACTION (All): " + len + " rows found.");
			
			for (var i=0; i<len; i++){
				if ($.inArray(res.rows.item(i).strtDay, dayList) == -1) {	// 일 목록(dayList) 만들기
					dayList.push(res.rows.item(i).strtDay);
					if ($.inArray(res.rows.item(i).strtMonth, monthList) == -1) { 		// 월 목록(monthList) 만들기
						monthList.push(res.rows.item(i).strtMonth);
					}
					//weekDay = new Date(res.rows.item(i).strtDay).getDay();
					//console.log();
				}
			}
			console.log(dayList);
		}, db_errorCB);
	});
};

function db_selectLastDay() { // 마지막 행동이 있는 날짜 출력
	scope = 'day';
	lastActionSql = "(SELECT date(START_TIME) AS stDay FROM ACTION ORDER BY START_TIME DESC LIMIT 1)";
	db.transaction(function(tx) {
		tx.executeSql("SELECT *, strftime('%Y-%m-%d', START_TIME) AS strtDay FROM ACTION "
			+" WHERE START_TIME BETWEEN date("+lastActionSql+") AND date("+lastActionSql+", ?) ORDER BY START_TIME", ['+1 day'], function(tx, res) {
				db_listing(res, scope);
		}, db_errorCB);
	});
};

var whereSql;
function db_selectSearch(date, scope) { // 날짜, 범위 받고 쿼리 수행
	
	if (scope == 'day') { 	// 범위에 따른 WHERE 문 선택
		whereSql = " WHERE START_TIME BETWEEN date(?) AND date(?, '+1 day') ORDER BY START_TIME";
	} else if (scope == 'month') {
		whereSql = " WHERE START_TIME BETWEEN date(?) AND date(?,'+1 month') ORDER BY START_TIME";
	}
	
	db.transaction(function(tx) {
		tx.executeSql("SELECT *, strftime('%Y-%m-%d', START_TIME) AS strtDay FROM ACTION " + whereSql, [date, date], function(tx, res) {
				db_listing(res, scope);
		}, db_errorCB);
	});
};




// 결과를 HTML에 출력
function db_listing(res, scope) {
	var len = res.rows.length;
	console.log("ACTION (page): " + len + " rows found.");
	
	resultDate = res.rows.item(0).strtDay;
	
	var firstMonth = dayList[0].substring(0, 7);
	var lastMonth = dayList[dayList.length-1].substring(0, 7);
	
	if (scope == 'day') {
		$('#date>p').text(resultDate.replace(/-/g, '/').substring(5)); 	// 날짜 출력
		
		// 좌우측 네비게이터 활성/비활성화
		($.inArray(resultDate, dayList) != 0) ? $('#date .left').css('display', '') : $('#date .left').css('display', 'none'); 
		($.inArray(resultDate, dayList) < dayList.length -1) ? $('#date .right').css('display', '') : $('#date .right').css('display', 'none');
		
	} else if (scope == 'week') {
		$('#date>p').text(resultDate.replace(/-/g, '/').substring(0, 7));
	} else if (scope == 'month')  {
		
		(resultDate.substring(0, 7) > firstMonth) ? $('#date .left').css('display', '') : $('#date .left').css('display', 'none');
		(resultDate.substring(0, 7) < lastMonth) ? $('#date .right').css('display', '') : $('#date .right').css('display', 'none');
		
		$('#date>p').text(resultDate.replace(/-/g, '/').substring(0, 7));
	}
	
	
	var resultList = $('#resultList');
	resultList.html('');	// 리스트 초기화
	
	for (var i=0; i<len; i++){
		whileT = res.rows.item(i).WHILE;
		if (whileT < 60) {
			whileT = whileT + '초';
		} else if (whileT < 3600){
			whileT = Math.floor(whileT%3600/60) + '분 ' + whileT%60 + '초';
		} else {
			whileT = Math.floor(whileT/3600) + '시간 ' + Math.floor(whileT%3600/60) + '분 ' + whileT%60 + '초';
		}
		
		startTime = res.rows.item(i).START_TIME;
		endTime = res.rows.item(i).END_TIME;
		
		// 더미 데이터에 endTime이 없어서 조건문 추가
		if (endTime == null) {
			break;
		}
		
		resultList.append($('<div class="rtTable">')
				.append('<div data-id= "'+res.rows.item(i).id +'" class="rtIcon actionName">'+'<i class= "'+res.rows.item(i).CLASSNAME+'"></i></div>')
				.append('<div class="rtTime">' + startTime.substring(11, 16) + ' ~ ' + endTime.substring(11, 16))
				.append('<div class="rtDuration">' + whileT +'</div>')
				.append('<div class="rtDelete"><i class="fa fa-times"></i></div>')
		);
	}
}

// 00:00:00 형태 만들기 함수
function db_digitText(i) {
	if (i < 10) 	i = '0' + i;
	return i;
}

// 날짜 + 1 리턴 함수 (예 : 2014-06-16 --> 2014-06-17) 
function db_nextDay(day) {
	return day.substring(0, 9).concat(parseInt(day.charAt(9)) + 1);
}

