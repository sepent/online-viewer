// Socket event
var socket = io('http://localhost:8181');

socket.on('connected', function (data) {
	socket.emit('first', { my: 'data' });

	socket.on('first', function(data){
		galaxy.earth.user.login(data);
	});

	socket.on('logged', function(data){
		galaxy.earth.user.login(data);
	});

	socket.on('logout', function(data){
		galaxy.earth.user.logout(data);
	});
});