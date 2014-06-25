var db = window.openDatabase("Database", "1.0", "LogDB", 2 * 1024 * 1024);

//db_allDrop();
//db_init();
function db_init() {
	db.transaction(function(tx) {
		console.log("init");
		//tx.executeSql('DROP TABLE IF EXISTS USER');
		tx.executeSql('CREATE TABLE IF NOT EXISTS USER (ID INTEGER PRIMARY KEY, USER_NO UNIQUE, EMAIL, GEN, AGE, JOB)');
		tx.executeSql('CREATE TABLE IF NOT EXISTS ACTION (ID integer primary key, TITLE text, CLASSNAME text, START_TIME date, END_TIME date, WHILE integer)');
		tx.executeSql('CREATE TABLE IF NOT EXISTS ICONLIST (POSITION TEXT, ICON_NAME TEXT PRIMARY KEY, CLASS_NAME TEXT, TIMER_VAL INTEGER)');
		tx.executeSql('INSERT OR IGNORE INTO ICONLIST '  
			+ ' SELECT 0 AS POSITION, "headphones" AS ICON_NAME, "fa fa-headphones" AS CLASS_NAME, 80 AS TIMER_VAL'
			+ ' UNION SELECT 1,"music", "fa fa-music", 60'
			+ ' UNION SELECT 2,"automobile", "fa fa-automobile", 60'
			+ ' UNION SELECT 3,"phone", "fa fa-phone", 80'
			+ ' UNION SELECT 4,"banknote", "li li_banknote", 60'
			+ ' UNION SELECT 5,"comment", "fa fa-comment", 60'
			+ ' UNION SELECT 6,"dribbble", "fa fa-dribbble", 60'
			+ ' UNION SELECT 0,"plane", "fa fa-plane", 60'
			+ ' UNION SELECT 0,"gamepad", "fa fa-gamepad", 60'
			+ ' UNION SELECT 0,"puzzle", "fa fa-puzzle-piece", 60'
			+ ' UNION SELECT 0,"beer", "fa fa-beer", 60'
			+ ' UNION SELECT 0,"glass", "fa fa-glass", 60'
			+ ' UNION SELECT 0,"video", "li li_video", 60'
			+ ' UNION SELECT 0,"hospital", "fa fa-hospital-o", 60'
			+ ' UNION SELECT 0,"cutlery", "fa fa-cutlery", 60'
			+ ' UNION SELECT 0,"desktop", "fa fa-desktop", 60'
			+ ' UNION SELECT 0,"moon", "fa fa-moon-o", 60'
			+ ' UNION SELECT 0,"mobile", "fa fa-mobile", 90'
			+ ' UNION SELECT 0,"coffee", "fa fa-coffee", 60'
			+ ' UNION SELECT 0,"tv", "li li_tv", 65'
			+ ' UNION SELECT 0,"shirt", "li li_t-shirt", 60'
			+ ' UNION SELECT 0,"home", "fa fa-home", 60'
			+ ' UNION SELECT 0,"trash", "li li_trash", 60'
			+ ' UNION SELECT 0,"scissors", "fa fa-scissors", 60'
			+ ' UNION SELECT 0,"flask", "fa fa-flask", 11'
			+ ' UNION SELECT 0,"leaf", "fa fa-leaf", 60'
			+ ' UNION SELECT 0,"pen", "li li_pen", 60'
			+ ' UNION SELECT 0,"bulb", "li li_bulb", 60'
			+ ' UNION SELECT 0,"book", "fa fa-book", 60'
			+ ' UNION SELECT 0,"bookmark", "fa fa-bookmark", 60'
			+ ' UNION SELECT 0,"child", "fa fa-child", 60'
			+ ' UNION SELECT 0,"stethoscope", "fa fa-stethoscope", 60'
			+ ' UNION SELECT 0,"spoon", "fa fa-spoon", 60'
			+ ' UNION SELECT 0,"code", "fa fa-code", 22'
			+ ' UNION SELECT 0,"keyboard", "fa fa-keyboard-o", 60');
			//db_redirect();
	}, db_errorCB);
}

function db_allDrop(){
	console.log("alldrop");
	db.transaction(function(tx) {
		tx.executeSql('drop table if exists ACTION'); // DB 삭제 - 테스트 용
		tx.executeSql('drop table if exists ICONLIST');
		tx.executeSql('drop table if exists USER');
		tx.executeSql('drop table if exists ICONSTIME');
		tx.executeSql('drop table if exists ICONSELECT');
		tx.executeSql('drop table if exists ICONTIME');
	}); 
}

function db_redirect(){
	db.transaction(function(tx) {
		tx.executeSql('SELECT USER_NO FROM USER WHERE ID = 1', [], function(tx, res){
			console.log(res.rows);
			if(res.rows.length == 0 ){
				//local DB USER_NO field null이면 한번도 실행하지 않았으므로 welcome페이지
				window.location.href = "welcome.html";
			} else{
				//local DB USER_NO field null아니면 실행했었으므로 바로 main페이지
				window.location.href = "main.html";
			}
			
		});
	}, db_errorCB);
}

function db_errorCB(e) { // query 에러시 호출 함수
	console.log(e);
	console.log("e.message :" + e.message);
}