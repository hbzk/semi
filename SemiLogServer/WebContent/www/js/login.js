var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');

//get passport for LOGIN
var passport = require('passport')
, LocalStrategy = require('passport-local').Strategy;

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





module.exports = function(passport) {
 
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
		done(null, user.id);
    });
 
    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
		connection.query("select * from users where id = "+id,function(err,rows){	
			done(err, rows[0]);
		});
    });
    
    passport.use('/login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form
 
         connection.query("SELECT * FROM `users` WHERE `email` = '" + email + "'",function(err,rows){
			if (err)
                return done(err);
			 if (!rows.length) {
                return done(null, false, req.flash('loginMessage', 'No user found.')); 
                // req.flash is the way to set flashdata using connect-flash
            } 
			
			// if the user is found but the password is wrong
            if (!( rows[0].password == password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); 
            // create the loginMessage and save it to session as flashdata
			
            // all is well, return successful user
            return done(null, rows[0]);			
		
		});
 
 
    }));
 
};

app.listen(3000);
console.log('Server ON : 3000');