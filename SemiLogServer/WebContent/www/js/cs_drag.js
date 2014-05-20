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
	$('.iconStart').droppable({tolerance: "touch"}, {drop: function(event, ui){
		
		// 만약 타이머가 동작중이면
		if ($('#result').hasClass('iconMain')) {
			// 타이머 저장 후 초기화
			$('#check').append(formatTime(x.time()) + ' ');
			$('#result').html('').removeClass();
			timer_reset();
			// 이전 드래거를 원위치 
			$(lastdrager).css('background-image', lastdragerImg);
		} 
		
		lastdrager = $(event.toElement).removeAttr('style');
		lastdragerImg = lastdrager.css('background-image');
		lastdragerClass = lastdrager.context.className;
		$(this).css('background-image', $(lastdrager).css('background-image'));
		lastdrager.css('background-image', 'none');
		
		
		// 중앙아이콘 - 드래그 활성
		$('.iconStart').draggable({ disabled: false },{distance: 20},{revert: "invalid"}, {zIndex: 9},
			{start: function(event,ui) {}, stop: function(event, ui) {}});
		// 드래그 항목 갱신
		dragdrop_doing();
		
		// 타이머 출력
		timer_doing('result');
		$('#result').addClass(lastdragerClass)
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
		
		// 타이머 저장 및 초기화 후 사라짐
		if ($('#result').hasClass('iconMain')) {
			$('#check').append(formatTime(x.time()) + ' ');
			timer_reset();
			$('#result').html('').removeClass();
		}
		
		// 중앙아이콘 - 드래그 비활성, 드롭 활성 
		dragdrop_doing();
		$('.iconStart').draggable({ disabled: true }).droppable({ disabled: false });
		
	});
}




