var db = window.openDatabase("Database", "1.0", "LogDB", 2 * 1024 * 1024);
var result = [];

// 데이터 형식 샘플

$(window).load(function(){
	//if문으로 로그인or회원가입 안되어 있으면 알람창+가입유도(링크)
	
	//가입되어있으면 통계 제공
	db_resultPie();
	//$("#doughnutChart").drawDoughnutChart(result);
});

var data = [
    	    { title: "Tokyo",         value : 120,  color: "#2C3E50" },
    	    { title: "San Francisco", value:  80,   color: "#FC4349" },
    	    { title: "New York",      value:  70,   color: "#6DBCDB" },
    	    { title: "London",        value : 50,   color: "#F7E248" },
    	    { title: "Sydney",        value : 40,   color: "#D7DADB" },
    	    { title: "Berlin",        value : 20,   color: "#FFF" }
];


console.log(data);

//============================================================

// 데이터 가공
function db_resultPie() {
	db.transaction(function(tx) {
		tx.executeSql("select * from ACTION ", [], function(tx, res) {
			var len = res.rows.length;
			console.log("ACTION: " + len + " rows found.");
			
			var resultObj = new Object();
			for (var i=0; i<len; i++) { 
				if (res.rows.item(i).END_TIME == null) {
					console.log(res.rows.item(i).END_TIME);
					break;
				}
				if (resultObj[res.rows.item(i).TITLE] == undefined) {
					resultObj[res.rows.item(i).TITLE] = res.rows.item(i).WHILE; // 같은 값 없으면 저장
				} else {
					resultObj[res.rows.item(i).TITLE] += res.rows.item(i).WHILE; // 같은 값 있으면 합산
				}
			}
			console.log(resultObj);
			
			
			// 결과를 값 큰 순서로 정렬
			var sortResult =[];
			for (var title in resultObj) {
				sortResult.push([title, resultObj[title]]);
 			};
 			sortResult.sort(function (a, b) {return b[1] - a[1];});
			console.log(sortResult);
			
			
			// 결과를 출력 함수가 원하는 배열[obj, obj ... ] 형태로 생성 
			var tempC = '';
			for (var i=0; i<sortResult.length ; i++) {
				var tempObj = new Object();
				tempObj['title'] = sortResult[i][0];
				tempObj['value'] = sortResult[i][1];
				
				if (i < 10 ) {
					tempObj['color'] =  "#".concat(i,i,i);
				} else {
					tempC = i.toString().substring(1);
					tempObj['color'] =  "#".concat(tempC,tempC,tempC);
				}
				//console.log(tempObj);
				result.push(tempObj);
			}
			console.log(result);
			
			
			// 실제 차트 그리기
			$("#doughnutChart").drawDoughnutChart(result);
		});
	}, db_errorCB);
}

function db_errorCB(e) { // query 에러시 호출 함수
	console.log(e);
	console.log("e.message :" + e.message);
}

// Object size 구하기
getObjLength = function(obj) {
    var size = 0, key = null;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};