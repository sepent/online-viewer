//--------------------------------------------------
// init.js file
// 
// This file will run begin to create object and display the earth
//--------------------------------------------------


// gloable variable of earth object with cesium
var galaxy = null;

// Show loading effect
$('.loading-container').addClass('active');

//--------------------------------------------------
// Call ajax get setting json file
//--------------------------------------------------
$.getJSON('js/config.json', function(data){
	// Create cesium object
	galaxy = new Galaxy('earthContainer', data);

	// Show the earth
	galaxy.earth.show();

	// Hide loading
	$('.loading-container').removeClass('active');
});