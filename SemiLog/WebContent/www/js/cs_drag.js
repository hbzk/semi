var lastdrager;
var startImg;

$(window).load(function(){
	startImg = $('.iconStart').css('background-image');
	
	dragdrop_doing();
	dragdrop_drop();
	dragdrop_startClick();
	
});



// 드래그
function dragdrop_doing() {
	$('.iconMain').draggable({distance: 20}, {revert: "invalid"}, {zIndex: 9},
		{start: function(event,ui) {
		
	}});
}

// 드롭
function dragdrop_drop() {
	$('.iconStart').droppable({drop: function(event, ui){
		lastdrager = $(event.toElement).removeAttr('style');
		$(this).css('background-image', $(lastdrager).css('background-image'));
		$(lastdrager).remove();
		
		$('.iconStart').droppable({ disabled: true });
	}});
}

//중앙 클릭시
function dragdrop_startClick() {
	$('.iconStart').click(function(){
		if ($('.iconStart').css('background-image') != startImg) {
			$('.iconStart').css('background-image', startImg);
		}
		$('#iconMainDiv').append(lastdrager);
		
		dragdrop_doing();
		$('.iconStart').droppable({ disabled: false });
	});
}

function dragdrop_iconCount() {
	var ic = $('.iconMain').length;
	console.log(ic);
	if (ic < 6) {
		console.log('작다');
	} else {
		console.log('크다');
	}
}


