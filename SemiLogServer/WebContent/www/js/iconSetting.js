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
			selectedIcon_db_insert();
		}
	}
	
	
	// 6개 선택된 ICON DB에 저장하기
	function selectedIcon_db_insert(){
		db.transaction(function(tx) {
			var sixSelected = $(".selected_icon .icon_row .icon > [data-name]");
			for( var i=0 ; i< sixSelected.length; i++){
				var dataName = sixSelected[i].getAttribute("data-name");
				var className = sixSelected[i].getAttribute("class");
				tx.executeSql('INSERT or REPLACE into ICONSELECT (NO, ICON_NAME, CLASS_NAME) VALUES (?,?,?)', [ i + 1, dataName, className], function(tx, res) {
					tx.executeSql('select * from ICONSELECT;', [], function(tx, res) {
						console.log('res.rows.length --> ' + res.rows.length);
					});
				}, function(e) {
					console.log("ERROR: " + e.message);
				});
			}
			
		});
	}
	//DB 초기화
	function db_init() {
			
		//DB 테이블 삭제 
/*				db.transaction(
				function(tx){
					tx.executeSql('DROP TABLE ICONSELECT');
				}, function(err){
					console.log(err.message);
				}, function(){
					console.log('delete success');
				}
		);*/
	
		db.transaction(function(tx) {
			tx.executeSql('create table if not exists ICONSELECT (NO integer primary key, ICON_NAME text, CLASS_NAME text)');
		});
	}
	//DB에 저장된 아이콘 로드
	function loadSelectedIcon(){
		var iconDiv = $(".selected_icon .icon_row .icon");
		console.log("Load DB - data (selectedIcon)");
		db.transaction(function(tx){
			tx.executeSql('SELECT * FROM ICONSELECT',
					[],
					function(tx, rs){
						for( var i=0 ; i < rs.rows.length ; i++){
							var row = rs.rows.item(i);
							$($(iconDiv)[i]).append("<i data-name = '"+ row.ICON_NAME +"' class = '"+ row.CLASS_NAME +"'></i>");
							//main창에 있는 아이콘들 체크표시하기
							selectedOne = $($(iconDiv)[i]).children().attr('data-name');
							console.log(i + " == "+ selectedOne);
							console.log($.inArray(selectedOne,activityList));
							/* 못 찾으면 - 1, 찾으면 "배열에서 찾은 인덱스"를 리턴
							 * 0번 리턴(첫번째)인 경우에는 false로 실행이 안되고 있던게 원인으로 확인됨
							 *  if 문에 >= 0  추가해서 해결*/
							 
							if($.inArray(selectedOne,activityList >= 0)){
									$(".activityIcon i[data-name =" + selectedOne + " ]")
															.parent()
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
			
			selectedIcon_db_insert();
		}});
	}
	function errorFull() {
		$().toastmessage('showToast',{
		    text     : 'Already selected 6 Activities',
		    stayTime : 1500,
		    sticky   : false,
		    position : 'middle-center',
		    type     : 'error',
		    close    : function () {console.log("toast is closed ...");}
		});
	}
	
	function errorUnderSix() {
		$().toastmessage('showToast',{
		    text     : 'Selecte six Activities!!',
		    inEffectDuration : 100,
		    stayTime : 1500,
		    sticky   : false,
		    position : 'middle-center',
		    type     : 'error',
		    close    : function () {console.log("toast is closed ...");}
		});
	}