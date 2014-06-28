var db = window.openDatabase("Database", "1.0", "LogDB", 2 * 1024 * 1024); 
var emailVal;
var user;


$('#form input:radio').addClass('input_hidden');
$('#form .genderSelect').click(function(){
    $(this).removeClass('unselected').siblings().addClass('unselected');
    $(this).addClass('genderSelected').siblings().removeClass('genderSelected');
});

$('.jobSelect').fancySelect();
	$('.ageSelect').fancySelect();

	function genderSelect(){
		if($("input[name='gender']:checked").length > 0){
			console.log("User's gender is checked");
			return true;
		}else{
			errorGender();
			return false;
		}
	}
	
	function ageSelect(){
		if($(".ageSelect option:selected").val()!= ""){
			console.log($(".ageSelect option:selected").val());
			return true;
		}else{
			errorAge();
			console.log("age is not selected");
			return false;
		}
	}
	
	function jobSelect(){
		if($(".jobSelect option:selected").val()!=""){
			console.log($(".jobSelect option:selected").val());
			return true;
		}else{
			errorJob();
			console.log("job is not selected");
			return false;
		}
	}
	
	function errorGender() {
		$().toastmessage('showToast',{
		    text     : 'Select your gender!',
		    stayTime : 1000,
		    sticky   : false,
		    position : 'middle-center',
		    type     : 'error',
		    close    : function () {console.log("Gender alarm is closed ...");}
		});
	}
	
	function errorAge() {
		$().toastmessage('showToast',{
		    text     : 'Select your age!',
		    stayTime : 1000,
		    sticky   : false,
		    position : 'middle-center',
		    type     : 'error',
		    close    : function () {console.log("Age alarm is closed ...");}
		});
	}
	
	function errorJob() {
		$().toastmessage('showToast',{
		    text     : 'Select your Job!',
		    stayTime : 1000,
		    sticky   : false,
		    position : 'middle-center',
		    type     : 'error',
		    close    : function () {console.log("Job alarm is closed ...");}
		});
	}
	
	function oninputEmail() {
	emailVal = $('#email').val();
	
	if (validateEmail()) {
		$('#emailValidate').text('');
	} else {
		$('#emailValidate').text('이메일 형식으로 입력해주세요');
	}
	
	validateForm();
}

function oninputPwd() {
	validateForm();
}

// 메일 형식 검증
function validateEmail() {
	if (emailVal.length > 4 && emailVal.match("@") &&
		emailVal.indexOf("@") + 1 < emailVal.indexOf(".", emailVal.indexOf("@")) &&
		emailVal.length - 1 > emailVal.indexOf(".", emailVal.indexOf("@"))) {
			return true;
	} else {
		return false;
	}
}


//이메일 가입 여부 확인
function validateForm() {
	$.post("http://14.32.7.49:1111/emailCheck", { email: $('#email').val()})
		.done(function(data) {
			if (data == 'already') {
				$('#emailCheck').text('이미 가입된 이메일입니다.');
				$('#btnStart').attr('disabled', 'disabled');
				
			} else { // 가입된 이메일이 아닐때
				$('#emailCheck').text('');
				
				// 추가 조건 확인 후 버튼 활성화
				if (validateEmail() && $('#password').val().length > 0) {
					
					$('#btnStart').removeAttr('disabled');
				} else {
					$('#btnStart').attr('disabled', 'disabled');
				}
			}
	});
}


//start btn 활성화 된 후에 gender와 age,job 체크여부확인 후 submit
$('#btnStart').click(function(e){
	e.preventDefault();
	if(genderSelect() && ageSelect() && jobSelect()){
		console.log("signUp");
		
		signupSubmit();
	}else{
		console.log("something unchecked!!!!!!!!");
	}
});

function signupSubmit(){
	db.transaction(function(tx){
		tx.executeSql('SELECT * FROM USER', [], function(tx, res){
			var userNo = res.rows.item(0).USER_NO;
			user = {email: $('#email').val(), password: $('#password').val()
					,gender: $(':radio[name="gender"]:checked').val(), age: $('#age').val(), job: $('#job').val()
					,user_no: userNo};
			console.log(user);
			signupPost(user);
		});
	}, db_errorCB);
}

function signupPost(user) {
 	$.post("http://14.32.7.49:1111/signup", user)
		.done(function(data) {
			console.log(data);
			// 'ok' 받으면 signup 성공
			if (data == 'ok') {
				db_updateUser(user);
			} else {
				alert('서버 점검중 입니다.');
			}
	});
}

function db_updateUser(user){
	db.transaction(function(tx){
		console.log(user.email);
		tx.executeSql('UPDATE USER SET EMAIL=?, GENDER=?, AGE=?, JOB=? WHERE ID=1 ',
				[user.email, user.gender, user.age, user.job], function(tx, res){
			window.location.href = "main.html";
		});
	},db_errorCB);
}

function db_errorCB(e) { // query 에러시 호출 함수
	console.log(e);
	console.log("e.message :" + e.message);
}


