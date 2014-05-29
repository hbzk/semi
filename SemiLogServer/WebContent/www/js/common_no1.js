var now = new Date();
var minute = now.getMinutes().toString();
var second = now.getSeconds().toString();
minute = 1;
second = 00;
end=0;

function timeclock(){
  if(second == 00) {
    minute -= 1 ;
    second = 2 ;
  } else{
    second = second-1;
  }
  
  
  if ((minute < 0) && (end==0)) {
    BnV();
    confirmNotification();
    end=1;
  }
  
  
  if (second < 10) {
    document.clock.txtSecs.value = 0 + second.toString();
  } else {
    document.clock.txtSecs.value = second;
  }
  if (minute < 10) {
      document.clock.txtMins.value = 0 + minute.toString();
    } else {
      document.clock.txtMins.value = minute;
    }
  setTimeout("timeclock()", 1000);
}








document.addEventListener("deviceready", onDeviceReady, false);


function onDeviceReady() {
    // Empty
	navigator.notification.vibrate(2000);
}



// Beep three times
//
function playBeep() {
    navigator.notification.beep(3);
}

// Vibrate for 2 seconds
//
function vibrate() {
    navigator.notification.vibrate(2000);
}

function BnV() {
	 navigator.notification.beep(3);
    navigator.notification.vibrate(2000);
}

function confirmNotification() {
    navigator.notification.confirm(
          '지정된 시간이 다되었습니다. 계속? / 끝?'
        , confirmCB
        , 'TV'
        , 'Yes,No'
    );  
}


$(function(){
	

	
	
	
	$("#confirm").click(function(){
		timeclock();
	});

	
	   
    
	
	

	      
});