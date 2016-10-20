//--------------------------------------------------
// init.js file
// 
// This file will run begin to create object and display the earth
//--------------------------------------------------


// gloable variable of earth object with cesium
var galaxy = null;

$(document).ready(function(){
	// Show loading effect
	$('.loading-container').addClass('active');

	/*--------------------------------------------------
	Call ajax get setting json file
	--------------------------------------------------*/
	//$.getJSON('js/config.json', function(data){
	 	//$('#txtRotation').val(data.rotation);

	 	//$('#cbx-rotation').prop("checked",data.cbxRotation);


	 	//$('#cbx-lighting').prop("checked",data.cbxLighting);

		// Create cesium object
		galaxy = new Galaxy('earthContainer', {
			"logouttime" : false,

			"speedlighting" : false,

			"mapKey" : "As8UzukXgfjnNg9BhvsECsudfuvHv88Qv4-bK5U_D3yN187IqnPbUAGqps4AyKSB",

			"rotation": 3000,

			"cbxRotation": false,

			"cbxLighting": false, 

			"cesium": {
			    "animation": false,

			    "baseLayerPicker": false, 

			    "homeButton": false,

			    "infoBox": true,

			    "selectionIndicator": true,

			    "timeline": false,

			    "navigationHelpButton": false,
			    
			    "fullscreenButton": false
			}
		});

		// Show the earth
		galaxy.earth.show();

		// Hide loading
		$('.loading-container').removeClass('active');

		//actionSettings();

		// Call to get data when first visit
	 	//loadLogin({}, $('#filter-form').attr('action'));
	//});
});

