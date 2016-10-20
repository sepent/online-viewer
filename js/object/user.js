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
                  + '<div style="height: 100px; width: 100px; float: left; margin-right:10px; margin-bottom: 10px; border: 1px solid #ddd; text-align: center"><img src="'+this.data.avatar+'" style="max-width: 100%; max-height: 100%"/></div>'
                  + '<div><span>Device type:</span> ' + this.data.device_type + '</div>'
                  + '<div><span>Device platform:</span> ' + this.data.device_platform + '</div>'
                  + '<div><span>Longitude:</span> ' + this.data.longitude + '</div>'
                  + '<div><span>Latitude:</span> ' + this.data.latitude + '</div>'
                  + '<div><span>Timestamp:</span> ' + this.data.timestamp + '</div>'
                  + '<div style="clear: both"></div>'
                  + '</div>', 
        name: this.data.username,
        text: '',
        point : {
            color : Cesium.Color.fromBytes(this.data.color[0],this.data.color[1],this.data.color[2], this.data.color[3]*255),
            pixelSize : 10,
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 2
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