var db = window.openDatabase("Database", "1.0", "LogDB", 2 * 1024 * 1024);

$(document).ready(function(){
	dummy();
});

function dummy() {
	db.transaction(function(tx) {
		//tx.executeSql('DROP TABLE IF EXISTS ACTION ');
		tx.executeSql('create table if not exists ACTION (id integer primary key, TITLE text, CLASSNAME text, START_TIME date, END_TIME date, WHILE integer)');
		
		// 여기부터 
		tx.executeSql("INSERT INTO ACTION (TITLE, CLASSNAME, START_TIME, WHILE) "
			+ " VALUES ('home', 'fa fa-home', '2014-04-13T07:31:06.559Z', 2)");
		// 여기까지
		tx.executeSql("INSERT INTO ACTION (TITLE, CLASSNAME, START_TIME, WHILE) "
			+ " VALUES ('phone', 'fa fa-phone', '2014-04-13T08:23:06.459Z', 1)");
		tx.executeSql("INSERT INTO ACTION (TITLE, CLASSNAME, START_TIME, WHILE) "
			+ " VALUES ('gamepad', 'fa fa-gamepad', '2014-04-13T11:43:02.152Z', 4)");
		tx.executeSql("INSERT INTO ACTION (TITLE, CLASSNAME, START_TIME, WHILE) "
			+ " VALUES ('cutlery', 'fa fa-cutlery', '2014-04-13T16:23:06.359Z', 2)");
		tx.executeSql("INSERT INTO ACTION (TITLE, CLASSNAME, START_TIME, WHILE) "
			+ " VALUES ('home', 'fa fa-home', '2014-04-13T20:56:16.339Z', 5)");
		
		
		tx.executeSql("INSERT INTO ACTION (TITLE, CLASSNAME, START_TIME, WHILE) "
			+ " VALUES ('home', 'fa fa-home', '2014-04-18T04:31:06.559Z', 1)");
		tx.executeSql("INSERT INTO ACTION (TITLE, CLASSNAME, START_TIME, WHILE) "
			+ " VALUES ('plane', 'fa fa-plane', '2014-04-18T05:23:06.459Z', 3)");
		tx.executeSql("INSERT INTO ACTION (TITLE, CLASSNAME, START_TIME, WHILE) "
			+ " VALUES ('trash', 'li li_trash', '2014-04-18T10:43:02.152Z', 4)");
		tx.executeSql("INSERT INTO ACTION (TITLE, CLASSNAME, START_TIME, WHILE) "
			+ " VALUES ('scissors', 'fa fa-scissors', '2014-04-18T15:23:06.359Z', 1)");
		tx.executeSql("INSERT INTO ACTION (TITLE, CLASSNAME, START_TIME, WHILE) "
			+ " VALUES ('pen', 'li li_pen', '2014-04-18T22:56:16.339Z', 3)");
		
		
		tx.executeSql("INSERT INTO ACTION (TITLE, CLASSNAME, START_TIME, WHILE) "
				+ " VALUES ('home', 'fa fa-home', '2014-04-24T05:51:06.229Z', 2)");
		tx.executeSql("INSERT INTO ACTION (TITLE, CLASSNAME, START_TIME, WHILE) "
			+ " VALUES ('comment', 'fa fa-comment', '2014-04-24T07:13:46.439Z', 3)");
		tx.executeSql("INSERT INTO ACTION (TITLE, CLASSNAME, START_TIME, WHILE) "
			+ " VALUES ('hospital', 'fa fa-hospital-o', '2014-04-24T11:13:42.142Z', 1)");
		tx.executeSql("INSERT INTO ACTION (TITLE, CLASSNAME, START_TIME, WHILE) "
			+ " VALUES ('mobile', 'fa fa-mobile', '2014-04-24T14:12:36.320Z', 2)");
		tx.executeSql("INSERT INTO ACTION (TITLE, CLASSNAME, START_TIME, WHILE) "
			+ " VALUES ('home', 'fa fa-home', '2014-04-24T23:02:31.319Z', 5)");
		
		
		tx.executeSql("INSERT INTO ACTION (TITLE, CLASSNAME, START_TIME, WHILE) "
				+ " VALUES ('home', 'fa fa-home', '2014-04-30T05:51:06.229Z', 2)");
		tx.executeSql("INSERT INTO ACTION (TITLE, CLASSNAME, START_TIME, WHILE) "
			+ " VALUES ('coffee', 'fa fa-coffee', '2014-04-30T06:13:16.429Z', 5)");
		tx.executeSql("INSERT INTO ACTION (TITLE, CLASSNAME, START_TIME, WHILE) "
			+ " VALUES ('child', 'fa fa-child', '2014-04-30T12:32:12.242Z', 3)");
		tx.executeSql("INSERT INTO ACTION (TITLE, CLASSNAME, START_TIME, WHILE) "
			+ " VALUES ('stethoscope', 'fa fa-stethoscope', '2014-04-30T17:52:26.120Z', 2)");
		tx.executeSql("INSERT INTO ACTION (TITLE, CLASSNAME, START_TIME, WHILE) "
			+ " VALUES ('code', 'fa fa-code', '2014-04-30T23:52:21.219Z', 7)");
		
		
		tx.executeSql("INSERT INTO ACTION (TITLE, CLASSNAME, START_TIME, WHILE) "
				+ " VALUES ('leaf', 'fa fa-leaf', '2014-05-03T03:21:36.215Z', 3)");
		tx.executeSql("INSERT INTO ACTION (TITLE, CLASSNAME, START_TIME, WHILE) "
			+ " VALUES ('book', 'fa fa-book', '2014-05-03T05:22:56.322Z', 2)");
		tx.executeSql("INSERT INTO ACTION (TITLE, CLASSNAME, START_TIME, WHILE) "
			+ " VALUES ('flask', 'fa fa-flask', '2014-05-03T11:22:44.212Z', 5)");
		tx.executeSql("INSERT INTO ACTION (TITLE, CLASSNAME, START_TIME, WHILE) "
			+ " VALUES ('spoon', 'fa fa-spoon', '2014-05-03T13:23:15.426Z', 4)");
		tx.executeSql("INSERT INTO ACTION (TITLE, CLASSNAME, START_TIME, WHILE) "
				+ " VALUES ('code', 'fa fa-code', '2014-05-03T18:23:51.119Z', 8)");
		tx.executeSql("INSERT INTO ACTION (TITLE, CLASSNAME, START_TIME, WHILE) "
				+ " VALUES ('shirt', 'li li_t-shirt', '2014-05-03T19:53:51.315Z', 3)");
		tx.executeSql("INSERT INTO ACTION (TITLE, CLASSNAME, START_TIME, WHILE) "
				+ " VALUES ('home', 'fa fa-home', '2014-05-03T22:22:31.449Z', 1)");
		
		
		tx.executeSql("INSERT INTO ACTION (TITLE, CLASSNAME, START_TIME, WHILE) "
				+ " VALUES ('beer', 'fa fa-beer', '2014-05-07T02:33:46.115Z', 2)");
		tx.executeSql("INSERT INTO ACTION (TITLE, CLASSNAME, START_TIME, WHILE) "
			+ " VALUES ('home', 'fa fa-home', '2014-05-07T09:32:26.302Z', 6)");
		tx.executeSql("INSERT INTO ACTION (TITLE, CLASSNAME, START_TIME, WHILE) "
			+ " VALUES ('hospital', 'fa fa-hospital-o', '2014-05-07T13:44:44.444Z', 4)");
		tx.executeSql("INSERT INTO ACTION (TITLE, CLASSNAME, START_TIME, WHILE) "
			+ " VALUES ('keyboard', 'fa fa-keyboard-o', '2014-05-07T18:31:25.426Z', 5)");
		tx.executeSql("INSERT INTO ACTION (TITLE, CLASSNAME, START_TIME, WHILE) "
				+ " VALUES ('code', 'fa fa-code', '2014-05-07T22:43:11.319Z', 4)");
		
		
		tx.executeSql("INSERT INTO ACTION (TITLE, CLASSNAME, START_TIME, WHILE) "
				+ " VALUES ('puzzle', 'fa fa-puzzle-piece', '2014-05-12T07:21:06.215Z', 2)");
		tx.executeSql("INSERT INTO ACTION (TITLE, CLASSNAME, START_TIME, WHILE) "
			+ " VALUES ('video', 'li li_video', '2014-05-12T09:59:56.442Z', 8)");
		tx.executeSql("INSERT INTO ACTION (TITLE, CLASSNAME, START_TIME, WHILE) "
			+ " VALUES ('bulb', 'li li_bulb', '2014-05-12T17:42:24.304Z', 4)");
		tx.executeSql("INSERT INTO ACTION (TITLE, CLASSNAME, START_TIME, WHILE) "
			+ " VALUES ('book', 'fa fa-book', '2014-05-12T21:21:15.521Z', 2)");
		/*// 이런식
		// *tx.executeSql("INSERT INTO ACTION (TITLE, CLASSNAME, START_TIME, END_TIME, WHILE) "
				// + " VALUES ('home', 'fa fa-home', '2014-05-05T08:23:06.559Z', 11)");
		tx.executeSql("INSERT INTO ACTION (TITLE, CLASSNAME, START_TIME, END_TIME, WHILE) "
				+ " VALUES ('home', 'fa fa-home', '2014-05-05T08:23:06.559Z', 11)");*/
		
	});
}
