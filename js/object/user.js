/*----------------------------------------------------
* Filename: user.js
* Author: Akademia
* Date: YYYY/MM/DD
* Description: User object
* ----------------------------------------------------
*/

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
    var images  = "";
    if(this.data.event_payload_image !="")
    {
        images = '<div class="imageInfoBox"><img src="'+this.data.event_payload_image+'" style="max-width: 100%; max-height: 100%"/></div>';
    }
    else if( this.data.avatar !="")
    {
        var images  = '<div class="imageInfoBox"><img src="'+this.data.avatar+'" style="max-width: 100%; max-height: 100%"/></div>';;
    }

    this.point = {
        position : Cesium.Cartesian3.fromDegrees(this.data.longitude, this.data.latitude),
        description: '<div class="info-description">'
                  + images
                  + '<div><span>User id:</span> ' + this.data.user_uid + '</div>'
                  + '<div><span>Device type:</span> ' + this.data.device_type + '</div>'
                  + '<div><span>Device platform:</span> ' + this.data.device_platform + '</div>'
                  + '<div><span>Longitude:</span> ' + this.data.longitude + '</div>'
                  + '<div><span>Latitude:</span> ' + this.data.latitude + '</div>'
                  + '<div><span>Timestamp:</span> ' + this.data.timestamp + '</div>'
                  + '</div>'
                  + '<div style="clear: both"></div>'
                  + '<div style="text-align:center">'
                  + '<input class="showRawEvent" type="button" onclick="window.parent.showRawEvent();" value="Show Raw Event" />'
                  + '<input id="jsonUser" type="hidden" value=\''+JSON.stringify(this.data)+'\' />'
                  + '</div>'
                  , 
        name: this.data.event_type
    };

    if(this.data.shape == 'circle'){
        this.point.billboard = {
            image : 'images/shapes.png',
            imageSubRegion : new Cesium.BoundingRectangle(22, 10, 13, 13),
            color : Cesium.Color.fromBytes(this.data.color[0],this.data.color[1],this.data.color[2], this.data.color[3]*255)
        }
    }else if(this.data.shape == 'triangle'){
        this.point.billboard = {
            image : 'images/shapes.png',
            imageSubRegion : new Cesium.BoundingRectangle(38, 10, 12, 13),
            color : Cesium.Color.fromBytes(this.data.color[0],this.data.color[1],this.data.color[2], this.data.color[3]*255)
        }
    } else if(this.data.shape == 'square'){
        this.point.billboard = {
            image : 'images/shapes.png',
            imageSubRegion : new Cesium.BoundingRectangle(4, 10, 13, 13),
            color : Cesium.Color.fromBytes(this.data.color[0],this.data.color[1],this.data.color[2], this.data.color[3]*255)
        }
    } else if(this.data.shape == 'star'){
        this.point.billboard = {
            image : 'images/shapes.png',
            imageSubRegion : new Cesium.BoundingRectangle(54, 10, 13, 13),
            color : Cesium.Color.fromBytes(this.data.color[0],this.data.color[1],this.data.color[2], this.data.color[3]*255)
        }
    } else if(this.data.shape == 'diamond'){
        this.point.billboard = {
            image : 'images/shapes.png',
            imageSubRegion : new Cesium.BoundingRectangle(71, 10, 17, 13),
            color : Cesium.Color.fromBytes(this.data.color[0],this.data.color[1],this.data.color[2], this.data.color[3]*255)
        }
    }

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