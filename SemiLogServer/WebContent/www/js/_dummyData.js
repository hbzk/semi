var db = window.openDatabase("Database", "1.0", "LogDB", 2 * 1024 * 1024);

$(document).ready(function(){
	dummy();
});

function dummy() {
	db.transaction(function(tx) {
		
		// 여기부터 
		tx.executeSql("INSERT INTO ACTION (TITLE, CLASSNAME, START_TIME, END_TIME, WHILE) "
			+ " VALUES ('home', 'fa fa-home', '2014-05-05T08:23:06.559Z', '2014-05-05T08:23:06.559Z', 30)");
		// 여기까지
		
		
		// 이런식
		/*tx.executeSql("INSERT INTO ACTION (TITLE, CLASSNAME, START_TIME, END_TIME, WHILE) "
				+ " VALUES ('home', 'fa fa-home', '2014-05-05T08:23:06.559Z', '2014-05-05T08:23:06.559Z', 30)");
		tx.executeSql("INSERT INTO ACTION (TITLE, CLASSNAME, START_TIME, END_TIME, WHILE) "
				+ " VALUES ('home', 'fa fa-home', '2014-05-05T08:23:06.559Z', '2014-05-05T08:23:06.559Z', 30)");
		tx.executeSql("INSERT INTO ACTION (TITLE, CLASSNAME, START_TIME, END_TIME, WHILE) "
				+ " VALUES ('home', 'fa fa-home', '2014-05-05T08:23:06.559Z', '2014-05-05T08:23:06.559Z', 30)");
		tx.executeSql("INSERT INTO ACTION (TITLE, CLASSNAME, START_TIME, END_TIME, WHILE) "
				+ " VALUES ('home', 'fa fa-home', '2014-05-05T08:23:06.559Z', '2014-05-05T08:23:06.559Z', 30)");*/
		
		
	});
}
