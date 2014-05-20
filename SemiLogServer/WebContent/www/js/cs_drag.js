var startImg;
var lastdrager;
var lastdragerImg;
var lastdragerClass;

$(window).load(function(){
	startImg = $('.iconStart').css('background-image');
	
	dragdrop_doing();
	dragdrop_drop();

	$('.iconStart').click(function(){ // 시작 버튼 클릭시 초기화
		dragdrop_timerCheck();
	});

});


// 드래그 대상 설정
function dragdrop_doing() {
	$('.iconMain').draggable({distance: 20}, {revert: true}, {revertDuration: 500}, {zIndex: 9});
}

// 드롭
function dragdrop_drop() {
	$('.iconStart').droppable({tolerance: "touch"}, {drop: function(event, ui){
		
		dragdrop_timerCheck(); // 이미 실행중인지 확인 후 초기화
		
		// 드래그 대상 관련 조작
		lastdrager = $(event.toElement).removeAttr('style');
		lastdragerImg = lastdrager.css('background-image');
		lastdrager.css('background-image', 'none');
		lastdragerClass = lastdrager.context.className;
		lastdrager.draggable({revertDuration:0});
		
		// 시작아이콘 드래그 활성
		$('.iconStart').css('background-image', lastdragerImg)
			.draggable({disabled: false},{distance: 20},{revert: "invalid"},{zIndex: 9});
		
		// 타이머 출력
		timer_doing('timer');
		$('#timer').addClass(lastdragerClass)
			.removeClass('ui-draggable ui-draggable-dragging');
		
	}});
}

// 빙글빙글
function dragdrop_flip() {
	lastdrager.addClass('flipping');
	$('.iconMain').draggable({disabled:true}); // 전체 드래그 비활성화
	
	// 일정 시간 후 다시 드래그 활성화
	setTimeout(function(){
		$('.flipping').removeClass('flipping');
		$('.iconMain').draggable({disabled: false});
		$('#timer').draggable({disabled: true});
	}, 1000);
}

// 타이머 구동 확인 + 저장 + 초기화
function dragdrop_timerCheck() {
	if ($('#timer').hasClass('iconMain')) { // 실행 중인지 확인
		$('#result').append(formatTime(x.time()) + ' '); // DB 구현 전까지 타이머 저장 대용
		timer_reset(); // 타이머 초기화
		$('#timer').html('').removeClass(); // 타이머 출력 제거
		
		dragdrop_doing(); // 드래그 항목 갱신 (타이머 드래그 방지)
		
		$('.iconStart').draggable({disabled: true}).droppable({disabled: false}) // 시작아이콘 드래그 방지
			.css('background-image', startImg); // 시작 아이콘 초기화
		lastdrager.css('background-image', lastdragerImg); // 드래그했던 아이콘 초기화
		
		
		dragdrop_flip(); // 빙글빙글
	}
}
