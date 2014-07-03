var db = window.openDatabase("Database", "1.0", "LogDB", 2 * 1024 * 1024);
var firstResultDate, firstResultDate, targetDate, scope;
var dayList = []; var weekList = []; var monthList = []; 		// scope 출력을 위한 List
var iconList = []; var colorList = [];									// chart 출력을 위한 List
var clickedTable; 

$(document).ready(function(){
	db_dayList();			// 페이징을 위한 전체 목록
	colorListing();
	
	scope = 'LASTDAY';	
	db_selectSearch(scope); 	// 마지막 날 출력
	
	$('#deleteAll').click(function(){
		if (confirm('정말 다 지움?')) {
			db.transaction(function(tx) { 
				tx.executeSql("DELETE FROM LOG");
			}, db_errorCB);
			location.reload(true);
		}
	});
	
	 $('.hover').bind('touchstart touchend', function(e) {
	        e.preventDefault();
	        $(this).toggleClass('hover_effect');
	    });
	
	
	
	// 좌/우 화살표 클릭
	$('#date .left').click(function(){
		nav(-1);
	});
	$('#date .right').click(function(){
		nav(+1);
	});
	
	
	// 일, 주, 월 클릭
	$('#day').click(function(){
		scope = 'DAY';
		scopeClick(dayList);
		$(this).css("background",naviColor); //현재보고있는 페이지 
		$('#month').css("background",unSelectedColor);  //나머지
		$('#week').css("background",unSelectedColor);
	});
	$('#week').click(function(){
		scope = 'WEEK';
		scopeClick(weekList);
		$(this).css("background",naviColor);
		$('#month').css("background",unSelectedColor);
		$('#day').css("background",unSelectedColor);
	});
	$('#month').click(function(){
		scope = 'MONTH';
		scopeClick(monthList);
		$(this).css("background",naviColor);
		$('#day').css("background",unSelectedColor);
		$('#week').css("background",unSelectedColor);
	});
});
// <-- $(document).ready

$(document).on("click",".rtDelete",function(e){
	if (confirm('정말 지움?')) {
		var dbId = $(e.target).parent(".rtDelete").siblings(".rtIcon")[0].attributes[0].value;
		clickedTable = $(e.target).parent(".rtDelete").parent(".rtTable");
		db_delete(dbId);
	}
});

$(document).on("click",".rtTable",function(){
	$(clickedTable).fadeOut(700);
});





// ================================================= 함수 정의

// chart에서 사용할 colorList 만들기
var colorListing = function() {
	db.transaction(function(tx) {
		tx.executeSql('SELECT ICON_NAME AS title, BACK_COL AS color FROM ACTION ', [], function(tx, res){
			for (var i = 0; i < res.rows.length; i++) {
				iconList.push(res.rows.item(i).title); 			// chart에서 사용할 iconList
				colorList.push(res.rows.item(i).color); 		// colorList
			}
		});
	}, db_errorCB);
};


// scope 클릭시 
var scopeClick = function(list) {
	targetDate = list[list.length-1]; 			// 해당 scope 마지막 기록을 타겟으로 설정
	navDisplay(list); 								// 좌우 화살표 출력 판단
	db_selectSearch(scope, targetDate); 	// 결과 출력 호출
};

// 좌/우 nav 클릭시 
var nav = function (direction) {
	var list = [];
	if (scope == 'LASTDAY') scope = 'DAY';
	
	// scope에 따른 변수 설정
	if (scope == 'DAY') list = dayList;
	else if (scope == 'WEEK') list = weekList;
	else if (scope == 'MONTH') list = monthList;
	
	targetDate = taggetting(list, direction); 		// 타겟 구하기 
	db_selectSearch(scope, targetDate); 			// 결과 출력 호출
};

// 좌/우 nav 타겟 구하는 함수
var taggetting = function (list, direction) {
	var lastTagget;
	(scope == 'DAY') ? lastTagget = firstResultDate : lastTagget = targetDate ;
	targetDate = list[$.inArray(lastTagget, list) + direction];
	navDisplay(list); 										// 좌우 화살표 출력 판단
	return targetDate;
};

// 좌우 화살표 출력 판단
var navDisplay = function (list) {
	(targetDate == list[0]) ? $('#date .left').css('display', 'none') : $('#date .left').css('display', 'block');
	(targetDate == list[list.length-1]) ? $('#date .right').css('display', 'none') : $('#date .right').css('display', 'block');
};



