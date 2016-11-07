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
        images = '<div class="imageInfoBox"><img src="'+this.data.event_payload_image+'" style="width:100%; max-height: 100%"/></div>';
    }
    else if( this.data.avatar !="")
    {
        var images  = '<div class="imageInfoBox"><img src="'+this.data.avatar+'" style=" width:100%; max-height: 100%"/></div>';;
    }

    this.point = {
        position : Cesium.Cartesian3.fromDegrees(this.data.longitude, this.data.latitude),
        description: '<div class="info-description">'
                  + '<div><table style="width:100%;text-align: left;font-size: 13;" class="InfoBoxRow">'
                  + '<tr>'
                  + '<th rowspan="8">' +images+'</th>'
                  + '<th >BundleId</th>'
                  + '<th>'+this.data.bundleid+'</th>'
                  + '</tr>'
                  + '<tr>'
                  + '<th>User id</th>'
                  + '<th>'+this.data.user_uid+'</th>'
                  + '</tr>'
                  + '<tr>'
                  + '<th>Device type</th>'
                  + '<th>'+this.data.device_type+'</th>'
                  + '</tr>'
                  + '<tr>'
                  + '<th>Device platform</th>'
                  + '<th>'+this.data.device_platform+'</th>'
                  + '</tr>'
                  + '<tr>'
                  + '<th>Longitude</th>'
                  + '<th>'+this.data.longitude+'</th>'
                  + '</tr>'
                  + '<tr>'
                  + '<th>Latitude</th>'
                  + '<th>'+this.data.latitude+'</th>'
                  + '</tr>'
                  + '<tr>'
                  + '<th>Timestamp</th>'
                  + '<th>'+this.data.timestamp+'</th>'
                  + '</tr>'
                  + '</table></div>'
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