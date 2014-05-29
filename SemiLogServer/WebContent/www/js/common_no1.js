var now = new Date();
var minute = now.getMinutes().toString();
var second = now.getSeconds().toString();
minute = 60;
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




$(function(){
	

	
	
	
	$("#confirm").click(function(){
		
		
		
		if($("#timeA").val() != null) {
			minute	 = $("#timeA").val();
		} else {
			minute = 60;
		}
		
		
		timeclock();
	});

	
	   
    
	
	

	      
});