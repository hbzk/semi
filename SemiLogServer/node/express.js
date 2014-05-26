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


app.post('/users',function(req,res){
	
	//console.log(req);
	console.log(req.param('email'));
	console.log(req.body);
	//console.log(req.query);
	//console.log(req.query.originalUrl);
	
	//var urlObj = require('url').parse(req.url, true);
	//console.log(urlObj);
	
	res.send(200,'success');
	
    /*var user = {'EMAIL': '12345',
                'PASSWORD': '456'};
    dbconn.query('insert into USER set ?',user,function(err,result){
        if (err) {
            console.error(err);
            throw err;
        }
        res.send(200,'success');
    });*/
});



app.get('/users', function(req,res){
	console.log(req.param('email'));
	console.log(req.body);
	console.log(req.query);
	
	res.json(req.query);
	dbconn.query('select * from USER', function(err, rows){
		if (err) {
			console.log('Query err');
			console.log(err);
		}
		results = rows;
		console.log(rows);
		res.json(rows);
	});
});

app.listen(3000);
console.log('Server ON : 3000');