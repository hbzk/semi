var lastdrager;

$(window).load(function(){
	
	dragdrop_doing();
	dragdrop_drop();
	dragdrop_startClick();
	
});



// 드래그
function dragdrop_doing() {
	$('.iconMain').draggable({distance: 20}, {revert: "invalid"}, {zIndex: 9},
		{start: function(event,ui) {
			lastdrager = this;
			lastdragerClass = $(lastdrager).attr('class');
		}
	});

}

// 드롭
function dragdrop_drop() {
	$('.iconStart').droppable({drop: function(event, ui){
		//lastdragerClass = $(event.toElement).removeAttr('style');
		//$(this).css('background-image', 'none');
		
		
		$(event.toElement).removeAttr('style').removeClass('center left right top bottom')
		.addClass('middle');
		
		$('.iconStart').droppable({ disabled: true });
		
	}});
}

//중앙 클릭시
function dragdrop_startClick() {
	$('#iconMainDiv').on('click', $('.middle'), function(event){
		$('.middle').removeClass('middle').addClass(lastdragerClass);
		
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



