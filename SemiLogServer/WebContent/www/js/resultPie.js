var db = window.openDatabase("Database", "1.0", "LogDB", 2 * 1024 * 1024);

var pieData = [];
pieData.push(['aaa', 2]);
pieData.push(['bbb', 5]);
pieData.push(['ccc', 4]);


$(window).load(function(){
	db_resultPie();
	
});




function db_resultPie() {
	db.transaction(function(tx) {
		tx.executeSql("select * from ACTION ", [], function(tx, res) {
			var len = res.rows.length;
			console.log("ACTION: " + len + " rows found.");
			
			var selectAllKey = new Object();
			var selectAll = new Array();
			
			for (var i=0; i<len; i++) { 
				if (selectAllKey[res.rows.item(i).TITLE] == undefined) {
					selectAllKey[res.rows.item(i).TITLE] = res.rows.item(i).WHILE; // 같은 값 없으면 저장
				} else {
					selectAllKey[res.rows.item(i).TITLE] += res.rows.item(i).WHILE; // 같은 값 있으면 합산
				}
			}
			
			$.each(selectAllKey, function(key, value) { // pieChart 함수는 배열만 받아서 배열화 
				selectAll.push([key, value]); 
				selectAll.sort(function(a, b){ // 긴 시간 순으로 정렬
					return b[1] - a[1];
				});
			});
			console.log(selectAll);
			
			// 화면에 출력 ======== 배열, 크기, 형태
			$('#pieChart').pieChart(selectAll,280,"pie"); 
		});
	}, db_errorCB);
}

function db_errorCB(e) { // query 에러시 호출 함수
	console.log(e);
	console.log("e.message :" + e.message);
}

