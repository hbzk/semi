var db = window.openDatabase("Database", "1.0", "LogDB", 2 * 1024 * 1024);
var colorList = ["#FE5850", "#218D80", "ED8C2B", "#CF4A30", "#813DAC", "#064B75", "#267FB8", "#87C038", "#F2C12E", "#B7C11E", "#35203B", "#164065", "#DB435C", "#FFA14A", "#5C89B2", "#008899", "#88A825", "#F24E29", "#F27127", "#911146", "#8A1D30", "#9BB144", "#E85649", "#FBDC01", "#F0947C", "#FF5760", "#E85649", "#66D9B8", "#37A1FE", "#74DBC5", "#61A74D", "#F4BCAC", "#477306", "#D39FE8", "#F59D32"];
var iconList = ["beer", "book", "bookmark", "bulb", "child", "code", "coffee", "cutlery", "desktop", "flask", "gamepad", "glass", "headphones", "home", "hospital", "keyboard", "leaf", "mobile", "moon", "pen", "plane", "puzzle", "scissors", "shirt", "spoon", "stethoscope", "trash", "tv", "video", "music", "automobile", "phone", "banknote", "comment", "dribbble"];

$(function(){
	db_submitLog();
});

var obj = new Object();

var db_submitLog = function(){
	db.transaction(function(tx){
		tx.executeSql('SELECT USER_NO FROM USER', [], function(tx, res){
			var user_no = res.rows.item(0).USER_NO;
			
			$.post('http://14.32.66.98:1111/other', {USER_NO : user_no}).done(function(data){
				// 유저 정보 가공 후 출력 
				var otherUser = data[0];
				//console.log(objToString);
				$('#info').text(objToString(otherUser));
				
				// 결과 가공 
				var resultList = data[1];
				var resultObj = new Object();
				for (var i=0; i<resultList.length; i++) { 
					if (resultList[i].END_TIME == null) {
						console.log(resultList[i].END_TIME);
						break;
					}
					if (resultObj[resultList[i].ACTION] == undefined) {
						resultObj[resultList[i].ACTION] = resultList[i].DURATION; // 같은 값 없으면 저장
					} else {
						resultObj[resultList[i].ACTION] += resultList[i].DURATION; // 같은 값 있으면 합산
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
			});
		});
	}, db_errorCB);
};



//query 에러시 호출 함수
var db_errorCB = function (e) {
	console.log(e);
	console.log("e.message :" + e.message);
};

// Object 내용을 문자열로 출력
function objToString(obj) {
    var str = '';
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str += p + ':' + obj[p] + '\n';
        }
    }
    return str;
}