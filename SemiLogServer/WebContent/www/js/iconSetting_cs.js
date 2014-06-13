 var activities, selectedOne, selectedList = [],activityAll, activityList = [] 
	  		,activitySelected, alreadySelected, iconCount;

 //DB 변수
 var db = window.openDatabase("Database", "1.0", "LogDB", 2 * 1024 * 1024);
 
$(window).load(function() {
	// 아이콘 위치 교체 드래그 드롭 활성화
	setting_drag();
	setting_drop();
	
	db_init();
	
	loadSelectedIcon();

	activityAll = $('.activityIcon > [data-name]');
	activityAll.attr("data-flag",false);
	
	//모든 액티비티이름 배열 만들기
	for(var i = 0 ;  i < activityAll.length ;  i++){
		var activityOne = activityAll[i].getAttribute('data-name');
		$(activityAll[i]).prepend("<div class='actName'>" + activityOne + "</div>");
		activityList.push(activityOne);
	}

	//icon클릭했을때 동작
	$(".activityIcon").on("click",$("i[data-name]"),function(event){
			//icon은 총 6개만선택가능
		if( iconCount == 6){
			//6개일때는 unselect만 가능
			if($(event.target).hasClass("fa-check") == true	){
				unselect(event.target);
			//6개 일때 클릭하면 알림창 띄우기 (not yet)
			}else{
				errorFull();
				console.log("already fully selected ; 6 icons");
			}
		}else if(iconCount < 6){
		
			if($(event.target).hasClass("fa-check") == true	){
				unselect(event.target);
			}else if($(event.target).hasClass("fa-check") == false &&$(event.target).attr("data-name") != null  ){
				select(event.target);
			}
		}
		
		// 아이콘 위치 교체 드래그 드롭 활성화
		setting_drag();
		setting_drop();
	});
	
	$(".back").click(function(e){
		if(iconCount < 6){
			e.preventDefault();
			errorUnderSix();
		}
	});
	
});


//아이콘 선택
function select(selectTarget){
	var clickSelectActivty = $(selectTarget).attr("class");
	console.log(clickSelectActivty);
	$(".selected_icon .icon_row").append("<div class='icon'><i data-name=" +$(selectTarget).attr('data-name')+" class=" + "'" +clickSelectActivty +"'" +"></i></div>");
	console.log($(selectTarget).attr('data-name'));
	$(selectTarget).parent(".activityIcon")
			.append('<div class="checkBack"></div>')
			.append('<div class="check"><i class="fa fa-check" data-flag= "true"></i></div>');
	selectCount();
}
//아이콘 선택취소기
function unselect(selectTarget){
	var alreadySelectedActivity = $(selectTarget).parent(".check").parent(".activityIcon").children("[data-name]");
	var activityName = $(alreadySelectedActivity).attr('data-name');
	$(".icon i[data-name =" + activityName + " ]").parent().remove();
	//$(".activityIcon i[data-name =" + selectedOne + " ]")
	$(selectTarget).parent().siblings("div").remove();
	$(selectTarget).parent().remove();
	selectCount();
}
//check표시 된 아이콘개수 count하기
function selectCount(){
	iconCount = $(".fa-check").length;
	console.log("iconCount == "+iconCount);
	if(iconCount == 6){
		db_selectIconUpdate();
	}
}


// 6개 선택된 ICON DB에 저장하기
function db_selectIconUpdate(){
	db.transaction(function(tx) {
		
		var sixSelected = $(".selected_icon .icon_row .icon > [data-name]");
		var selectedNames = new Array();
		
		for (var i=0; i < 6 ;i++){
			selectedNames.push($(sixSelected[i]).attr('data-name'));
		}
		
		for( var i=0 ; i < activityList.length; i++){
			var selectedPosition = $.inArray(activityList[i],selectedNames) + 1;
			if ($.inArray(activityList[i],selectedNames) >= 0){
				tx.executeSql('UPDATE ICONLIST SET POSITION=? WHERE ICON_NAME=? ', [selectedPosition.toString(), activityList[i]], function(tx, res) {
				}, db_errorCB);
			} else {
				tx.executeSql('UPDATE ICONLIST SET POSITION=? WHERE ICON_NAME=? ', ['-', activityList[i]], function(tx, res) {
				}, db_errorCB);
			}
			
		}
		
	});
}

