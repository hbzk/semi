$(function(){
	$("#slide").css("display", "none");

	$("#menuLeft").click(function() {
		$("#slide").toggle("fade");

	});



	var availableTags = [
	                     "art", "미술",
	                     "bike",
	                     "bikerC",
	                     "booklet",
	                     "briefcase",
	                     "brush",
	                     "car",
	                     "computer",
	                     "game",
	                     "micro",
	                     "motorcy",
	                     "running",
	                     "scooter",
	                     "train"
	                     ];

	$('#input').autocomplete({
		source: availableTags,
		select: function (event, ui) {
			//아이템 선택시 처리 코드

			if($("#input").val() == "art" || $("#input").val() == "미술") {
				
						$(".img").css("display", "none");
						$("hr").css("display", "none");
						$(".i1").css("display", "");
			
 			} else {
				
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