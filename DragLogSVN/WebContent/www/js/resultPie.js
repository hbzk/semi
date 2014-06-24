var db = window.openDatabase("Database", "1.0", "LogDB", 2 * 1024 * 1024);

// 데이터 형식 샘플

$(window).load(function(){
	//if문으로 로그인or회원가입 안되어 있으면 알람창+가입유도(링크)
	
	//가입되어있으면 통계 제공
	db_resultPie();
});

// 출력용 함수
function db_resultPie() {
	db.transaction(function(tx) {
		tx.executeSql("select * from ACTION ", [], function(tx, res) {
			var len = res.rows.length;
			console.log("ACTION: " + len + " rows found.");
			
			var selectAllKey = new Object();
			var selectAll = new Array();
			
			for (var i=0; i<len; i++) { 
				if (res.rows.item(i).END_TIME == null) {
					console.log(res.rows.item(i).END_TIME);
					break;
				}
				
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
			console.log(selectAllKey);
			console.log(selectAll);
			
			// 화면에 출력 --------- (배열, 크기, 형태)
			$('#pieChart').pieChart(selectAll,280,"pie"); 
		});
	}, db_errorCB);
}

function db_errorCB(e) { // query 에러시 호출 함수
	console.log(e);
	console.log("e.message :" + e.message);
}
