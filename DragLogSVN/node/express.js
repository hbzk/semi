var express = require('express');
var bodyParser = require('body-parser');
var morgan  = require('morgan');

var mysql = require('mysql');

var app = express();
app.use(morgan('short')); // Logging middleware
app.use(bodyParser());	// body parsing middleware.
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

var dbconn;
var db_config = {
	host : 'localhost',
	user : 'semi',
	password : 'semi',
	database:'semidb'
};

// connection 에러로 서버 다운 방지
var handleDisconnect = function() {
	dbconn = mysql.createConnection(db_config);
	
	dbconn.connect(function(err) {
		if(err) {
			console.log('error when connecting to db:', err);
			setTimeout(handleDisconnect(), 2000);
		}
	});
	
	dbconn.on('error', function(err) {
		console.log('db error', err);
		if(err.code === 'PROTOCOL_CONNECTION_LOST') {
			handleDisconnect();
		} else {
			throw err;
		}
	});
};
handleDisconnect();


//test
app.post('/test', function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	
	console.log(req.body);
	res.send(req.body);
});

//USER dummy 삽입
app.get('/dummyu', function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	dbconn.query('INSERT IGNORE INTO USER (EMAIL, GENDER, AGE, JOB, SALARY, SPEND, SCHOLAR, MARRY) '
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
			+ ', ("strikeGundam@gat-x105.com", 1, 15, 2, 5, 15, 3, 2) '
			+ ', ("otsukare@finish.net", 2, 76, 1, 6, 18, 4, 1) '
			, function(err, rows){
		if (err) {
			console.log(err);
	        throw err;
		}
		console.log(rows);
		res.send(rows);
	});
});

// LOG dummy 삽입
app.get('/dummy', function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	
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
		res.send('들어감');
	});
});

// 장비에서 서버로 기록 보내기
app.post('/submitLog', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	
	var logList = req.body.logList;
	var logSQL = 'INSERT IGNORE INTO LOG (USER_NO, ACTION, START_TIME, END_TIME, DURATION) ' 
		+ ' VALUES ('+logList[0].USER_NO+',"'+logList[0].ACTION+'","'+logList[0].START_TIME+'","'+logList[0].END_TIME+'",'+logList[0].DURATION+')';
	
	for (var i = 1; i < logList.length; i++) {
		logSQL += ',\n ('+logList[i].USER_NO+',"'+logList[i].ACTION+'","'+logList[i].START_TIME+'","'+logList[i].END_TIME+'",'+logList[i].DURATION+')';
	}
	
	dbconn.query(logSQL, function(err, rows){
		if (err) {
			console.log(err);
            throw err;
		}
		console.log(rows);
		res.send(rows);
	});
	
});


// 장비에서 최초 실행시 USER ID 생성 후 전달
app.get('/createUser',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	dbconn.query('INSERT INTO USER SET PASSWORD="" ', function(err, rows){
		if (err) {
			console.log(err);
            throw err;
		}
		console.log(rows);
		res.send(rows.insertId.toString());
	});
});


// 회원가입
app.post('/signup',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	var user = req.body;
	
	console.log(user);
	dbconn.query('UPDATE USER SET EMAIL=?, PASSWORD=?, AGE=?, GENDER=?, JOB=?, '
			+' SALARY=?, SPEND=?, SCHOLAR=?, MARRY=? WHERE USER_NO=?',
    		[user.email, user.password, user.age, user.gender, user.job, user.salary, user.spend, user.scholar, user.marry, user.user_no], 
    		function(err, rows, fields){
    		if (err) {
        		console.log(err);
            throw err;
    		} else {
        		res.send('ok');
    		}
	});
});


// 로그인
app.post('/login', function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	
	var email = req.body.email;
	var password = req.body.password;
	
	dbconn.query('SELECT * FROM USER WHERE EMAIL = ?', email, function(err, rows, fields){
		if (err) {
			console.log(err);
            throw err;
		}
		else {
			if (rows[0].PASSWORD == password) {
				//res.cookie('email', req.body.email);
				var user = rows[0];
				console.log(user);
				user.PASSWORD = '';
				
				res.send(user);
			} else {
				res.send('no');
			}
		}
	});
});

//이메일 중복 확인
app.post('/emailCheck',function(req,res){
	if (req.body.email != '') {
		res.setHeader('Access-Control-Allow-Origin', '*');
		var email = req.body.email;
		dbconn.query('SELECT * FROM USER WHERE EMAIL = ?', email, function(err, rows){
			if (err) {console.log(err);}
			if (rows.length) { 
				res.send('already'); 
			} 
			else { 
				res.send('empty'); 
			}
		});
	}
});


// (테스트 용) pathname 없으면 user list 출력
app.get('/', function(req,res){
	
	dbconn.query('SELECT * FROM USER', function(err, rows, fields){
		if (err) {
			console.log('Query err');
			console.log(err);
		}
		//console.log(rows);
		//console.log(fields);
		res.json(rows);
	});
});

app.listen(1111);
console.log('Server ON : 1111');