$(function(){
	$("#slide").css("display", "none");

	$("#menuLeft").click(function() {
		$("#slide").toggle("slide");
	});
		
	$("#input").click(function(){
		$("#input").val("");
	});
	
	
	
	


	var availableTags = [
	                     "art", "미술",
	                     "bike", "바이크",
	                     "bikerC", "자전거",
	                     "booklet", "책",
	                     "briefcase", "근무",
	                     "brush", "공부",
	                     "car", "운전",
	                     "computer", "컴퓨터",
	                     "game", "게임",
	                     "micro", "노래방",
	                     "motorcy", "오토바이",
	                     "running", "달리기",
	                     "scooter", "스쿠터",
	                     "train", "전철"
	                     ];

	$('#input').autocomplete({
		source: availableTags,
		select: function (event, ui) {
			
			
				if(ui.item.value) {
					$(".img").css("display", "none");
					$("hr").css("display", "none");
					$("." + ui.item.value).css("display", "");
				} 
		},
		selectFirst: true,
		minLength: 1,
		open: function () {
			$(this).removeClass("ui-corner-all").addClass("ui-corner-top");
		},
		close: function () {
			$(this).removeClass("ui-corner-top").addClass("ui-corner-all");
		}
	});





});