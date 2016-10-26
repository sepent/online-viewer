var app = require('express')();
var http = require('http');
var server = http.Server(app);
var io = require('socket.io')(server);
var querystring = require('querystring');

var listener = server.listen(process.env.PORT || 8080);
console.log("Listen on port: " + listener.address().port);
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.post('/newSign', function (req, res) {
  io.emit('newSign', {});
  res.end('{"error": 0, "message": "success"}');
});

io.on('connection', function (socket) {
	// Send event connect success to client
  	socket.emit('connected', { hello: 'world' });

  	// Event when client send request filter
  // 	socket.on('filterRequest', function (filter) {
		// var data = querystring.stringify(filter);

	 //  	var options = {
	 //    	host: 'viewer.dev',
	 //    	port: 80,
	 //    	path: '/getuser.php',
	 //    	method: 'GET',
	 //    	headers: {
	 //      		'Content-Type': 'application/x-www-form-urlencoded',
	 //      		'Content-Length': Buffer.byteLength(data)
	 //    	}
	 //  	};

  // 		var httpreq = http.request(options, function (response) {
  //   		response.setEncoding('utf8');
  //   		response.on('data', function (chunk) {
  //   			var result = JSON.parse(chunk);
  //   			result.filter = filter;
  //     			socket.emit('filterResponse', result);
  //   		});
  //   		response.on('end', function() {
  //   		});
  // 		});
  // 		httpreq.write(data);
  // 		httpreq.end();
  // 	});

  	// Event when PHP server send new sign
  	socket.on('newSign', function(){
  		// Send notify with new sign to client
  		io.emit('newSign', {});
  	});
});