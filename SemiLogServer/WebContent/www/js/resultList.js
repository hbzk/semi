var actionName, startTime, endTime, resultWhile;
var db = window.openDatabase("Database", "1.0", "LogDB", 2 * 1024 * 1024);
var dbId, clickedTable; 
window.
db_selectLastDay();		// 마지막 날 출력

/*searchS = '2014-06-12';
db_listText();*/

$('#search').click(function(){
	var searchText = $('#searchText').val();
	db_selectSearch(searchText);
});

$('#deleteAll').click(function(){
	db_deleteAll();
	location.reload(true);
});


$(document).on("click",".rtDelete",function(e){
	dbId = $(e.target).parent(".rtDelete").siblings(".rtIcon")[0].attributes[0].value;
	console.log(dbId);
	clickedTable = $(e.target).parent(".rtDelete").parent(".rtTable");
	console.log(clickedTable);
	db_delete(dbId);
}); 
 
 $(document).on("click",".rtTable",function(){
	 $(clickedTable).fadeOut(700);
 });

function db_deleteAll(){
	db.transaction(function(tx) {
		tx.executeSql("DELETE FROM ACTION");
	}, db_errorCB);
}


function db_selectSearch(date) {
	db.transaction(function(tx) {
		tx.executeSql("SELECT * FROM ACTION WHERE START_TIME BETWEEN date(?) AND date(?, ?)", [date, date, '+1 day'], function(tx, res) {
			db_listing(res);
		}, db_errorCB);
	});
};


function db_selectLastDay() {
	db.transaction(function(tx) {
		tx.executeSql("SELECT date(START_TIME) AS stDay FROM ACTION ORDER BY START_TIME DESC LIMIT 1", [], function(tx, res) {
			var searchDay = res.rows.item(0).stDay;
			
			tx.executeSql("SELECT * FROM ACTION WHERE START_TIME BETWEEN date(?) AND date(?, ?)", [searchDay, searchDay, '+1 day'], function(tx, res) {
				db_listing(res);
			}, db_errorCB);
			
		}, db_errorCB);
	});
};


// 결과를 HTML에 출력
function db_listing(res, lastDay) {
	var len = res.rows.length;
	console.log("ACTION: " + len + " rows found.");
	
	var resultList = $('#resultList');
	resultList.html('');	// 리스트 초기화
	
	var resultDate = res.rows.item(len-1).START_TIME.substring(5,10); // 월-일 형태로 추출
	$('#date>p').text(resultDate);
	
	for (var i=0; i<len; i++){
		startTime = new Date(res.rows.item(i).START_TIME);
		endTime = new Date(res.rows.item(i).END_TIME);
		resultList.append($('<div class="rtTable">')
				.append('<div data-id= "'+res.rows.item(i).id +'" class="rtIcon actionName">'+'<i class= "'+res.rows.item(i).CLASSNAME+'"></i></div>')
				.append('<div class="rtTime">' + db_digitText(startTime.getHours()) + ':' + db_digitText(startTime.getMinutes())
						+ ' ~ '  + db_digitText(endTime.getHours()) + ':' + db_digitText(endTime.getMinutes()))
						.append('<div class="rtDuration">' + res.rows.item(i).WHILE +'sec </div>')
						.append('<div class="rtDelete"><i class="fa fa-times"></i></div>')
		);
	}
}

// Query 에러시 호출 함수
function db_errorCB(tx, e) { 
	console.log(e);
	console.log("e.message :" + e.message);
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

function db_delete(no){
	db.transaction(function(tx){
		tx.executeSql("DELETE FROM ACTION WHERE id = ?",
									[no],
									function(){
										//db_listText();
									});
	});
}