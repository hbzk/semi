var express = require('express');
var bodyParser = require('body-parser');

var http = require('http');
var mysql = require('mysql');
var sha1 = require('./sha1.js'); // password sha1 암호화

var app = express();

app.use(bodyParser());

app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

var dbconn = mysql.createConnection({
	host : 'localhost',
	user : 'semi',
	password : 'semi',
	database:'semidb'
});


// /signup으로 post 요청 오면 insert 수행
app.post('/signup',function(req,res){
	
	console.log(req.body);
	console.log(req.body.email);
	console.log(req.body.password);
	
	req.body.password = sha1.SHA1(req.body.password); // 암호화 
	
	var user = req.body;
    dbconn.query('insert into USER set ?', user, function(err,result){
        if (err) {
            console.error(err);
            throw err;
        }
        res.send(200,'가입 되었다');
    });

});

// 로그인
app.post('/login', function(req,res){
	console.log('login post');
	
	var email = req.body.email;
	var password = sha1.SHA1(req.body.password);
	console.log(password);
	dbconn.query('select * from USER where EMAIL = ?', email, function(err, rows, fields){
		if (err) {console.log(err);}
		if (!rows.length) { res.send('가입 안된 이메일'); } 
		else {
			if (rows[0].PASSWORD != password) {
				res.send('암호가 다르다');
			} else {
				res.cookie('email', req.body.email);
				res.send('로그인 되었다 \n' + req.body.email);
			}
		}
	});
	
});


// 이메일 중복 확인
app.get('/emailCheck',function(req,res){
	var email = req.query.email;
	dbconn.query('select * from USER where EMAIL = ?', email, function(err, rows){
		if (err) {console.log(err);}
		if (!rows.length) { res.send('가입 안된 이메일'); } 
		else { res.send('이미 있는 이메일'); }
	});
});

app.post('/emailCheck',function(req,res){
	console.log('/emailCheck -> post');
	console.log(req.body.email);
	
	if (req.body.email != '') {
		res.setHeader('Access-Control-Allow-Origin', '*');
		var email = req.body.email;
		dbconn.query('select * from USER where EMAIL = ?', email, function(err, rows){
			if (err) {console.log(err);}
			if (rows.length) { 
				res.send('err'); 
			} 
			else { 
				res.send('가입 안된 이메일'); 
			}
		});
	}
});


// (테스트 할 동안) pathname 없으면 user list 출력
app.get('/', function(req,res){
	
	dbconn.query('select * from USER', function(err, rows){
		if (err) {
			console.log('Query err');
			console.log(err);
		}
		console.log(rows);
		res.json(rows);
	});
});

app.listen(3000);
console.log('Server ON : 3000');