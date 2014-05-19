$(function(){
	
	var lbDown = false;
    var msDown = false;
    var box = $('body');
    var offsetPx = 100;
    var boxOffset = box.offset().left;
    var boxWidth = box.width();
    $("#wrap").load('OneChat.html');
    $("#pane").css('display', 'none');

    $('#pane').mousedown(function(e) {
      if (e.which === 1) {
        lbDown = true;
      }
    });
    $('#pane').mouseup(function(e) {
      if (e.which === 1) {
        lbDown = false;
      }
    });
    
   $('#wrap').mousedown(function(e) {
      if (e.which === 1) {
        msDown = true;
      }
    });
    $('#wrap').mouseup(function(e) {
      if (e.which === 1) {
        msDown = false;
      }
    });

    
    /*
    $("#aaa").mousemove(function(e) {
      if (msDown) {
        var mouseX = e.pageX;
        var boxMouseX = mouseX - boxOffset;
        if ((boxMouseX > offsetPx) && (boxMouseX < (boxWidth - offsetPx))) {
          $("#pane").hide("fade", {
            direction : "right"
          }, 500);
          $("#pane").show("fade", {
            direction : "right"
          }, 500);
          lbDown = false;
          msDown = false;
        }
        $("#wrap").css("display","none");
      }
    });
    */
   
    $('#bbb').mousemove(function(e) {
        if (lbDown) {
          var mouseX = e.pageX;
          var boxMouseX = mouseX - boxOffset;
          if ((boxMouseX > offsetPx) && (boxMouseX < (boxWidth - offsetPx))) {

            $("#pane").hide("fade", {
              direction : "right"
            }, 500);
            $("#wrap").show("fade", {
              direction : "left"
            }, 500);
            msDown = false;
            lbDown = false;
          }
          $("#pane").css("display","none");
        }
      });
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
/* ---------------------------------------------------------------------- */	
	
	
	
	
	
	$("#slide").css("display", "none");

	$("#menuLeft").click(function() {
		$(".img").css("display", "");
		$("hr").css("display", "");
		$("#icons").appendTo("#slide");
		$("#input").val("");
		$("#slide").toggle("fade");
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
					$("hr").css("display", "");
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