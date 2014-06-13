//DB 준비
var db = window.openDatabase("Database", "1.0", "LogDB", 2 * 1024 * 1024);

$(window).load(function(){
	loadMainIcon();
});

function loadMainIcon(){
	var iconDiv = $("#iconMainDiv .drag");
	console.log("Load DB - data (selectedIcon)");
	db.transaction(function(tx){
		tx.executeSql('SELECT * FROM ICONLIST', [], function(tx, rs){
			for( var i=0 ; i < rs.rows.length ; i++){
				var row = rs.rows.item(i);
				
				if (row.POSITION > 0) {
					$($(iconDiv)[row.POSITION - 1]).append("<i data-name = '"+ row.ICON_NAME +"' class = '"+ row.CLASS_NAME +"'></i>");
				}
			}
		});
	});
}