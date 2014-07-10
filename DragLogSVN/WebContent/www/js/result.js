var db = window.openDatabase("Database", "1.0", "LogDB", 2 * 1024 * 1024);
var firstResultDate, firstResultDate, targetDate, resRows, scope, userNo;
var dayList = []; var weekList = []; var weekEndList = []; var monthList = []; 		// scope 출력을 위한 List
var iconList = []; var colorList = [];									// chart 출력을 위한 List
var result = [];
var textType = true;
var clickedTable; 
var naviColor = "#F2B843";
var unSelectedColor = "#FFE0A1";

$(document).ready(function(){
	db_dayList();			// 페이징을 위한 전체 목록
	colorListing();
	
	getUserNo();
	
	scope = 'LASTDAY';	
	db_selectSearch(scope); 	// 마지막 날 출력
	
	$('.hover').bind('touchstart touchend', function(e) {
		e.preventDefault();
		$(this).toggleClass('hover_effect');
	});
	
	$('#type').click(function(){
		if (textType) { 
			textType = false;
			$('#type').text('TEXT'); 
			$('#share').css('display', '');
			$('#shareDiv').css('display', 'none');
			
		} else { 
			textType = true;
			$('#type').text('CHART');
			$('#share').css('display', 'none');
			$('#shareDiv').css('display', 'none');
		}
		
		db_listing(textType, resRows, scope);
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
/*------> $(function(){ });*/





// 결과를 Text list로 출력
var db_listing = function (textType, resRows, scope) {
	$('#resultList').html('').css('display', 'none');	// 리스트 초기화
	$('#chart').html('').css('display', 'none');
	
	var len = resRows.length;
	
	if (len == 0) {
		$('#description').html('아직 기록이 없습니다');
		$('#date .left').css('display', 'none');
		$('#date .right').css('display', 'none');
		
		$('#share').css('display', 'none');
	} else {
		//console.log("LOG (page): " + len + " rows found.");
		firstResultDate = resRows.item(0).strtDay;
		
		if (scope == 'LASTDAY') {
			$('#date>p').text(firstResultDate.replace(/-/g, '/').substring(5)); 	// 날짜 출력
			($.inArray(firstResultDate, dayList) > 0) ? $('#date .left').css('display', '') : $('#date .left').css('display', 'none');
			$('#date .right').css('display', 'none');
			
		} else if (scope == 'DAY') {
			$('#date>p').text(targetDate.replace(/-/g, '/').substring(5))
				.css('font-size', '200%'); 	// 날짜 출력
		} else if (scope == 'WEEK') {
			$('#date>p').text(targetDate.replace(/-/g, '/').substring(5) + ' ~ ' + weekEndList[weekList.indexOf(targetDate)])
				.css('font-size', '150%');
		} else if (scope == 'MONTH')  {
			$('#date>p').text(targetDate.replace(/-/g, '/').substring(0, 7))
				.css('font-size', '200%');
		}
		
		if (resRows.item(0).END_TIME == null){
			$('#description').html('선택된 기간에 기록이 없습니다');
		} else {
			
			
			// ================= TEXT 출력 =================  
			if (textType) {
				for (var i=0; i<len; i++){
					var duration = resRows.item(i).DURATION;
					if (duration < 60) {
						duration = duration + 's';
					} else if (duration < 3600){
						duration = Math.floor(duration%3600/60) + 'm ' + duration%60 + 's';
					} else {
						duration = Math.floor(duration/3600) + 'h ' + Math.floor(duration%3600/60) + 'm ' + duration%60 + 's';
					}
					
					var startTime = resRows.item(i).START_TIME;
					var endTime = resRows.item(i).END_TIME;
					
					if (endTime == null) break; 			// 진행중인것 출력 방지
					
					$('#resultList').css('display', '')
						.append($('<div class="rtTable">')
							.append('<div data-id= "'+resRows.item(i).ID +'" class="rtIcon">'+'<i class= "'+resRows.item(i).CLASSNAME+'"></i></div>')
							.append('<div class="rtTime">' + startTime.substring(11, 16) + ' ~ ' + endTime.substring(11, 16))
							.append('<div class="rtDuration">' + duration +'</div>')
							.append('<div class="rtDelete" style="display:none;"><i class="fa fa-times"></i></div>')
					);
					
				}
				
				// 결과 한 줄 지우기
				$('.rtTable').swipe({
					swipeLeft:function(event, direction, distance, duration, fingerCount) {
						eventRow = ($(event.target).parents('.rtTable').length == 1) ? $(event.target).parents('.rtTable') : $(event.target);
						eventNo = eventRow.find('.rtIcon').attr('data-id');
						eventDelete = eventRow.find('.rtDelete');
						eventDuration = eventRow.find('.rtDuration');
						
						eventDuration.fadeOut(700);
						eventDelete.fadeIn(700);
						
					}, threshold:50,
					
					swipeRight:function(event, distance, duration, fingerCount, fingerData) {
						eventDuration.fadeIn(500);
						eventDelete.fadeOut(500);
					}, threshold:50,
				});
				
				$('.rtDelete').click(function(){
					db_delete(eventRow, eventNo);
					
					db_selectSearch(scope, targetDate); // 리스트 갱신
				});
				
			// ================= CHART 출력 =================				
			} else {
				// 결과 누적 합산
				var resultObj = new Object();
				for (var i=0; i<len; i++) { 
					if (resRows.item(i).END_TIME == null) {
						console.log(resRows.item(i).END_TIME);
						break;
					}
					if (resultObj[resRows.item(i).TITLE] == undefined) {
						resultObj[resRows.item(i).TITLE] = resRows.item(i).DURATION; // 같은 값 없으면 저장
					} else {
						resultObj[resRows.item(i).TITLE] += resRows.item(i).DURATION; // 같은 값 있으면 합산
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
				result = [];
				for (var i=0; i<sortResult.length ; i++) {
					var tempObj = new Object();
					tempObj['title'] = sortResult[i][0];
					tempObj['value'] = sortResult[i][1];
					tempObj['color'] =  colorList[$.inArray(sortResult[i][0], iconList)]; 		// colorList에서 해당 아이콘 색 매칭
					
					result.push(tempObj);
				}
				//console.log(result);
				
				// 실제 차트 그리기
				$('#chart').css('display', '').drawDoughnutChart(result);
				
			}
		}
	}
};




// ================================================= 함수 정의

//결과 하나 지우기
var db_delete = function(rtTable, no) {
	db.transaction(function(tx){
		tx.executeSql("DELETE FROM LOG WHERE ID = ?",[no], function(tx, res){
			$(rtTable).fadeOut(700);
		});
	}, db_errorCB);
};

// 로컬 DB에서 USER_NO 얻기
var getUserNo = function() {
	db.transaction(function(tx){
		tx.executeSql("SELECT USER_NO FROM USER WHERE ID = 1", [], function(tx, res){
			if (res.rows.length != 0) {
				userNo = res.rows.item(0).USER_NO;
				console.log('--- USER_NO : ' + userNo);
			}
		});
	}, db_errorCB);
};


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
	(targetDate == list[0]) ? $('#date .left').css('display', 'none') : $('#date .left').css('display', '');
	(targetDate == list[list.length-1]) ? $('#date .right').css('display', 'none') : $('#date .right').css('display', '');
};



// 날짜, 범위 받고 쿼리 수행
var db_selectSearch = function (scope, target) { 
	if (scope == 'LASTDAY') { 	// 마지막 날짜 출력
		var lastActionSql = "(SELECT date(START_TIME) AS stDay FROM LOG ORDER BY START_TIME DESC LIMIT 1)";
		db.transaction(function(tx) {
			tx.executeSql("SELECT *, strftime('%Y-%m-%d', START_TIME) AS strtDay FROM LOG "
				+" WHERE START_TIME BETWEEN date("+lastActionSql+") AND date("+lastActionSql+", ?) ORDER BY START_TIME", ['+1 day'], function(tx, res) {
					resRows = res.rows;
					db_listing(textType, resRows, scope);
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
				resRows = res.rows;
				db_listing(textType, resRows, scope);
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
					var sundayTemp = localISOString(getNextSunday(res.rows.item(i).strtDay)).substring(5, 10);
					if ($.inArray(mondayTemp, weekList) == -1) { 		
						weekList.push(mondayTemp);
						weekEndList.push(sundayTemp);
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