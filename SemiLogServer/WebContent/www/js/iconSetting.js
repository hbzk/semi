 var activities, selectedOne, selectedList = [],activityAll, activityList = [] 
	  		,activitySelected, alreadySelected, iconCount;
	  
	$(window).load(function() {
	  
		activityAll = $('.activityIcon > [data-name]');
		activityAll.attr("data-flag",false);
		
		
		//모든 액티비티이름 배열 만들기
		for(i = 0 ;  i < activityAll.length ;  i++){
			var activityOne = activityAll[i].getAttribute('data-name');
			$(activityAll[i]).prepend("<div class='actName'>" + activityOne + "</div>");
			activityList.push(activityOne);
		}
		
	  //main창에서 선택된 icon들
		activitySelected = $('.icon > [data-name]');
	  console.log("activitySelected length is " + activitySelected.length);
		
	  for (k =0 ; k < activitySelected.length ; k++){
			selectedOne = activitySelected[k].getAttribute('data-name');
			console.log(k + " == "+ selectedOne);		
			if($.inArray(selectedOne,activityList)){
					$(".activityIcon i[data-name =" + selectedOne + " ]")
											.parent()
											.append('<div class="checkBack"></div>')
											.append('<div class="check"><i class="fa fa-check" data-flag= "true"></i></div>');
					
			}
		}
	//check표시 된 아이콘 count하기
		selectCount();
	
	//icon클릭했을때 동작
		$(".activityIcon").on("click",$("i[data-name]"),function(event){
				//icon은 총 6개만선택가능
			if( iconCount == 6){
				//6개일때는 unselect만 가능
				if($(event.target).hasClass("fa-check") == true	){
					unselect(event.target);
				//6개 일때 클릭하면 알림창 띄우기 (not yet)
				}else{
					//alert("already fully selected");
					console.log("already fully selected");
				}
			}else if(iconCount < 6){
				if($(event.target).hasClass("fa-check") == true	){
					unselect(event.target);
				}else if($(event.target).hasClass("fa-check") == false &&$(event.target).attr("data-name") != null  ){
					select(event.target);
				}
			}
		});
	});
	
	//아이콘 선택하기
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
	//아이콘 선택취소하기
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
		console.log("check class = = = = = = = = = =");
		iconCount = $(".fa-check").length;
		console.log(iconCount);
	}