// 날짜, 범위 받고 쿼리 수행
var db_selectSearch = function (scope, target) { 
	if (scope == 'LASTDAY') { 	// 마지막 날짜 출력
		var lastActionSql = "(SELECT date(START_TIME) AS stDay FROM LOG ORDER BY START_TIME DESC LIMIT 1)";
		db.transaction(function(tx) {
			tx.executeSql("SELECT *, strftime('%Y-%m-%d', START_TIME) AS strtDay FROM LOG "
				+" WHERE START_TIME BETWEEN date("+lastActionSql+") AND date("+lastActionSql+", ?) ORDER BY START_TIME", ['+1 day'], function(tx, res) {
					db_listing(res, scope);
			});
		}, db_errorCB);
		
	} else { 	// 범위에 따른 WHERE 문 선택
		var whereSql = '';
		if (scope == 'DAY') {
			whereSql = " WHERE START_TIME BETWEEN date(?) AND date(?, '+1 day') ORDER BY START_TIME";
		} else if (scope == 'MONTH') {
			whereSql = " WHERE START_TIME BETWEEN date(?) AND date(?,'+1 month') ORDER BY START_TIME";
		} else if (scope == 'WEEK') {
			whereSql = " WHERE START_TIME BETWEEN date(?) AND date(?,'+7 day') ORDER BY START_TIME";
		} else {
			console.log('scope error :');
			console.log(scope);
		}
		
		db.transaction(function(tx) {
			tx.executeSql("SELECT *, strftime('%Y-%m-%d', START_TIME) AS strtDay FROM LOG " + whereSql, [target, target], function(tx, res) {
				db_listing(res, scope);
			});
		}, db_errorCB);
	}
};

// nav가 사용할 날짜 목록 만들기
var db_dayList = function () { 
	db.transaction(function(tx) {
		tx.executeSql("SELECT strftime('%Y-%m-%d', START_TIME) AS strtDay, strftime('%Y-%m', START_TIME) AS strtMonth FROM LOG ORDER BY strtDay", [], function(tx, res) {
			var len = res.rows.length;
			console.log("LOG (All): " + len + " rows found.");
			
			for (var i=0; i<len; i++){
				// 일 목록(dayList) 만들기
				if ($.inArray(res.rows.item(i).strtDay, dayList) == -1) {	
					dayList.push(res.rows.item(i).strtDay);
					
					// 주 목록(weekList) 만들기
					var mondayTemp = localISOString(getLastMonday(res.rows.item(i).strtDay)).substring(0, 10);
					if ($.inArray(mondayTemp, weekList) == -1) { 		
						weekList.push(mondayTemp);
					}
					// 월 목록(monthList) 만들기
					if ($.inArray(res.rows.item(i).strtMonth.concat('-01'), monthList) == -1) { 		
						monthList.push(res.rows.item(i).strtMonth.concat('-01'));
					}
				}
			}
		});
	}, db_errorCB);
};

// 결과 하나 지우기
var db_delete = function (no){
	db.transaction(function(tx){
		tx.executeSql("DELETE FROM LOG WHERE ID = ?",[no]);
	}, db_errorCB);
};

//query 에러시 호출 함수
var db_errorCB = function (e) {
	console.log(e);
	console.log("e.message :" + e.message);
};

// 00:00:00 형태 만들기 함수
var pad = function (n){return n<10 ? '0'+n : n;};

// 월~일 범위 중 월요일 얻기
var getLastMonday = function (d) {
	var t = new Date(d);
	var weekDay  = t.getDay();
	t.setDate(t.getDate() - t.getDay() + (weekDay === 0 ? -6 : 1));
	return t;
	//return new Date(t.getTime() + t.getTimezoneOffset()*60000);
};

// 일요일 얻기
var getNextSunday = function (d) {
	var t = new Date(d);
	var weekDay  = t.getDay();
	t.setDate(t.getDate() - t.getDay() + (weekDay === 0 ? 0 : 7));
	return t;
	//return new Date(t.getTime() + t.getTimezoneOffset()*60000);
};

// local 날짜 형태 만들기 (2014-06-19T14:12:35.261)
var localISOString = function(d) {
var pad = function (n){return n<10 ? '0'+n : n;};
return d.getFullYear()+'-'
  + pad(d.getMonth()+1)+'-'
  + pad(d.getDate())+'T'
  + pad(d.getHours())+':'
  + pad(d.getMinutes())+':'
  + pad(d.getSeconds())+'.'
  + pad(d.getMilliseconds());
};