var socket = null;

$(document).ready(function(){
	if(typeof io != 'undefined'){
		socket = io.connect('http://localhost:8080');

		// socket.loadEventList = function(filter){
		// 	socket.emit('filterRequest', filter);
		// };

		socket.on('connected', function (data) {
			//loading(false);
			// Event when server send new sign inserted
			socket.on('newSign', function(data){
				// Set filter list
				loadEventListByAllFilters();
			});

			// Event when socket send response data for filter
			// socket.on('filterResponse', function(data){
			// 	applyHTMLForEvents(data);
			// });

			// if(!isEmptyFilterList()){
			// 	loading(true);
			// }
			
			//loadEventListByAllFilters();
		});

		socket.on('disconnect', function(){
			//loading(true);
		});
	}else{
		alert('The socket server is not found');
		return;
	}
});


