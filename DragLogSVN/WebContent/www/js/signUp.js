var db = window.openDatabase("Database", "1.0", "LogDB", 2 * 1024 * 1024); 
var emailVal;
var user;

var questionList = [];
var statusChecker = 1;

$(function(){
	$(".lastQ").click(function(){
		validateForm();
	});
});

//다음 질문과 input보여주기(next button control)
questionList = $(".questions").children();
var indexList = 0;
$(".btnNext").click(function(){
	
	if(indexList<6){
	$(questionList[indexList]).removeClass("current");
	indexList++;
	statusChecker++;
	$(questionList[indexList]).addClass("current");
	$(".btnNext").removeClass("show");
	}else if(indexList = 6){
		statusChecker++;
		$(".btnNext").removeClass("show");
	}
});

//age input창에 값이 입력된 후에만 nextButton활성화하기
$(".questions li input").keyup(function(e){
	var inputValue = $(".questions li input").val();
	
	console.log(inputValue);
	if($(".questions li input").val().length>3){
		e.preventDefault();
		e.stopPropagation();
	}
	var num_check=/^[0-9]*$/;
	if(inputValue == 0){console.log("0은입력할수없습니다.");}
	if(indexList<6 && num_check.test(inputValue) && inputValue != 0 ){
		if($(".questions li input").val() != null){
			$(".btnNext").addClass("show");
		}else{
			$(".btnNext").removeClass("show");
		}
	}else{
		$(".btnNext").removeClass("show");
	}
});

//radio버튼 숨기기
$('.questions li > ul li input:radio').addClass('input_hidden');

//선택된 상태 체크
$('.questions li > ul li label').click(function(e){
	if(indexList<6){
		selectCheck(e.target);
		if($(this).siblings("input").val())
		if(radioCheck()){
			$(".btnNext").addClass("show");
		}else{
			$(".btnNext").removeClass("show");
		}
	}else{ //마지막 항목
		selectCheck(e.target);
		$(".btnNext").removeClass("show");
	}
});

function selectCheck(target){
		$(target).siblings("input").addClass("rChecked");
		$(target).siblings(".check").addClass("checked");
		$(target).parent("li").siblings("li").children(".check").removeClass("checked");
		$(target).parent("li").siblings("li").children("input").removeClass("rChecked");
}


function radioCheck(){
	if($(".current ul li input.rChecked").length >0){
		return true;
	}else{
		return false;
	}
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
	
	$.post("http://14.32.66.98:1111/emailCheck", { email: $('#email').val()})
		.done(function(data) {
			if (data == 'already') {
				$('#emailCheck').text('이미 가입된 이메일입니다.');
				$('#btnStart').attr('disabled', 'disabled');
				
			} else { // 가입된 이메일이 아닐때
				$('#emailCheck').text('');
				console.log(statusChecker);
				// 추가 조건 확인 후 버튼 활성화
				if (validateEmail() && $('#password').val().length > 0 && statusChecker ==7 ) {
					
					$('#btnStart').removeAttr('disabled');
				} else {
					$('#btnStart').attr('disabled', 'disabled');
				}
			}
	});
}

$('#btnStart').click(function(e){
	e.preventDefault();
		signupSubmit();
});



function signupSubmit(){
	db.transaction(function(tx){
		tx.executeSql('SELECT * FROM USER', [], function(tx, res){
			var userNo = res.rows.item(0).USER_NO;
			user = {email: $('#email').val(), 
					password: SHA1($('#password').val()),
					age: $('input[name="age"]').val(), 
					gender: $(':radio[name="gender"].rChecked').val(), 
					job: $(':radio[name="job"].rChecked').val(),
					salary: $(':radio[name="salary"].rChecked').val(),
					spend: $('input[name="spend"]').val(),
					scholar: $(':radio[name="scholar"].rChecked').val(),
					marry: $(':radio[name="marry"]').val(),
					user_no: userNo };
			console.log(user);
			signupPost(user);
		});
	}, db_errorCB);
}

function signupPost(user) {
 	$.post("http://14.32.66.98:1111/signup", user)
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
		tx.executeSql('UPDATE USER SET EMAIL=?, AGE=?, GENDER=?, JOB=?,SALARY=?, SPEND=?, SCHOLAR=?, MARRY=? WHERE ID=1 ',
				[user.email, user.age, user.gender, user.job, user.salary, user.spend, user.scholar, user.marry], function(tx, res){
			window.location.href = "main.html";
		});
	},db_errorCB);
}

function db_errorCB(e) { // query 에러시 호출 함수
	console.log(e);
	console.log("e.message :" + e.message);
}


