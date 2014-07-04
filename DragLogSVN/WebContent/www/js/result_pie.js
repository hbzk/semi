var db = window.openDatabase("Database", "1.0", "LogDB", 2 * 1024 * 1024);

$(function(){

	
});


//=======================================================
// 결과 가공 후 차트 출력
var db_listing = function(res, scope) {
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
		$('#date>p').text(targetDate.replace(/-/g, '/').substring(5) + ' ~일주일');
	} else if (scope == 'MONTH')  {
		$('#date>p').text(targetDate.replace(/-/g, '/').substring(0, 7));
	}
	
	$('#doughnutChart').html('');	// 리스트 초기화
	
	// 결과 누적 합산
	var resultObj = new Object();
	for (var i=0; i<len; i++) { 
		if (res.rows.item(i).END_TIME == null) {
			console.log(res.rows.item(i).END_TIME);
			break;
		}
		if (resultObj[res.rows.item(i).TITLE] == undefined) {
			resultObj[res.rows.item(i).TITLE] = res.rows.item(i).DURATION; // 같은 값 없으면 저장
		} else {
			resultObj[res.rows.item(i).TITLE] += res.rows.item(i).DURATION; // 같은 값 있으면 합산
		}
	}
	//console.log(resultObj);
	
	// 결과를 값 큰 순서로 정렬
	var sortResult =[];
	for (var title in resultObj) {
		sortResult.push([title, resultObj[title]]);
	};
	sortResult.sort(function (a, b) {return b[1] - a[1];});
	//console.log(sortResult);
	
	// 결과를 출력 함수가 원하는 배열[obj, obj ... ] 형태로 생성 
	var result = [];
	for (var i=0; i<sortResult.length ; i++) {
		var tempObj = new Object();
		tempObj['title'] = sortResult[i][0];
		tempObj['value'] = sortResult[i][1];
		tempObj['color'] =  colorList[$.inArray(sortResult[i][0], iconList)]; 		// colorList에서 해당 아이콘 색 매칭
		
		result.push(tempObj);
	}
	//console.log(result);
	
	// 실제 차트 그리기
	$("#doughnutChart").drawDoughnutChart(result);
	
};