//DB 초기화
function db_init() {
	db.transaction(function(tx) {
		//tx.executeSql('DROP TABLE IF EXISTS ICONLIST');
		tx.executeSql('CREATE TABLE IF NOT EXISTS ICONLIST (POSITION TEXT, ICON_NAME TEXT PRIMARY KEY, CLASS_NAME TEXT, TIMER_VAL INTEGER)');
		
		tx.executeSql('INSERT OR IGNORE INTO ICONLIST '  
			+ ' SELECT 0 AS POSITION, "headphones" AS ICON_NAME, "fa fa-headphones" AS CLASS_NAME, 80 AS TIMER_VAL'
			+ ' UNION SELECT 1,"music", "fa fa-music", 60'
			+ ' UNION SELECT 2,"automobile", "fa fa-automobile", 60'
			+ ' UNION SELECT 3,"phone", "fa fa-phone", 80'
			+ ' UNION SELECT 4,"banknote", "li li_banknote", 60'
			+ ' UNION SELECT 5,"comment", "fa fa-comment", 60'
			+ ' UNION SELECT 6,"dribbble", "fa fa-dribbble", 60'
			+ ' UNION SELECT 0,"plane", "fa fa-plane", 60'
			+ ' UNION SELECT 0,"gamepad", "fa fa-gamepad", 60'
			+ ' UNION SELECT 0,"puzzle", "fa fa-puzzle-piece", 60'
			+ ' UNION SELECT 0,"beer", "fa fa-beer", 60'
			+ ' UNION SELECT 0,"glass", "fa fa-glass", 60'
			+ ' UNION SELECT 0,"video", "li li_video", 60'
			+ ' UNION SELECT 0,"hospital", "fa fa-hospital-o", 60'
			+ ' UNION SELECT 0,"cutlery", "fa fa-cutlery", 60'
			+ ' UNION SELECT 0,"desktop", "fa fa-desktop", 60'
			+ ' UNION SELECT 0,"moon", "fa fa-moon-o", 60'
			+ ' UNION SELECT 0,"mobile", "fa fa-mobile", 90'
			+ ' UNION SELECT 0,"coffee", "fa fa-coffee", 60'
			+ ' UNION SELECT 0,"tv", "li li_tv", 65'
			+ ' UNION SELECT 0,"shirt", "li li_t-shirt", 60'
			+ ' UNION SELECT 0,"home", "fa fa-home", 60'
			+ ' UNION SELECT 0,"trash", "li li_trash", 60'
			+ ' UNION SELECT 0,"scissors", "fa fa-scissors", 60'
			+ ' UNION SELECT 0,"flask", "fa fa-flask", 11'
			+ ' UNION SELECT 0,"leaf", "fa fa-leaf", 60'
			+ ' UNION SELECT 0,"pen", "li li_pen", 60'
			+ ' UNION SELECT 0,"bulb", "li li_bulb", 60'
			+ ' UNION SELECT 0,"book", "fa fa-book", 60'
			+ ' UNION SELECT 0,"bookmark", "fa fa-bookmark", 60'
			+ ' UNION SELECT 0,"child", "fa fa-child", 60'
			+ ' UNION SELECT 0,"stethoscope", "fa fa-stethoscope", 60'
			+ ' UNION SELECT 0,"spoon", "fa fa-spoon", 60'
			+ ' UNION SELECT 0,"code", "fa fa-code", 22'
			+ ' UNION SELECT 0,"keyboard", "fa fa-keyboard-o", 60');
	}, db_errorCB);
}

function db_errorCB(e) { // query 에러시 호출 함수
	console.log(e);
	console.log("e.message :" + e.message);
}

//DB에 저장된 아이콘 로드
function loadSelectedIcon(){
	var iconDiv = $(".selected_icon .icon_row .icon");
	console.log("Load DB - data (selectedIcon)");
	db.transaction(function(tx){
		tx.executeSql('SELECT * FROM ICONLIST', [], function(tx, rs){
			for( var i=0 ; i < rs.rows.length ; i++){
				var row = rs.rows.item(i);
				
				if (row.POSITION > 0) {
					$($(iconDiv)[row.POSITION - 1]).append("<i data-name = '"+ row.ICON_NAME +"' class = '"+ row.CLASS_NAME +"'></i>");
				}
				
				//main창에 있는 아이콘들 체크표시하기
				selectedOne = $($(iconDiv)[row.POSITION - 1]).children().attr('data-name');
				if($.inArray(selectedOne,activityList >= 0)){
						$(".activityIcon i[data-name =" + selectedOne + " ]").parent()
							.append('<div class="checkBack"></div>')
							.append('<div class="check"><i class="fa fa-check" data-flag= "true"></i></div>');
				}
			}
			setting_drag();
			setting_drop();
			selectCount();
		});
	});
	
}

// setting icon replace
function setting_drag() {
	$('.icon>i').draggable({distance: 20}, {revert: true}, {revertDuration: 0}, {containment: ".selected_icon"}, {zIndex: 9});
}

function setting_drop() {
	$('.icon>i').droppable({tolerance: 'intersect'},{drop: function(event, ui){
		var settingDraggerParent = $(event.toElement).parent();
		var settingDropperParent = $(event.target).parent();
		
		settingDraggerParent.append(event.target);
		settingDropperParent.append(event.toElement);
		db_selectIconUpdate();
	}});
}
function errorFull() {
	$().toastmessage('showToast',{
	    text     : '벌써 6개 선택 다 됐거등요',
	    stayTime : 1500,
	    sticky   : false,
	    position : 'middle-center',
	    type     : 'error',
	    close    : function () {console.log("toast is closed ...");}
	});
}

function errorUnderSix() {
	$().toastmessage('showToast',{
	    text     : '여섯개 선택해야 돼요옷!!!',
	    inEffectDuration : 100,
	    stayTime : 1500,
	    sticky   : false,
	    position : 'middle-center',
	    type     : 'error',
	    close    : function () {console.log("toast is closed ...");}
	});
}