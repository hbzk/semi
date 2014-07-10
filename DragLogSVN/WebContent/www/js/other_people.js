var db = window.openDatabase("Database", "1.0", "LogDB", 2 * 1024 * 1024);
var colorList = ["#FE5850", "#218D80", "ED8C2B", "#CF4A30", "#813DAC", "#064B75", "#267FB8", "#87C038", "#F2C12E", "#B7C11E", "#35203B", "#164065", "#DB435C", "#FFA14A", "#5C89B2", "#008899", "#88A825", "#F24E29", "#F27127", "#911146", "#8A1D30", "#9BB144", "#E85649", "#FBDC01", "#F0947C", "#FF5760", "#E85649", "#66D9B8", "#37A1FE", "#74DBC5", "#61A74D", "#F4BCAC", "#477306", "#D39FE8", "#F59D32"];
var iconList = ["beer", "book", "bookmark", "bulb", "child", "code", "coffee", "cutlery", "desktop", "flask", "gamepad", "glass", "headphones", "home", "hospital", "keyboard", "leaf", "mobile", "moon", "pen", "plane", "puzzle", "scissors", "shirt", "spoon", "stethoscope", "trash", "tv", "video", "music", "automobile", "phone", "banknote", "comment", "dribbble"];

$(function(){
	db_submitLog();
	db_getOtherLog();
});

function login() {
	location.href = "login.html";
}
function signup() {
	location.href = "signup.html";
}


// 사용자의 전체 LOG 서버로 업데이트
var db_submitLog = function(){
	db.transaction(function(tx){
		tx.executeSql('SELECT USER_NO FROM USER', [], function(tx, res){
			var user_no = res.rows.item(0).USER_NO;
			
			tx.executeSql('SELECT * FROM LOG', [], function(tx, res){
				console.log('res.rows.length : ' + res.rows.length);
				var logList = [];
				
				for (var i = 0; i < res.rows.length; i++) {
					var item = res.rows.item(i);
					var logObj = {USER_NO : user_no, ACTION : item.TITLE, START_TIME : item.START_TIME
							, END_TIME : item.END_TIME, DURATION : item.DURATION};
					logList.push(logObj);
				}
				
				$.post('http://14.32.66.98:1111/submitLog', {'logList' : logList}).done(function(data){
					console.log(data);
				});
				
			});
			
		});
	}, db_errorCB);
};


// 랜덤 조건의 다른 사용자 LOG 얻기
var db_getOtherLog = function(){
	db.transaction(function(tx){
		tx.executeSql('SELECT * FROM USER', [], function(tx, res){
			var me = res.rows.item(0);
			if (me.EMAIL == null) {
				//history.back();
				$("#member").css("display", "none");
				$("#notMember").css("display", "");
			} else {
				$("#member").css("display", "");
				$("#notMember").css("display", "none");
				
				$.post('http://14.32.66.98:1111/other', me).done(function(data){
					// 유저 정보 가공 후 출력
					var otherUser = data[0];
				
					var gender = otherUser.GENDER;
					setGender(gender);
					var age = otherUser.AGE;
					setAge(age);
					var job = otherUser.JOB;
					setJob(job);
					var scholar = otherUser.SCHOLAR;
					setScholar(scholar);
					var salary = otherUser.SALARY;
					setSalary(salary);
					console.log(otherUser.SCHOLAR);
					var spend = otherUser.SPEND;
					setSpend(spend);
					var marry = otherUser.MARRY;
					setMarry(marry);
					
					
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
			}
		});
	}, db_errorCB);
};


function setGender(gender) {
	if(gender == 1) {
		//$(".userGender").text("male");	
		$(".userGender").append("<img src='./css/img/male.png'/>");
	} else {
		//$(".userGender").text("female");
		$(".userGender").append("<img src='./css/img/female.png'/>");
	}
}
function setAge(age) {
	if(age < 20) {
		printAge("Teenagers");
	} else if(age < 25) {
		printAge("Early 20's");
	} else if(age == 25) {
		printAge("Mid 20's");
	} else if(age < 30) {
		printAge("Late 20's");
	} else if(age < 40) {
		printAge("30's");
	} else if(age < 50) {
		printAge("40's");
	} else if(age < 60) {
		printAge("50's");
	} else if(age < 70) {
		printAge("60's");
	} else {
		printAge("70's~");
	}
}
function printAge(age){
	$(".userAge").text(age);
}
function setJob(job) {
	if(job == 1) {
		$(".userJob").text("Business Man");
	} else if(job == 2) {
		$(".userJob").text("Student");
	} else if(job == 3) {
		$(".userJob").text("Between the jobs");
	} else if(job == 4){
		$(".userJob").text("Office Worker");
	} else {
		$(".userJob").text("Free-lance");
	}
}
function setScholar(scholar) {
	if(scholar == 1) {
		  $(".userScholar").text("Still attending");
	  } else if(scholar == 2) {
		  $(".userScholar").text("High School");
	  } else if(scholar == 3) {
		  $(".userScholar").text("College Degree");
	  } else {
		  $(".userScholar").text("Masters or Do");
	  }
}
function setSalary(salary) {
	if(salary == 1) {
		$(".userSalary").text("under 1000");
	} else if(salary == 2) {
		$(".userSalary").text("1001-2000");
	} else if(salary == 3) {
		$(".userSalary").text("2001-3000");
	} else if(salary == 4) {
		$(".userSalary").text("3001-4000");
	} else if(salary == 5) {
		$(".userSalary").text("4001-5000");
	} else if(salary == 6) {
		$(".userSalary").text("over 5001");
	}
}
function setSpend(spend) {
	$(".userSpend").text(spend + "만원");
}
function setMarry(marry) {
	if(marry == 1) {
		$(".userMarry").text("Married");
	} else {
		$(".userMarry").text("Single");
	}
}


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