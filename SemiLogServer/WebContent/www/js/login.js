var http = require('http');
var express = require('express');

var app = express();


function checkAuth (req, res, next){
	if(!req.sesstion.user_id){
		res.send('Not authorized to SemiColon');
	}else{
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		next();
	}
}
app.use(app.router);

app.get('/afterLogin', checkAuth, function (req, res) {
	  res.send('if you are viewing this page it means you are logged in');
	});

app.post('/login', function (req, res) {
	  var post = req.body;
	  if (post.user === 'john' && post.password === 'johnspassword') {
	    req.session.user_id = johns_user_id_here;
	    res.redirect('/afterLogin');
	  } else {
	    res.send('Bad user/pass');
	  }
	});

app.get('/logout', function (req, res) {
	  delete req.session.user_id;
	  res.redirect('/login');
	});    