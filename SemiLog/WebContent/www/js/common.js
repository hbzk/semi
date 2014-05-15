$(function(){
	$("#slide").css("display", "none");

	$("#menuLeft").click(function() {
		$("#slide").toggle("fade");

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
			//아이템 선택시 처리 코드

			if($("#input").val() == "art" || $("#input").val() == "미술") {
				$(".img").css("display", "none");
				$("hr").css("display", "none");
				$(".i1").css("display", "");
			} else if($("#input").val() == "bike" || $("#input").val() == "바이크"){
				$(".img").css("display", "none");
				$("hr").css("display", "none");
				$(".i2").css("display", "");
			} else if($("#input").val() == "bikerC" || $("#input").val() == "자전거"){
				$(".img").css("display", "none");
				$("hr").css("display", "none");
				$(".i3").css("display", "");
			} else if($("#input").val() == "booklet" || $("#input").val() == "책"){
				$(".img").css("display", "none");
				$("hr").css("display", "none");
				$(".i4").css("display", "");
			} else if($("#input").val() == "briefcase" || $("#input").val() == "근무"){
				$(".img").css("display", "none");
				$("hr").css("display", "none");
				$(".i5").css("display", "");
			} else if($("#input").val() == "brush" || $("#input").val() == "공부"){
				$(".img").css("display", "none");
				$("hr").css("display", "none");
				$(".i6").css("display", "");
			} else if($("#input").val() == "car" || $("#input").val() == "운전"){
				$(".img").css("display", "none");
				$("hr").css("display", "none");
				$(".i7").css("display", "");
			} else if($("#input").val() == "computer" || $("#input").val() == "컴퓨터"){
				$(".img").css("display", "none");
				$("hr").css("display", "none");
				$(".i8").css("display", "");
			} else if($("#input").val() == "game" || $("#input").val() == "게임"){
				$(".img").css("display", "none");
				$("hr").css("display", "none");
				$(".i9").css("display", "");
			} else if($("#input").val() == "micro" || $("#input").val() == "노래방"){
				$(".img").css("display", "none");
				$("hr").css("display", "none");
				$(".i10").css("display", "");
			} else if($("#input").val() == "motorcy" || $("#input").val() == "오토바이"){
				$(".img").css("display", "none");
				$("hr").css("display", "none");
				$(".i11").css("display", "");
			} else if($("#input").val() == "running" || $("#input").val() == "달리기"){
				$(".img").css("display", "none");
				$("hr").css("display", "none");
				$(".i12").css("display", "");
			} else if($("#input").val() == "scooter" || $("#input").val() == "스쿠터"){
				$(".img").css("display", "none");
				$("hr").css("display", "none");
				$(".i13").css("display", "");
			} else if($("#input").val() == "train" || $("#input").val() == "전철"){
				$(".img").css("display", "none");
				$("hr").css("display", "none");
				$(".i14").css("display", "");
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