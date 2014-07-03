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
		
		
		
		+ ', ("kokore@gd.com", 2, 45, 1, 6, 250, 3, 2) '
		+ ', ("uverworld@yahoo.com", 1, 23, 2, 6, 400, 2, 2) '
		+ ', ("SuranIbrahim@cb.com", 1, 85, 5, 6, 500, 2, 2) '
		+ ', ("option@naver.com", 1, 30, 5, 2, 30, 4, 1) '
		+ ', ("kim04@gmail.com", 2, 29, 3, 2, 150, 4, 1) '
		+ ', ("ultra7@paran.com", 1, 27, 5, 1, 270, 1, 1) '
		+ ', ("r2d2@ezweb.ne.jp", 2, 50, 1, 3, 120, 2, 1) '
		+ ', ("alucard@daum.net", 1, 93, 5, 5, 80, 3, 2) '
		+ ', ("eastsea@nate.com", 2, 13, 2, 6, 10, 1, 2) '
		+ ', ("killthe11@daum.net", 1, 11, 2, 1, 44, 4, 2) '
		+ ', ("usoda@naver.com", 2, 17, 2, 20, 10, 1, 2) '
		+ ', ("sportmania@gmail.com", 2, 20, 2, 3, 95, 3, 2) '
		+ ', ("otpmusthave1@gmai.com", 2, 15, 2, 4, 20, 1, 2) '
		+ ', ("yGateHDmode@ez2dj.co.kr", 1, 32, 4, 5, 75, 3, 1) '
		+ ', ("alert@java.com", 1, 19, 2, 6, 23, 3, 2) '
		+ ', ("risk100per.nate.com", 1, 18, 2, 1, 18, 1, 2) '
		+ ', ("ottogasannin@yahoo.co.jp", 2, 32, 4, 1, 45, 4, 1) '
		+ ', ("eTank@capcom.com", 1, 65, 5, 5, 29, 3, 1) '
		+ ', ("megastupid@nodap.com", 1, 16, 2, 1, 73, 4, 2) '
		+ ', ("ikemasen@dame.jp", 2, 7, 2, 1, 3, 1, 2) '
		+ ', ("yashiro@kof97.com", 1, 21, 5, 4, 66, 3, 1) '
		+ ', ("autofireRim@mil.com", 1, 22, 5, 1, 7, 4, 2) '
		+ ', ("madnug0@cb.com", 1, 76, 4, 30, 99, 3, 2) '
		+ ', ("urazilation@nate.com", 2, 18, 2, 4, 72, 1, 2) '
		+ ', ("leavemehome@gmail.com", 2, 29, 3, 4, 52, 1, 2) '
		+ ', ("zatou1@bushi.jp", 1, 35, 3, 4, 61, 2, 2) '
		+ ', ("orange@farm.com", 1, 33, 1, 4, 230, 2, 1) '
		+ ', ("masterchef@machef.kr", 2, 47, 5, 3, 221, 3, 2) '
		+ ', ("droidAhn@adk.com", 1, 52, 1, 6, 80, 3, 1) '
		+ ', ("autofireIm@nansa.kr", 1, 22, 2, 1, 8, 2, 1) '
		+ ', ("onoredecade@nrtk.jp", 1, 56, 5, 2, 5, 3, 2) '
		+ ', ("emergency@gmai.com", 2, 18, 2, 1, 44, 1, 1) '
		+ ', ("muskataisa3min@raputa.com", 1, 34, 5, 3, 180, 2, 2) '
		+ ', ("ikillyou@mil.com", 1, 52, 5, 1, 44, 3, 1) '
		+ ', ("ynot@yahoo.com", 2, 17, 2, 6, 85, 4, 2) '
		+ ', ("abujigeshino@naver.com", 2, 67, 5, 2, 15, 4, 1) '
		+ ', ("gndrive@cb.com", 1, 65, 3, 2, 80, 3, 1) '
		+ ', ("ubuntu@ubt.com", 2, 80, 5, 2, 50, 2, 2) '
		+ ', ("korose@kill.net", 1, 18, 2, 3, 44, 1, 1) '
		+ ', ("kutabare@kill.net", 2, 18, 2, 4, 44, 3, 1) '
		+ ', ("iyouandwe@our.net", 1, 44, 4, 2, 55, 3, 1) '
		+ ', ("zebra@ballpen.com", 2, 23, 4, 1, 75, 2, 2) '
		+ ', ("zer0@geass.com", 1, 17, 2, 30, 100, 3, 2) '
		+ ', ("adult18@good.co.kr", 1, 19, 5, 2, 17, 3, 2) '
		+ ', ("droneamazon@amazon.com", 2, 27, 5, 1, 38, 3, 1) '
		+ ', ("aNeko.nyanko.jp", 2, 15, 2, 1, 68, 1, 2) '
		+ ', ("kuksamussang@hero.cn", 1, 31, 4, 6, 99, 4, 1) '
		+ ', ("usodaRena@oyashiro.jp", 2, 16, 2, 1, 42, 2, 2) '
		+ ', ("strikeGundam@gatx105.com", 1, 15, 2, 5, 15, 3, 2) '
		+ ', ("otsukare@finish.net", 2, 76, 1, 6, 18, 4, 1) '
		
		
		, function(err, rows){
	if (err) {
		console.log(err);
        throw err;
	}
	res.send('ok');
});