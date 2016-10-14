//--------------------------------------------------
// Map.js file
// 
// This file contains events of earth page and some handle with display on page
//--------------------------------------------------

$(document).ready(function(){
	//--------------------------------------------------
	// Event when click on show button
	//--------------------------------------------------
	$('.btn-show').click(function(){
		if($('#filter-container').hasClass('active')){
			$('#filter-container').removeClass('active');
		} else {
			$('#filter-container').addClass('active');
		}
	});

	//--------------------------------------------------
	// Register local for datetimepicker
	//--------------------------------------------------
	jQuery.datetimepicker.setLocale('ja');
	
	//--------------------------------------------------
	// Set datetime picker for starttime textbox
	//--------------------------------------------------
	$('#txtStarttime').datetimepicker({
		dayOfWeekStart : 1,
		formatTime:'H:i',
		formatDate:'Y-m-d'
	});

	//--------------------------------------------------
	// Set endtime picker for endtime textbox
	//--------------------------------------------------
	$('#txtEndtime').datetimepicker({
		dayOfWeekStart : 1,
		formatTime:'H:i',
		formatDate:'Y-m-d'
	});

	//--------------------------------------------------
 	// Event when submit filter
 	//--------------------------------------------------
 	function loadLogin(data, url){
 		// Show loading effect
 		$('.loading-container').addClass('active');
 		$.ajax({
 			url: url,
 			data: data,
 			type: "GET",
 			dataType: "json",

 			// Success handle 
 			success: function(response){
 				// Hide loading effect
 				$('.loading-container').removeClass('active');
 				if(response.error == 0){
 					//alert(response);
	 				galaxy.earth.resetUser();

	 				// Loop and get position data to login on earth
	 				for (var i = 0; i < response.users.length; i++) {
	 					galaxy.earth.login(response.users[i]);
	 				}

 				} else {
 					alert('Have error when searching. :: ' + response.message);
 				}
 			},

 			// Error handle
 			error: function(){
 				// Hide loading effect
 				$('.loading-container').removeClass('active');
 				alert('Could not connect to server.');
 			}
 		});
 	}

 	// Event when filter form submitted
 	$(document).on('submit', '#filter-form', function(e){
 		e.preventDefault();

 		var url = $(this).attr('action');
 		var data = $(this).serialize();
 		loadLogin(data, url);
 	});
 	
 	// Call to get data when first visit
 	loadLogin({}, $('#filter-form').attr('action'));

 	//--------------------------------------------------
 	// Event when change rotation
 	// This function will set rotation and lighting of the earth
 	//
 	//--------------------------------------------------
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