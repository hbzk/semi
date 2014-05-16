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
		// 드래그 시작시 동작 함수
		{start: function(event,ui) {}});
}

// 드롭
function dragdrop_drop() {
	$('.iconStart').droppable({drop: function(event, ui){
		lastdrager = $(event.toElement).removeAttr('style');
		lastdragerClass = lastdrager.context.className;
		lastdragerImg = $(event.toElement).css('background-image');
		$(this).css('background-image', $(lastdrager).css('background-image'));
		$(event.toElement).css('background-image', 'none');
	
		// 중앙아이콘 - 드롭 비활성. 드래그 활성 
		$('.iconStart').droppable({ disabled: true })
			.draggable({ disabled: false },{distance: 20},{revert: "invalid"}, {zIndex: 9},
			{start: function(event,ui) {}, stop: function(event, ui) {}});
		// 드래그 항목 갱신
		dragdrop_doing();
		
		// 타이머 출력
		timer_doing('result');
		$('#layout').find('#result').addClass(lastdragerClass)
			.removeClass('ui-draggable ui-draggable-dragging');
		

		
	}});
}

// 중앙 클릭시
function dragdrop_startClick() {
	$('.iconStart').click(function(){
		// 이미지가 있는지 확인 후, 없을때만 채우기 (깜빡임 방지)
		if ($('.iconStart').css('background-image') != startImg) {
			$('.iconStart').css('background-image', startImg);
		}
		
		if ($(lastdrager).css('background-image') != lastdragerImg) {
			$(lastdrager).css('background-image', lastdragerImg);
		}
		
		// 타이머 초기화 후 사라짐
		if (typeof $id === 'undefined') {
			console.log('undefined');
		} else {
			timer_reset();
			$('#result').html('').removeClass();
		}
		
		// 중앙아이콘 - 드래그 비활성, 드롭 활성 
		dragdrop_doing();
		$('.iconStart').draggable({ disabled: true }).droppable({ disabled: false });
		
		
	});
}




