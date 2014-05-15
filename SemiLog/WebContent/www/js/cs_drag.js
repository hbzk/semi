var lastdrager;
var startImg;
var lastdragerImg;
var lastdragerClass;

$(window).load(function(){
	startImg = $('.iconStart').css('background-image');
	
	dragdrop_doing();
	dragdrop_drop();
	dragdrop_startClick();
	
});



// 드래그
function dragdrop_doing() {
	$('.iconMain').draggable({distance: 20}, {revert: true}, {zIndex: 9},
		{start: function(event,ui) {
		
	}});
}

// 드롭
function dragdrop_drop() {
	$('.iconStart').droppable({drop: function(event, ui){
		lastdrager = $(event.toElement).removeAttr('style');
		lastdragerClass = lastdrager.context.className;
		lastdragerImg = $(event.toElement).css('background-image');
		$(this).css('background-image', $(lastdrager).css('background-image'));
		$(event.toElement).css('background-image', 'none');
		
		// 타이머 출력
		doing('result');
		$('#layout').find('#result').addClass(lastdragerClass)
			.removeClass('ui-draggable ui-draggable-dragging');

		
		
		$('.iconStart').droppable({ disabled: true });
		$('.iconStart').draggable({distance: 20}, {revert: "invalid"}, {zIndex: 9},
			{
			start: function(event,ui) {}, stop: function(event, ui) {}
		});
	}});
}

//중앙 클릭시
function dragdrop_startClick() {
	$('.iconStart').click(function(){
		if ($('.iconStart').css('background-image') != startImg) {
			$('.iconStart').css('background-image', startImg);
		}
		
		if ($(lastdrager).css('background-image') != lastdragerImg) {
			$(lastdrager).css('background-image', lastdragerImg);
		}
		
		dragdrop_doing();
		$('.iconStart').droppable({ disabled: false });
		
		//타이머 초기화 후 사라짐
		
		if (typeof $id === 'undefined') {
			console.log('undefined');
		} else {
			reset();
			$('#result').html('').removeClass();
		}
		
	});
}




