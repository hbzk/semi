var results;

var mysql = require('mysql');

var mysqlConfig = {
	host: "localhost",
	user: "study",
	password: "study",
	database: "studydb"
};

var conn = mysql.createConnection(mysqlConfig);

conn.query("select * from SE_COURS", function(err, rows){
	if (err) {
		console.log("Query err");
		console.log(err);
	}
	
	results = rows;
	//console.log(rows);
	conn.destroy();
});


var http = require('http');
http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	
	for (var i in results) {
		var result = results[i];
		var data = JSON.stringify(result);
		res.write(data+"\n");
	}
	
	res.end();
}).listen(7777, '192.168.200.45');
console.log('Server running at http://192.168.200.45:7777/');



