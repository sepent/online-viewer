$(document).ready(function(){
	// Event when click on show button
	$('.btn-show').click(function(){
		if($('#filter-container').hasClass('active')){
			$('#filter-container').removeClass('active');
		} else {
			$('#filter-container').addClass('active');
		}
	});

	// Event when click on date picker
	// $('#start-datetimepicker').datetimepicker({
 //      language: 'pt-BR'
 //    });

	// $('#end-datetimepicker').datetimepicker({
 //      language: 'pt-BR'
 //    });

 	// Event when submit filter
 	$(document).on('submit', '#filter-form', function(e){
 		e.preventDefault();

 		var url = $(this).attr('action');
 		var data = $(this).serialize();
 		
 		$.ajax({
 			url: url,
 			data: data,
 			type: "GET",
 			dataType: "json",

 			// Success handle 
 			success: function(response){
 				if(response.status){
 					//alert(response);
	 				galaxy.earth.resetUser();

	 				for (var i = 0; i < response.users.length; i++) {
	 					galaxy.earth.login(response.users[i]);
	 				}
 				} else {
 					alert('Have error when searching. :: ' + response.message);
 				}
 			},

 			// Error handle
 			error: function(){

 			}
 		});
 	});
});