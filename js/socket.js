/*----------------------------------------------------
* Filename: socket.js
* Author: Akademia
* Date: YYYY/MM/DD
* Description: The socket js file, code about socket connection.
* ----------------------------------------------------
*/
var socket = null;

$(document).ready(function(){
	var isReconnect = false;
	if(typeof io != 'undefined'){
		socket = io.connect('https://akademia-analytics-socket.herokuapp.com');

		socket.on('connected', function (data) {

			// Event when server send new sign inserted
			socket.on('newSign', function(data){
				Filter.socketResetFilterList();
			});

			if(isReconnect){
				Effect.alert('Connected to socket server.');
				Filter.socketResetFilterList();
				isReconnect = false;
			}
		});

		socket.on('disconnect', function(){
			Effect.alert('Disconnect to socket server.');
			isReconnect = true;
		});
	}else{
		Effect.alert('Could not connect to socket server.');
		return;
	}
});


