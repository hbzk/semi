	  var dragSrc, dragImg, dropSrc, draggingEleId,droppedEleClass, wholeTag,mainTag, mainSrc;
	  function drag(){
		  $( ".draggingItem" ).draggable({
			  revert: "invalid",
	          start: function(event, ui) {
	        	  mainTag = $(".droppableMain")[0].outerHTML;
	              $(this).removeClass('ui-draggable-dragging');
	              draggingEleId = event.target.getAttribute('id');
	              droppedEleClass = event.target.getAttribute('class');
	              wholeTag = $(this)[0].outerHTML;
	              dragImg = $(this).find('img');
	              dragSrc = $(this).find('img').attr('src');
	              $(this).css('z-index','999');
	          },
	          stop: function(event, ui) {
	              $(this).css('z-index','0');
	          }
	  });
	  }
	  function drop(){
		  $( ".droppableMain" ).droppable({
			  	 accept: ".draggingItem",
		         drop: function( event, ui ) {
		        	 if($(".draggingItem").length==6){
		        	 mainSrc=$(this).find('img').attr('src');
		             dropSrc = $(this).find('img').attr('src',dragSrc);
		             dragImg.removeAttr('src');
		             document.getElementById(draggingEleId).remove(); //drag된 아이템 객체 지우기
		        	 }
		            $("#droppableMain").on('click',function(){
		           	  if($(".draggingItem").length==5){
				       	  $(this).find('img').attr('src',mainSrc);
				       	  $(wholeTag).appendTo("#iconMainDiv");
		           	  }
		           	  drag();
		             });
		         }
		  });
	  }
	  function countC(){ 
		  var length = $(".draggingItem").length;
	  }
	  function dragDrop(){
		  drag();
		  drop();
	  }
window.onload=dragDrop;