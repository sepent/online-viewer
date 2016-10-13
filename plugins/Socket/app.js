var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(8181);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {
  socket.emit('connected', { hello: 'world' });

  socket.on('logged', function(data){
    io.emit('logged', data);
  });

  socket.on('logout', function(data){
    io.emit('logout', data);
  });

  socket.on('first', function (data) {
    //res.writeHead(200);
    socket.emit('first', [
      // {"lat": 10.023, "lng": 40.22},
      // {"lat": 10.023, "lng": 40.22},
      // {"lat": -8, "lng": 1},
      // {"lat": 20, "lng": 1},
      // {"lat": 10.023, "lng": -20},
      // {"lat": 50, "lng": 77.22},
      // {"lat": 50, "lng": 77.22},
      // {"lat": 10.023, "lng": 40.22},
      // {"lat": 10.023, "lng": 40.22},
      // {"lat": 10.023, "lng": 40.22},
      // {"lat": 10.023, "lng": 40.22},
      // {"lat": 10.023, "lng": 40.22},
      // {"lat": 10.023, "lng": 40.22}
    ]);
  });
});