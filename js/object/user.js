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
    	position : Cesium.Cartesian3.fromDegrees(this.data.latitude, this.data.longitude),
    	description: '<img width="100%" height="100px" src="'+ this.data.avatar+'"/>', 
    	name: this.data.username,
    	text: '5',
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