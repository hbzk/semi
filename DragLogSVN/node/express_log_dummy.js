


dbconn.query('INSERT INTO LOG (USER_NO, ACTION, START_TIME, END_TIME, DURATION) ' 
	+ ' VALUES (1, "beer", "2014-03-19T07:00:00.332Z", NOW(), 23456) ' 
	
	
	+ ', (2, "child", "2014-03-30T07:00:00.332Z", NOW(), 5432)' 
	+ ', (1, "child", "2014-03-30T07:00:00.332Z", NOW(), 2211)' 
	+ ', (1, "child", "2014-03-30T07:00:00.332Z", NOW(), 432)' 
	
	
	
	
	
	
	, function(err, rows){
		if (err) {
			console.log(err);
	        throw err;
		}
		console.log(rows.insertId);
		res.send(rows.insertId.toString());
});