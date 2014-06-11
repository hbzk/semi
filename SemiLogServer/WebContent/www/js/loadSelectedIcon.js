//DB 준비
var db = window.openDatabase("Database", "1.0", "LogDB", 2 * 1024 * 1024);

$(window).load(function(){
	db_icon_init();
	loadSelectedIcon();
});

function loadSelectedIcon(){
	var iconDiv = $("#iconMainDiv .drag");
	console.log("Load DB - data (selectedIcon)");
	db.transaction(function(tx){
		tx.executeSql('SELECT * FROM ICONSELECT',
				[],
				function(tx, rs){
					for( var i=0 ; i < rs.rows.length ; i++){
						var row = rs.rows.item(i);
						console.log("className = " + row.ICON_NAME +"///" + " className = " + row.CLASS_NAME);
						
						$($(iconDiv)[i]).append("<i data-name = '"+ row.ICON_NAME +"' class = '"+ row.CLASS_NAME +"'></i>");
					}
				});
	});
}

function db_icon_init() {
	db.transaction(function(tx) {
		tx.executeSql('drop table if exists ICONSELECT'); // DB 초기화
		tx.executeSql('create table if not exists ICONSELECT (NO integer primary key, ICON_NAME text, CLASS_NAME text)');
		tx.executeSql(' IF (SELECT COUNT(*) FROM ICONSELECT) = 0 ' +
				'BEGIN' +
		'INSERT INTO ICONSELECT (NO, ICON_NAME, CLASS_NAME) VALUES ("0","flask","fa fa-flask")' +
		/*'INSERT into ICONSELECT (NO, ICON_NAME, CLASS_NAME) VALUES ("1","keyboard","fa fa-keyboard-o");' +
		'INSERT into ICONSELECT (NO, ICON_NAME, CLASS_NAME) VALUES ("2","code","fa fa-code");' +
		'INSERT into ICONSELECT (NO, ICON_NAME, CLASS_NAME) VALUES ("3","desktop","fa fa-desktop");' +
		'INSERT into ICONSELECT (NO, ICON_NAME, CLASS_NAME) VALUES ("4","home","fa fa-home");' +
		'INSERT into ICONSELECT (NO, ICON_NAME, CLASS_NAME) VALUES ("5","stethoscope","fa fa-stethoscope");' +*/
		'END');
		
	});
}