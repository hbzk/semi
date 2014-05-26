var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');

var mysql = require('mysql');
var sha1 = require('./sha1.js');

var app = express();

app.use(bodyParser());

app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

var dbconn = mysql.createConnection({
	host : 'localhost',
	user : 'semi',
	password : 'semi',
	database:'semidb'
});


// /signup post 요청 오면 insert 수행
app.post('/signup',function(req,res){
	
	var user = req.body;
    dbconn.query('insert into USER set ?', user, function(err,result){
        if (err) {
            console.error(err);
            throw err;
        }
        res.send(200,'success');
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