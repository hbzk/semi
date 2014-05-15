	  var dragSrc, dragImg, dropSrc, draggingEleId,droppedEleClass, wholeTag,mainTag, mainSrc;
	  function drag(){
		  $( ".draggingItem" ).draggable({
	          start: function(event, ui) {
	        	  mainTag = $(".droppableMain")[0].outerHTML;
	        	  console.log("mainTag=="+ mainTag);
	              var Startpos = $(this).offset();
	              pos_left = Startpos.left; 
	              pos_top = Startpos.top; 
	              $(this).removeClass('ui-draggable-dragging');
	              draggingEleId = event.target.getAttribute('id');
	              droppedEleClass = event.target.getAttribute('class');
	              wholeTag = $(this)[0].outerHTML;
	              dragImg = $(this).find('img');
	              console.log(dragImg);
	              dragSrc = $(this).find('img').attr('src');
	              $(this).css('z-index','999');
	          	  countC();
	          },
	          stop: function(event, ui) {
	              var Stoppos = $(this).offset();
	              $(this).css('position', "fixed");
	              $(this).css('left', pos_left);
	              $(this).css('top', pos_top); 
	              $(this).css('z-index','0');
	              countC();
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
		             console.log("droppable=>"+ dropSrc);
		             dragImg.removeAttr('src');
		             document.getElementById(draggingEleId).remove(); //drag된 아이템 객체 지우기
		         	countC();
		         	console.log("wholeTag====="+wholeTag);
		            $("#droppableMain").on('click',function(){
		           	  if($(".draggingItem").length==5){
				       	  $(this).find('img').attr('src',mainSrc);
				       	  $(wholeTag).appendTo("#iconMainDiv");
		           	  }
		           	  drag();
		             });
		        	 }
		         }
		  });
	  }
	  function countC(){ 
		  var length = $(".draggingItem").length;
		  console.log("lengthClass====="+length);
	  }
	  function dragDrop(){
		  drag();
		  drop();
	  }
window.onload=dragDrop;