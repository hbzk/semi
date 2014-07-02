var db = window.openDatabase("Database", "1.0", "LogDB", 2 * 1024 * 1024);
var firstResultDate, targetDate;
var dayList = []; 

$(function(){
	
});

//=======================================================
// 결과를 Text list로 출력
var db_listing = function (res, scope) {
	var len = res.rows.length;
	console.log("ACTION (page): " + len + " rows found.");
	
	firstResultDate = res.rows.item(0).strtDay;
	
	if (scope == 'LASTDAY') {
		$('#date>p').text(firstResultDate.replace(/-/g, '/').substring(5)); 	// 날짜 출력
		($.inArray(firstResultDate, dayList) > 0) ? $('#date .left').css('display', 'block') : $('#date .left').css('display', 'none');
		$('#date .right').css('display', 'none');
		
	} else if (scope == 'DAY') {
		$('#date>p').text(targetDate.replace(/-/g, '/').substring(5)); 	// 날짜 출력
	} else if (scope == 'WEEK') {
		$('#date>p').text(targetDate.replace(/-/g, '/').substring(5) + ' ~일주일');
	} else if (scope == 'MONTH')  {
		$('#date>p').text(targetDate.replace(/-/g, '/').substring(0, 7));
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
		
		var startTime = res.rows.item(i).START_TIME;
		var endTime = res.rows.item(i).END_TIME;
		
		if (endTime == null) break; 			// 진행중인것 출력 방지
		
		resultList.append($('<div class="rtTable">')
				.append('<div data-id= "'+res.rows.item(i).ID +'" class="rtIcon">'+'<i class= "'+res.rows.item(i).CLASSNAME+'"></i></div>')
				.append('<div class="rtTime">' + startTime.substring(11, 16) + ' ~ ' + endTime.substring(11, 16))
				.append('<div class="rtDuration">' + whileT +'</div>')
				.append('<div class="rtDelete"><i class="fa fa-times"></i></div>')
		);
	}
};
