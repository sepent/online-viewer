function User(data){
    /**
	* Id proprety
	*
	*/
	this.data = data;
	/**
	* point
	*
	*/
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
          	height : 20,
          	// outlineColor : Cesium.Color.WHITE,
          	// alignedAxis : Cesium.Cartesian3.UNIT_Z,
          	// rotation : -Cesium.Math.PI_OVER_TWO
          	//color : new Cesium.Color(1.0, 1.0, 1.0, 0.5)
        }

    	// point : {
     //  		pixelSize : 5,
     //  		color : Cesium.Color.RED,
     //  		outlineColor : Cesium.Color.WHITE,
     //  		outlineWidth : 2
      	// }
  };

  this.entity = null;
  /**
	* lighting timeout
	*
	*/
  this.lightingTimeout = null;
  /**
	* logout timeout
	*
	*/
  this.logoutTimeout = null;
}