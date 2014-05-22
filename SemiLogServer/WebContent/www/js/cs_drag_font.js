var startIcon;
var lastIcon;
var lastDragger;
var lastDraggerClass;

$(window).load(function(){
	startIcon = $('#start').html();
	
	dragdrop_doing();
	dragdrop_drop();
	
	$('#middle').mouseup(function(){ // 미들 클릭시 초기화
		dragdrop_timerCheck();
	});
	
});


// 드래그 대상 설정
function dragdrop_doing() {
	$('.drag').draggable({distance: 20}, {revert: true}, {revertDuration: 500}, {zIndex: 9});
}

// 드롭
function dragdrop_drop() {
	$('#start').droppable({tolerance: 'touch'}, {accept: '.drag'}, {drop: function(event, ui){
		
		dragdrop_timerCheck(); // 이미 실행중인지 확인 후 초기화
		
		
		// 드래그 대상 관련
		// 가끔 드래그 대상이 div로 인식되는 버그 대응 
		if (event.toElement.tagName == "I") {
			lastIcon = $(event.toElement);
			lastDragger = lastIcon.parent('div');
		} else {
			console.log('event.toElement == div');
			lastDragger = $(event.toElement);
			lastIcon = lastDragger.children('i');
		}

		//lastDragger.draggable({revertDuration:0});
		lastDragger.attr('style', '');
		lastDraggerClass = lastDragger[0].className;
		
		// 아이콘 중앙 배치
		$('#middle').html(lastIcon).draggable({zIndex: 9});
		
		// 시작 아이콘 관련
		$('#start').children().remove();
		
		// 타이머 출력
		timer_doing('timer');
		$('#timer').addClass(lastDraggerClass)
			.removeClass('drag ui-draggable ui-draggable-dragging');
	}});
}

// 타이머 구동 확인 + 저장 + 초기화
function dragdrop_timerCheck() {
	if ($('#timer').hasClass('iconMain')) { // 실행 중인지 확인
		$('#result').append(formatTime(x.time()) + ' '); // DB 구현 전까지 타이머 저장 대용
		timer_reset(); // 타이머 초기화
		$('#timer').html('').removeClass(); // 타이머 출력 제거
		
		// 시작 아이콘 복구
		$('#start').html(startIcon); 
		$('#middle').attr('style','').removeClass();
		
		lastDragger.html(lastIcon);
		lastDragger.attr('style','');

		dragdrop_flip(); // 빙글빙글
	}
}

//빙글빙글
function dragdrop_flip() {
	lastDragger.addClass('flipping');
	$('.drag').draggable({disabled:true}); // 전체 드래그 비활성화
	
	// 일정 시간 후 다시 드래그 활성화
	setTimeout(function(){
		$('.flipping').removeClass('flipping');
		$('.drag').draggable({disabled: false});
		
		// 안드로이드에서 3,5번 flip 궤도 이상 - 보정 
		lastDragger.attr('style','');
		
	}, 1000);
}