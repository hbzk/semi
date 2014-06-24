var db = window.openDatabase("Database", "1.0", "LogDB", 2 * 1024 * 1024);
var actionName, startTime, endTime, resultWhile, resultDate, targetDate, scope, lastActionSql, whereSql;
var dbId, clickedTable; 
var dayList = new Array();
var weekList = new Array();
var monthList = new Array();

$(document).ready(function(){
	db_dayList();			// 페이징을 위한 전체 목록
	
	scope = 'LASTDAY';	
	db_selectSearch(scope); 	// 마지막 날 출력
	
	$('#deleteAll').click(function(){
		if (confirm('정말 다 지움?')) {
			db.transaction(function(tx) { 
				tx.executeSql("DELETE FROM ACTION");
			}, db_errorCB);
			location.reload(true);
		}
	});
	
	$('#date .left').click(function(){
		if (scope == 'LASTDAY') {
			scope = 'DAY';
		}
		if (scope == 'DAY') {
			targetDate = dayList[$.inArray(resultDate, dayList) - 1];
			navCheck(dayList);
		} else if (scope == 'WEEK') {
			targetDate = weekList[$.inArray(targetDate, weekList) - 1];
			navCheck(weekList);
		} else if (scope == 'MONTH') {
			targetDate = monthList[$.inArray(targetDate, monthList) - 1];
			navCheck(monthList);
		}
		db_selectSearch(scope, targetDate);
	});

	$('#date .right').click(function(){
		if (scope == 'DAY') {
			targetDate = dayList[$.inArray(resultDate, dayList) + 1];
			navCheck(dayList);
		} else if (scope == 'WEEK') {
			targetDate = weekList[$.inArray(targetDate, weekList) + 1];
			navCheck(weekList);
		} else if (scope == 'MONTH') {
			targetDate = monthList[$.inArray(targetDate, monthList) + 1];
			navCheck(monthList);
		}
		db_selectSearch(scope, targetDate);
	});
	
	// 일, 주, 월 지정
	$('#day').click(function(){
		scope = 'DAY';
		targetDate = dayList[dayList.length-1];
		navCheck(dayList);
		db_selectSearch(scope, targetDate);
	});
	$('#week').click(function(){
		scope = 'WEEK';
		targetDate = weekList[weekList.length-1];
		navCheck(weekList);
		db_selectSearch(scope, targetDate);
	});
	$('#month').click(function(){
		console.log(monthList);
		scope = 'MONTH';
		targetDate = monthList[monthList.length-1];
		navCheck(monthList);
		db_selectSearch(scope, targetDate);
	});
	
	
});
// <-- $(document).ready


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

function navCheck(list) {
	(targetDate == list[0]) ? $('#date .left').css('display', 'none') : $('#date .left').css('display', 'block');
	(targetDate == list[list.length-1]) ? $('#date .right').css('display', 'none') : $('#date .right').css('display', 'block');
}

// 결과를 HTML에 출력
function db_listing(res, scope) {
	var len = res.rows.length;
	console.log("ACTION (page): " + len + " rows found.");
	
	resultDate = res.rows.item(0).strtDay;
	
	if (scope == 'LASTDAY') {
		$('#date>p').text(resultDate.replace(/-/g, '/').substring(5)); 	// 날짜 출력
		($.inArray(resultDate, dayList) > 0) ? $('#date .left').css('display', 'block') : $('#date .left').css('display', 'none');
		$('#date .right').css('display', 'none');
		
	} else if (scope == 'DAY') {
		$('#date>p').text(resultDate.replace(/-/g, '/').substring(5)); 	// 날짜 출력
		
	} else if (scope == 'WEEK') {
		$('#date>p').text(resultDate.replace(/-/g, '/').substring(5) + ' ~일주일');
		
	} else if (scope == 'MONTH')  {
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
		
		if (endTime == null) break;
		
		resultList.append($('<div class="rtTable">')
				.append('<div data-id= "'+res.rows.item(i).id +'" class="rtIcon actionName">'+'<i class= "'+res.rows.item(i).CLASSNAME+'"></i></div>')
				.append('<div class="rtTime">' + startTime.substring(11, 16) + ' ~ ' + endTime.substring(11, 16))
				.append('<div class="rtDuration">' + whileT +'</div>')
				.append('<div class="rtDelete"><i class="fa fa-times"></i></div>')
		);
	}
}

