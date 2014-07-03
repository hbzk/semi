var db = window.openDatabase("Database", "1.0", "LogDB", 2 * 1024 * 1024);
var firstResultDate, targetDate;
var dayList = []; 


//=======================================================
// 결과를 Text list로 출력
var db_listing = function (res, scope) {
	var len = res.rows.length;
	console.log("LOG (page): " + len + " rows found.");
	
	firstResultDate = res.rows.item(0).strtDay;
	
	if (scope == 'LASTDAY') {
		$('#date>p').text(firstResultDate.replace(/-/g, '/').substring(5)); 	// 날짜 출력
		($.inArray(firstResultDate, dayList) > 0) ? $('#date .left').css('display', 'block') : $('#date .left').css('display', 'none');
		$('#date .right').css('display', 'none');
		
	} else if (scope == 'DAY') {
		$('#date>p').text(targetDate.replace(/-/g, '/').substring(5)); 	// 날짜 출력
	} else if (scope == 'WEEK') {
		$('#date>p').text(targetDate.replace(/-/g, '/').substring(5) + '~' +(targetDate.replace(/-/g, '').substring(6,10)));
	} else if (scope == 'MONTH')  {
		$('#date>p').text(targetDate.replace(/-/g, '/').substring(0, 7));
	}
	
	var resultList = $('#resultList');
	resultList.html('');	// 리스트 초기화
	
	for (var i=0; i<len; i++){
		var duration = res.rows.item(i).DURATION;
		if (duration < 60) {
			duration = duration + 's';
		} else if (duration < 3600){
			duration = Math.floor(duration%3600/60) + 'm ' + duration%60 + 's';
		} else {
			duration = Math.floor(duration/3600) + 'h ' + Math.floor(duration%3600/60) + 'm ' + duration%60 + 's';
		}
		
		var startTime = res.rows.item(i).START_TIME;
		var endTime = res.rows.item(i).END_TIME;
		
		if (endTime == null) break; 			// 진행중인것 출력 방지
		
		resultList.append($('<div class="rtTable">')
				.append('<div data-id= "'+res.rows.item(i).ID +'" class="rtIcon">'+'<i class= "'+res.rows.item(i).CLASSNAME+'"></i></div>')
				.append('<div class="rtTime">' + startTime.substring(11, 16) + ' ~ ' + endTime.substring(11, 16))
				.append('<div class="rtDuration">' + duration +'</div>')
				.append('<div class="rtDelete"><i class="fa fa-times"></i></div>')
		);
	}
};
