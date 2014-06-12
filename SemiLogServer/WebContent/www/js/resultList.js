var actionName, startTime, endTime, resultWhile;
var db = window.openDatabase("Database", "1.0", "LogDB", 2 * 1024 * 1024);
var dbId; 

db_listText();

$('#deleteAll').click(function(){
	db_deleteAll();
	location.reload(true);
});

 $(document).on("click",".rtDelete",function(e){
	dbId = $(e.target).parent(".rtDelete").siblings(".rtIcon")[0].attributes[0].value;
	console.log(dbId);
	db_delete(dbId);
}); 

function db_deleteAll(){
	db.transaction(function(tx) {
		tx.executeSql("DELETE FROM ACTION");
	}, db_errorCB);
}
function db_listText(){
	db.transaction(function(tx) {
		tx.executeSql("select * from ACTION", [], function(tx, res) {
			var len = res.rows.length;
			console.log("ACTION: " + len + " rows found.");
			
			$('.actionName').remove();
			
			var resultList = $('#resultList');
			for (var i=0; i<len; i++){
				startTime = new Date(res.rows.item(i).START_TIME);
				//console.log(startTime);
				endTime = new Date(res.rows.item(i).END_TIME);
				resultList.append($('<div class="rtTable">')
					.append('<div data-id= "'+res.rows.item(i).id +'" class="rtIcon actionName">'+'<i class= "'+res.rows.item(i).CLASSNAME+'"></i></div>')
					.append('<div class="rtTime">' + db_digitText(startTime.getHours()) + ':' + db_digitText(startTime.getMinutes())
							+ ' ~ '  + db_digitText(endTime.getHours()) + ':' + db_digitText(endTime.getMinutes()))
					.append('<div class="rtDuration">' + res.rows.item(i).WHILE +'sec </div>')
					.append('<div class="rtDelete"><i class="fa fa-times"></i></div>')
				);
			}});
	}, db_errorCB);};

function db_errorCB(e) { // query 에러시 호출
	console.log("e :" + e);
	console.log("e.code : "+e.code);
	console.log("e.message :" + e.message);
}
function db_digitText(i) {
	if (i < 10) {
		i = '0' + i;
	}
	return i;
}
function db_delete(no){
	db.transaction(function(tx){
		tx.executeSql("DELETE FROM ACTION WHERE id = ?",
									[no],
									function(){
										$("#resultList").children(".rtTable").remove();
										db_listText();
									});
	});
}