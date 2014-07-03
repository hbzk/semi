var db = window.openDatabase("Database", "1.0", "LogDB", 2 * 1024 * 1024);

$(function(){
	
});


var rows = [20, 30, 40, 49, 49, 49, 50];
var users = [];

for (var i=0; i<rows.length; i++) {
	if (users.indexOf(rows[i]) === -1) users.push(rows[i]);
}
console.log(rows);
console.log(users);

var ran = Math.floor(Math.random() * users.length);
console.log(ran);
console.log(users[ran]);






var db_submitLog = function(){
	db.transaction(function(tx){
		tx.executeSql('SELECT USER_NO FROM USER', [], function(tx, res){
			var user_no = res.rows.item(0).USER_NO;
			
			$.post('http://14.32.7.49:1111/other', {USER_NO : user_no}).done(function(data){
				console.log(data);
			});
		});
	}, db_errorCB);
};

