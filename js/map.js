$(document).ready(function(){
	// Event when click on show button
	$('.btn-show').click(function(){
		if($('#filter-container').hasClass('active')){
			$('#filter-container').removeClass('active');
		} else {
			$('#filter-container').addClass('active');
		}
	});

	jQuery.datetimepicker.setLocale('ja');
	$('#txtStarttime').datetimepicker({
		dayOfWeekStart : 1,
		//lang:'ja',
		//disabledDates:['1986/01/08','1986/01/09','1986/01/10'],
		//startDate:	'1986/01/05',
		formatTime:'H:i',
		formatDate:'Y-m-d'
	});

	$('#txtEndtime').datetimepicker({
		dayOfWeekStart : 1,
		//lang:'ja',
		//disabledDates:['1986/01/08','1986/01/09','1986/01/10'],
		//startDate:	'1986/01/05',
		formatTime:'H:i',
		formatDate:'Y-m-d'
	});

 	// Event when submit filter
 	function loadLogin(data, url){
 		$('.loading-container').addClass('active');
 		$.ajax({
 			url: url,
 			data: data,
 			type: "GET",
 			dataType: "json",

 			// Success handle 
 			success: function(response){
 				$('.loading-container').removeClass('active');
 				if(response.error == 0){
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
 				$('.loading-container').removeClass('active');
 				alert('Could not connect to server.');
 			}
 		});
 	}
 	$(document).on('submit', '#filter-form', function(e){
 		e.preventDefault();

 		var url = $(this).attr('action');
 		var data = $(this).serialize();
 		loadLogin(data, url);
 	});
 	
 	loadLogin({}, $('#filter-form').attr('action'));

 	/**
 	* Event when change rotation
 	*
 	*/
 	$(document).on('change', '#cbx-rotation, #cbx-lighting', function(){
 		if($('#cbx-rotation').is(":checked")){
 			galaxy.earth.startRotate(galaxy.earth.config.rotation);
 		} else {
 			galaxy.earth.stopRotate();
 		}

 		if($('#cbx-lighting').is(":checked")){
 			galaxy.earth.enableLighting(true);
 		} else {
 			galaxy.earth.enableLighting(false);
 		}
 	});
});