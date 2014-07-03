/* -----------------------------------
 *  signUpi.html 참고해서
 *  실제로 있을 듯한 패턴의, 다양한 유저 50명 만들기.
 *  -----------------------------------
 * 	EMAIL		: 중복 X
 *  GENDER	: 1~2
 *  AGE			: 나이 (숫자로)
 *  JOB			: 1~5
 *  SALARY		: 1~6
 *  SPEND		: 월 소비 (숫자로)
 *  SCHOLAR	: 1~4
 *  MARRY		: 1~2
 *  -----------------------------------
 */

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
	res.send('ok');
});