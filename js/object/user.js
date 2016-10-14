//--------------------------------------------------
// user.js file
// 
// This file contains user object
//--------------------------------------------------

function User(data){
    //--------------------------------------------------
    // data property
    // This property contains all data of user, include config data
    //--------------------------------------------------
    this.data = data;
	
    //--------------------------------------------------
    // point property
    // contains point data in cesium
    //--------------------------------------------------
	this.point = {
    	position : Cesium.Cartesian3.fromDegrees(this.data.longitude, this.data.latitude),
    	description: '<div class="info-description">'
                  + '<img src="'+ this.data.avatar+'" style="height: 100px; float: left; margin-right:10px; margin-bottom: 10px;"/>'
                  + '<div><span>Device:</span> ' + this.data.device_platform + '</div>'
                  + '<div><span>Longitude:</span> ' + this.data.longitude + '</div>'
                  + '<div><span>Latitude:</span> ' + this.data.latitude + '</div>'
                  + '<div><span>Timestamp:</span> ' + this.data.timestamp + '</div>'
                  + '<div style="clear: both"></div>'
                  + '</div>', 
    	name: this.data.username,
    	text: '',
    	billboard : {
            image : this.data.avatar,
            width : 20,
            height : 20
        }
    };

    //--------------------------------------------------
    // entity property
    // The entity which save on entities of cesium
    //--------------------------------------------------
    this.entity = null;

    //--------------------------------------------------
    // lightingTimeout property
    // Contain object timeout of lighting
    //--------------------------------------------------
    this.lightingTimeout = null;
  
    //--------------------------------------------------
    // logoutTimeout property
    // Contain timeout object of logout
    //--------------------------------------------------
    this.logoutTimeout = null;
}