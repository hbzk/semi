var db = window.openDatabase("Database", "1.0", "LogDB", 2 * 1024 * 1024);
var actionName, startTime, endTime, resultWhile, resultDate;
var dbId, clickedTable; 
var pageList = new Array();

db_pageList();			// 페이징을 위한 전체 목록
db_selectLastDay();	// 마지막 날 출력

$('#date .left').click(function(){
	var target = pageList[$.inArray(resultDate, pageList) - 1];
	db_selectSearch(target, '+1 day');
});

$('#date .right').click(function(){
	var target = pageList[$.inArray(resultDate, pageList) + 1];
	db_selectSearch(target, '+1 day');
});

$('#search').click(function(){
	var searchText = $('#searchText').val();
	db_selectSearch(searchText, '+1 day');
});

$('#deleteAll').click(function(){
	if (confirm('정말 다 지움?')) {
		db.transaction(function(tx) {
			tx.executeSql("DELETE FROM ACTION");
		}, db_errorCB);
		location.reload(true);
	}
});

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

function db_pageList() { // 페이징 용 날짜 목록 만들기
	db.transaction(function(tx) {
		tx.executeSql("SELECT strftime('%Y-%m-%d', START_TIME) AS strtDay FROM ACTION ORDER BY strtDay", [], function(tx, res) {
			var len = res.rows.length;
			console.log("ACTION (All): " + len + " rows found.");
			
			for (var i=0; i<len; i++){
				if ($.inArray(res.rows.item(i).strtDay, pageList) == -1) {
					pageList.push(res.rows.item(i).strtDay);
				}
			}
		}, db_errorCB);
	});
};

function db_selectLastDay() { // 마지막 행동이 있는 날짜 출력 
	var lastActionSql = "(SELECT date(START_TIME) AS stDay FROM ACTION ORDER BY START_TIME DESC LIMIT 1)";
	db.transaction(function(tx) {
		tx.executeSql("SELECT *, strftime('%Y-%m-%d', START_TIME) AS strtDay FROM ACTION "
			+" WHERE START_TIME BETWEEN date("+lastActionSql+") AND date("+lastActionSql+", ?) ORDER BY START_TIME", ['+1 day'], function(tx, res) {
				db_listing(res);
		}, db_errorCB);
	});
};

function db_selectSearch(date, range) { // 날짜, 범위 받고 출력
	db.transaction(function(tx) {
		tx.executeSql("SELECT *, strftime('%Y-%m-%d', START_TIME) AS strtDay FROM ACTION "
			+" WHERE START_TIME BETWEEN date(?) AND date(?, ?) ORDER BY START_TIME", [date, date, range], function(tx, res) {
				db_listing(res);
		}, db_errorCB);
	});
};

// 결과를 HTML에 출력
function db_listing(res) {
	var len = res.rows.length;
	console.log("ACTION (page): " + len + " rows found.");
	
	resultDate = res.rows.item(0).strtDay;
	if ($.inArray(resultDate, pageList) == 0) {
		$('#date .left').css('display', 'none');
	} else {
		$('#date .left').css('display', '');
	} 
		
	if ($.inArray(resultDate, pageList) > pageList.length -2) {
		$('#date .right').css('display', 'none');
	} else {
		$('#date .right').css('display', '');
	}
	
	$('#date>p').text(resultDate.replace(/-/g, '/').substring(5));
	
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
			endTime = res.rows.item(i).START_TIME;
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

