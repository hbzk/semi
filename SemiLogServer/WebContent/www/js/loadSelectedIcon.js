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
		// tx.executeSql('drop table if exists ACTION'); // DB 초기화
		tx.executeSql('create table if not exists ICONSELECT (NO integer primary key, ICON_NAME text, CLASS_NAME text)');
	});
}