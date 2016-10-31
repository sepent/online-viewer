/*----------------------------------------------------
* Filename: init.js
* Author: Akademia
* Date: YYYY/MM/DD
* Description: The init file, which will be called first
* ----------------------------------------------------
*/
// gloable variable of earth object with cesium
var galaxy = null;

$(document).ready(function(){
	//$.removeCookie('filters');
	//$.removeCookie('filterIndexs');
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

	Event.init();
	Filter.init();
	Filter.resetFilterList();
	Effect.init();
});

