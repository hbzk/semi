

    // pop up 메뉴
    
	function layer_open(el){
        var temp = $('#' + el);     //레이어의 id를 temp변수에 저장
        var bg = temp.prev().hasClass('bg');    //dimmed 레이어를 감지하기 위한 boolean 변수
        
        $('a.allCbtn').click(function(e){
            if(bg){
                $('.layer').fadeOut();
            }else{
                temp.fadeOut();     //'닫기'버튼을 클릭하면 레이어가 사라진다.
            }
            e.preventDefault();
        });        
        
        if(bg){
            $('.layer').fadeIn();
        }else{
            temp.fadeIn();  //bg 클래스가 없으면 일반레이어로 실행한다.
        }
        // 화면의 중앙에 레이어를 띄운다.
        if (temp.outerHeight() < $(document).height() ) temp.css('margin-top', '-'+temp.outerHeight('px'));
        else temp.css('top', '0px');
        if (temp.outerWidth() < $(document).width() ) temp.css('margin-left', '-'+temp.outerWidth('px'));
        else temp.css('left', '0px');
       
        $('.layer .bg').click(function(e){
            $('.layer').fadeOut();
            e.preventDefault();
        });
    };
    
    

    // on/off 설정버튼
    
	$(document).ready(function () {
       $("#tbtn").jqxSwitchButton({ theme: 'classic', width: '100', height: '30', checked: false });
        });

	
	
    // [<] 버튼 표시/비표시

    function allCbtn(id) {
       var e = document.getElementById(id);
       if(e.style.display == 'block')
          e.style.display = 'none';
       else
          e.style.display = 'block';
    };