function db_selectSearch(scope, date) { // 날짜, 범위 받고 쿼리 수행
	if (scope == 'LASTDAY') { 	// 마지막 날짜 출력
		lastActionSql = "(SELECT date(START_TIME) AS stDay FROM ACTION ORDER BY START_TIME DESC LIMIT 1)";
		db.transaction(function(tx) {
			tx.executeSql("SELECT *, strftime('%Y-%m-%d', START_TIME) AS strtDay FROM ACTION "
				+" WHERE START_TIME BETWEEN date("+lastActionSql+") AND date("+lastActionSql+", ?) ORDER BY START_TIME", ['+1 day'], function(tx, res) {
					db_listing(res, scope);
			});
		}, db_errorCB);
		
	} else { 	// 범위에 따른 WHERE 문 선택
		if (scope == 'DAY') {
			whereSql = " WHERE START_TIME BETWEEN date(?) AND date(?, '+1 day') ORDER BY START_TIME";
		} else if (scope == 'MONTH') {
			whereSql = " WHERE START_TIME BETWEEN date(?) AND date(?,'+1 month') ORDER BY START_TIME";
		} else if (scope == 'WEEK') {
			whereSql = " WHERE START_TIME BETWEEN date(?) AND date(?,'+7 day') ORDER BY START_TIME";
		} else {
			console.log('scope error :');
			console.log(scope);
		}
		
		db.transaction(function(tx) {
			tx.executeSql("SELECT *, strftime('%Y-%m-%d', START_TIME) AS strtDay FROM ACTION " + whereSql, [date, date], function(tx, res) {
				db_listing(res, scope);
			});
		}, db_errorCB);
	}
};



// 페이징 용 날짜 목록 만들기
function db_dayList() { 
	db.transaction(function(tx) {
		tx.executeSql("SELECT strftime('%Y-%m-%d', START_TIME) AS strtDay, strftime('%Y-%m', START_TIME) AS strtMonth FROM ACTION ORDER BY strtDay", [], function(tx, res) {
			var len = res.rows.length;
			console.log("ACTION (All): " + len + " rows found.");
			
			for (var i=0; i<len; i++){
				if ($.inArray(res.rows.item(i).strtDay, dayList) == -1) {	// 일 목록(dayList) 만들기
					dayList.push(res.rows.item(i).strtDay);
					
					// 주 목록(weekList) 만들기
					var mondayTemp = localISOString(getLastMonday(res.rows.item(i).strtDay)).substring(0, 10);
					if ($.inArray(mondayTemp, weekList) == -1) { 		
						weekList.push(mondayTemp);
					}
					// 월 목록(monthList) 만들기
					if ($.inArray(res.rows.item(i).strtMonth.concat('-01'), monthList) == -1) { 		
						monthList.push(res.rows.item(i).strtMonth.concat('-01'));
					}
				}
			}
		});
	}, db_errorCB);
};

// 결과 하나 지우기
function db_delete(no){
	db.transaction(function(tx){
		tx.executeSql("DELETE FROM ACTION WHERE id = ?",	[no]);
	});
}

//query 에러시 호출 함수
function db_errorCB(e) {
	console.log(e);
	console.log("e.message :" + e.message);
}


// 00:00:00 형태 만들기 함수
var pad = function (n){return n<10 ? '0'+n : n;};

// 월~일 범위 중 월요일 얻기
function getLastMonday(d) {
	var t = new Date(d);
	var weekDay  = t.getDay();
	t.setDate(t.getDate() - t.getDay() + (weekDay === 0 ? -6 : 1));
	return t;
	//return new Date(t.getTime() + t.getTimezoneOffset()*60000);
}
// 일요일 얻기
function getNextSunday(d) {
	var t = new Date(d);
	var weekDay  = t.getDay();
	t.setDate(t.getDate() - t.getDay() + (weekDay === 0 ? 0 : 7));
	return t;
	//return new Date(t.getTime() + t.getTimezoneOffset()*60000);
}

// local 날짜 형태 만들기 (2014-06-19T14:12:35.261)
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