var http = require('http');
var express = require('express');

var app = express();
app.use(express.bodyParser());

var server = http.createServer(function(request, response) {
    if (request.method == 'POST') {
        var body = '';
        request.on('data', function (data) {
            body += data;
        });
        request.on('end', function () {
            var req = qs.parse(body);
            checkAuth (req, res, next);
        });
    } else {
        var url_parts = url.parse(request.url, true);
        var query = url_parts.query;
        console.log(query);
        checkAuth (query, res, next);
    }
});


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
	  if (post.user === 'id' && post.password === 'password') {
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