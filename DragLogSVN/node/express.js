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


// USER dummy 삽입
app.get('/dummyu', function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	
	
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
		res.send('들어감');
	});
});

app.post('/submitLog', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	
	var logList = req.body.logList;
	console.log(logList);
	
	for (var log in logList) {
		console.log(log.ACTION);
	}
	
	res.send('ok');
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