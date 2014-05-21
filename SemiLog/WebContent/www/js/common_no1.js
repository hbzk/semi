var x;

function myFunction(e)	{			
	$("#slideRight").mouseup(function(){
		x = e.clientX;			
	});
}

$(function(){

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

     
    
     $('#wrap').mousemove(function(e) {
    	 console.log(e.pageX);
    	 console.log(x);
        if (e.pageX < x) {
          msDown = true;
        }   
      });
  
     $("#slideRight").mousemove(function(e) {
    	 if (msDown) {
    		 var mouseX = e.pageX;
    		 var boxMouseX = mouseX - boxOffset;
    		 console.log(boxMouseX);
    		 if (e.pageX < x) {
    			 $("#pane").hide("slide", {
    				 direction : "right"
    			 }, 600);
    			 $("#pane").show("slide", {
    				 direction : "right"
    			 }, 600);
    			 lbDown = false;
    			 msDown = false;
    		 }
    		 $("#wrap").css("display","none");
    	 }
     });
     
     
     
     
     
     
     
     
     
     
     
     
    $('#pane').mousemove(function(e) {
      if (e.which === 1) {
        lbDown = true;
      }
     });
    $("#slideLeft").mousedown(function(e) {
        if (lbDown) {
          var mouseX = e.pageX;
          var boxMouseX = mouseX - boxOffset;
          if ((boxMouseX > offsetPx) && (boxMouseX < (boxWidth - offsetPx))) {

            $("#pane").hide("slide", {
              direction : "right"
            }, 600);
            $("#wrap").show("slide", {
              direction : "left"
            }, 600);
            msDown = false;
            lbDown = false;
          }
          $("#pane").css("display","none");
        }
      });
    
    
    
    
    
    
    
    
    
    
    $('#pane2').mousedown(function(e) {
        if (e.which === 1) {
          lbDown = true;
        }
      });
    $(".slideLeft2").mousemove(function(e) {
        if (lbDown) {
          var mouseX = e.pageX;
          var boxMouseX = mouseX - boxOffset;
          if ((boxMouseX > offsetPx) && (boxMouseX < (boxWidth - offsetPx))) {

            $("#pane").hide("slide", {
              direction : "right"
            }, 600);
            $("#wrap").show("slide", {
              direction : "left"
            }, 600);
            msDown = false;
            lbDown = false;
          }
          $("#pane").css("display","none");
          $("#pane2").css("display", "none");
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





});