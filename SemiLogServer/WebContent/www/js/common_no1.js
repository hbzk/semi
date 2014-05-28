var x;

function myFunction(e)	{			
	$("#slideRight").mouseup(function(){
		x = e.clientX;			
	});
}

$(function(){
	
	
	
	timeclock();
	
	
	
/* -------------------------슬라이드--------------------------- */
	 var lbDown = false;
    var msDown = false;
    var box = $('body');
    var offsetPx = 100;
    var boxOffset = box.offset().left;
    var boxWidth = box.width();
     $("#wrap").load('OneChat.html');
     $("#pane").css('display', 'none');
     $("#pane2").css('display', 'none');

     
    var downX;
     $('#wrap').mousedown(function(e) {
    	downX = e.pageX;
    	
        if (e.pageX) {
        	
          msDown = true;
        } else {
        	
        	return false;
        }
      });
  
     $("#slideRight").mouseup(function(e) {
    	 if (msDown) {
    		 var mouseX = e.pageX;
    		 var boxMouseX = mouseX - boxOffset;
    		 if (e.pageX < downX) {
    			 $("#pane").hide("slide", {
    				 direction : "right"
    			 }, 600);
    			 $("#pane").show("slide", {
    				 direction : "right"
    			 }, 600);
    			 lbDown = false;
    			 msDown = false;
    			 $("#wrap").css("display","none");
    		 } 
    	 }
     });
     

     
     var downX1;
    $('#pane').mousedown(function(e) {
    	downX1 = e.pageX;
      if (e.which) {
        lbDown = true;
      } else {
    	  return false;
      }
     });
    $("#slideLeft").mouseup(function(e) {
        if (lbDown) {
          var mouseX = e.pageX;
          var boxMouseX = mouseX - boxOffset;
          if (e.pageX > downX1) {
            $("#pane").hide("slide", {
              direction : "right"
            }, 600);
            $("#wrap").show("slide", {
              direction : "left"
            }, 600);
            msDown = false;
            lbDown = false;
            $("#pane").css("display","none");
          }
        }
      });
    
    
    
    
    var downX2;
    $('#pane2').mousedown(function(e) {
    	downX2 = e.pageX;
        if (e.which) {
          lbDown = true;
        } else {
        	return false;
        }
      });
    $(".slideLeft2").mouseup(function(e) {
        if (lbDown) {
          var mouseX = e.pageX;
          var boxMouseX = mouseX - boxOffset;
          if (e.pageX > downX2) {

            $("#pane").hide("slide", {
              direction : "right"
            }, 600);
            $("#wrap").show("slide", {
              direction : "left"
            }, 600);
            msDown = false;
            lbDown = false;
            $("#pane").css("display","none");
            $("#pane2").css("display", "none");
          }
        }
      });
	
	
	
	
	
	$("#goList").click(function(){
		$("#wrap").css("display", "none");
		$("#pane").css("display", "none");
		$("#pane2").css("display", "");
	});
	
	$("#goPie").click(function(){
		$("#wrap").css("display", "none");
		$("#pane2").css("display", "none");
		$("#pane").css("display", "");
	});
	
	
	
	

/* ---------------------------슬라이드 & 자동완성------------------------------------------- */	
	
	/*
	
	
	
	
	$("#slide").css("display", "none");

	$().click(function() {
		$(".img").css("display", "");
		$("hr").css("display", "");
		$("#icons").appendTo("#slide");
		$("#input").val("");
		$("#slide").toggle("fade");
	});
	
		
	$("#input").click(function(){
		$("#input").val("");
	});
	
	
	 $("#listForm input[name=srch_text]").keydown(function(e){
	        if(e.keyCode == 13){
	            e.cancelBubble = true;
	            $("#btn_search").click();
	            return true;
	        }
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

 */
	
	
	data = [
	        ['Exercise',10],
	        ['Play',4],
	        ['TV',3],
	        ['ETC',7],
	        ];
	
	      console.log(data);
	      $('#pieChart').pieChart(data,250,"pie");


	  
	      
});








		/* ------------------------------------------------------ */

		
var now = new Date();
var minute = now.getMinutes().toString();
var second = now.getSeconds().toString();
minute = 60;
second = 00;
end=0;

function timeclock(){
  if(second == 00) {
    minute -= 1 ;
    second = 60 ;
  } else{
    second = second-1;
  }
  
  
  if ((minute < 0) && (end==0)) {
    alert('카운트 다운 종료');
    end=1;
    display.innerHTML='<font color=blue>카운트다운은 종료되었슴.</font>';
  }
  document.clock.txtMins.value = minute;
  if (second < 10) {
    document.clock.txtSecs.value = 0 + second.toString();
  } else {
    document.clock.txtSecs.value = second;
  }
  if (minute < 10) {
      document.clock.txtMins.value = 0 + minute.toString();
    } else {
      document.clock.txtMins.value = minute;
    }
  setTimeout("timeclock()", 1000);
}