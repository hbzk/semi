var express = require('express');
var bodyParser = require('body-parser');
var morgan  = require('morgan');

var mysql = require('mysql');
var sha1 = require('./sha1.js'); // password sha1 암호화

var app = express();
app.use(morgan('short')); // Logging middleware
app.use(bodyParser());	// body parsing middleware.
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

var dbconn = mysql.createConnection({
	host : 'localhost',
	user : 'semi',
	password : 'semi',
	database:'semidb'
});

// 장비에서 최초 실행시 USER ID 생성 후 전달
app.get('/createUser',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	dbconn.query('INSERT INTO USER SET PASSWORD=""', function(err, rows){
		if (err) {
			console.log(err);
            next(err);
            throw err;
		}
		console.log(rows);
		console.log(rows.insertId);
		res.send(rows.insertId.toString());
	});
});


// /signup으로 post 요청 오면 insert 수행
app.post('/signup',function(req,res){
	var user = req.body;
	user.password = sha1.SHA1(user.password); // 암호화 
	
	console.log(req.headers);
	console.log(req.headers.origin);
	
	
	console.log(user);
    dbconn.query('insert into USER set ?', user, function(err,result){
        if (err) {
            console.log(err);
            next(err);
            throw err;
        }
        res.redirect(''+req.headers.origin+'/www/main.html');
    });

});

// 로그인
app.post('/login', function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	
	console.log('login post');
	
	var email = req.body.email;
	var password = sha1.SHA1(req.body.password);
	dbconn.query('select * from USER where EMAIL = ?', email, function(err, rows, fields){
		if (err) {console.log(err);}
		if (!rows.length) { res.send('가입 안된 이메일'); } 
		else {
			if (rows[0].PASSWORD != password) {
				res.send('암호가 다르다');
			} else {
				res.cookie('email', req.body.email);
				var user = rows[0];
				console.log(user);
				user.PASSWORD = '';
				
				res.send(user);
				//dbconn.query('UPDATE USER SET  WHERE ID = ?', , function(err, rows, fields){
				
				// 서버에서 유저 정보 받아서 장비 유저 테이블에 넣기
				//res.redirect(''+req.headers.origin+'/www/main.html');
			}
		}
	});
});


// (테스트용 / 삭제 예정) 이메일 중복 확인
app.get('/emailCheck',function(req,res){
	var email = req.query.email;
	dbconn.query('select * from USER where EMAIL = ?', email, function(err, rows){
		if (err) {console.log(err);}
		if (!rows.length) { res.send('가입 안된 이메일'); } 
		else { res.send('이미 있는 이메일'); }
	});
});

//이메일 중복 확인
app.post('/emailCheck',function(req,res){
	if (req.body.email != '') {
		res.setHeader('Access-Control-Allow-Origin', '*');
		var email = req.body.email;
		dbconn.query('select * from USER where EMAIL = ?', email, function(err, rows){
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


// (테스트용 / 삭제 예정) pathname 없으면 user list 출력
app.get('/', function(req,res){
	
	dbconn.query('select * from USER', function(err, rows){
		if (err) {
			console.log('Query err');
			console.log(err);
		}
		//console.log(rows);
		res.json(rows);
	});
});

app.listen(1111);
console.log('Server ON : 1111');