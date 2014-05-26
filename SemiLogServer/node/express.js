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
	console.log(sha1.SHA1(req.body.password));
	req.body.password = sha1.SHA1(req.body.password); 
	console.log(req.body.password);
	//res.send(200, req.body);
	
	var user = req.body;
    dbconn.query('insert into USER set ?', user, function(err,result){
        if (err) {
            console.error(err);
            throw err;
        }
        res.send(200,'가입 되었다');
    });

});

// 이메일 중복 확인
app.get('/emailCheck',function(req,res){
	var email = req.query.email;
	dbconn.query('select * from USER where EMAIL = ?', email, function(err, rows){
		if (err) {console.log(err);}
		if (rows.length > 0) { res.send('이미 있는 이메일');} 
		else { res.send('가입 안된 이메일'); }
	});
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