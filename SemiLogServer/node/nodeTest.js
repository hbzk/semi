
var http = require('http');
var mysql = require('mysql');
var sha1 = require('./sha1.js'); // password sha1 암호화
var connection = mysql.createConnection({
	host: "localhost",
	user: "semi",
	password: "semi",
	database: "semidb"
});
connection.connect();


console.log(sha1.SHA1('123'));
var results;


http.createServer(function (req, res) {
	var urlObj = require('url').parse(req.url, true);
	
	if (urlObj.pathname == '/favicon.ico') {
		console.log('/favicon.ico');
	} else {
		console.log(urlObj);
	}
	
	if (urlObj.pathname == '/insert') {
		
		
		//res.setHeader('Access-Control-Allow-Origin', '*');
		res.writeHead(200, {'Content-Type': 'text/plain'});
		
		//connection.query('insert into USER (EMAIL, PASSWORD) values("1234", "321")');
		
		connection.query('select * from USER', function(err, rows){
			if (err) {
				console.log('Query err');
				console.log(err);
			}
			results = rows;
			console.log(rows);
		});
		
		for (var i in results) {
			var result = results[i];
			var data = JSON.stringify(result);
			res.write(data+"\n");
		}
		
		
		
	} else {
		console.log('else');
	}
	
	res.end();
}).listen(7777, '192.168.200.45');
console.log('Server running at http://192.168.200.45:7777/');

