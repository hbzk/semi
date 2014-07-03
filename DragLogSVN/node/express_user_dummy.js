/* EMAIL은 겹치지 않게
 *  
 */



ㄴㅇ
dbconn.query('INSERT INTO USER (EMAIL, GENDER, AGE, JOB, SALARY, SPEND, SCHOLAR, MARRY) '
		+ ' VALUES ("a", 2, 30, 5, 6, 30, 4, 1) '
		
		+ ', ("b", 2, 30, 5, 6, 30, 4, 1) '
		+ ', ("c", 2, 30, 5, 6, 30, 4, 1) '
		+ ', ("d", 2, 30, 5, 6, 30, 4, 1) '
		
		
		, function(err, rows){
	if (err) {
		console.log(err);
        throw err;
	}
	console.log('--- USER last insert ID :' + rows.insertId);
	res.send(rows.insertId.toString());
});