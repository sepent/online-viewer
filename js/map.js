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

 		$.ajax({
 			url: url,
 			data: {
 				bundle: '',
 				starttime: '',
 				endtime: ''
 			},
 			type: "POST",

 			// Success handle
 			success: function(response){
 				//alert(response);
 				galaxy.earth.resetUser();

 				response = JSON.parse(response);

 				for (var i = 0; i < response.length; i++) {
 					galaxy.earth.login(response[i]);
 				}
 			},

 			// Error handle
 			error: function(){

 			}
 		});
 	});
});