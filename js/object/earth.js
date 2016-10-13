// Earth object
function Earth(id, config){
	this.config = config;
	/**
	* Id proprety
	*
	*/
	this.id = id;

	/**
	* earth property
	*/
	this.viewer = null;

	/**
	* Point object
	*
	*
	*/
	this.users = [];

	/**
	* Image points
	*
	*/
	this.imagePoints = [];

	/*
	* Rotation
	*/
	this.rotation = null;

	/**
	* Load map js
	*
	* 
	*/
	this.show = function(){
		// register key bing map
 		Cesium.BingMapsApi.defaultKey = this.config.mapKey;

		this.viewer = new Cesium.Viewer(this.id, this.config.cesium);

		//this.user = new User(this.viewer);
		this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
	};

	/**
	* Rotate method
	*/
	this.startRotate = function(times){
		var scene = this.viewer.scene;
		var camera = this.viewer.camera;
		var clock = this.viewer.clock;

		function icrf(scene, time) {
		    if (scene.mode !== Cesium.SceneMode.SCENE3D) {
		        return;
		    }

		    var icrfToFixed = Cesium.Transforms.computeIcrfToFixedMatrix(time);
		    if (Cesium.defined(icrfToFixed)) {
		        var offset = Cesium.Cartesian3.clone(camera.position);
		        var transform = Cesium.Matrix4.fromRotationTranslation(icrfToFixed);
		        camera.lookAtTransform(transform, offset);
		    }
		}

		//function viewInICRF(time) {
		  //  Sandcastle.declare(viewInICRF);

		camera.flyHome(0);
		    
		clock.multiplier = times;
		this.rotation = scene.preRender.addEventListener(icrf);
		scene.globe.enableLighting = true;
		//}
		//viewInICRF(3 * 60 * 60);
	}

	/**
	* Stop Rotate method
	*/
	this.stopRotate = function(){
		//this.viewer.scene.remove = 0;
		this.viewer.clock.multiplier = 0;
		this.viewer.scene.preRender.removeEventListener(this.rotation);
	}

	/**
	* Enable lighting
	*
	*/
	this.enableLighting = function(val){
		this.viewer.scene.globe.enableLighting = val;
	}

	/**
	* remove point
	*
	*/
	this.logout = function(point){
		if(this.users[point.userid] != undefined){
			var live = this.users[point.userid];
			window.clearTimeout(this.users[point.userid].lightingTimeout);
			window.clearTimeout(this.users[point.userid].logoutTimeout);
			this.viewer.entities.remove(live.entity);
			this.users[point.userid] = undefined;
		}
	};

	/**
	* createPoints method
	*
	*/
	this.login = function(_point){
		this.logout(_point);

		var user = new User(_point);

		var point = user.point;

		var status = 'logout';

    	var opacity = 0;

    	var times = 0;

    	var parent = this;

    	function logoutAffter(){
			parent.logout(_point);
		}

		function effectLighting(){
			parent.logout(_point);

			if(opacity <= 0){
				status = 'logout';
			}

			if(opacity >= 1){
				status = 'login';
			}

			if(status == 'login'){
				opacity -= 0.1;
				point.billboard.color = new Cesium.Color(1, 1, 1, opacity);
				user.entity = parent.viewer.entities.add(point);				
			} else {
				opacity += 0.1;
				point.billboard.color = new Cesium.Color(1, 1, 1, opacity);
				user.entity = parent.viewer.entities.add(point);
				times++;
			}

			parent.users[_point.userid] = user;

			if(!(times > 25 && opacity >= 1)){
				parent.users[_point.userid].lightingTimeout = window.setTimeout(effectLighting, parent.config.speedlighting);
			} else {
				parent.users[_point.userid].logoutTimeout = window.setTimeout(logoutAffter, parent.config.logouttime); //parent.config.logouttime
			}
		}

		effectLighting();
	};

	/**
	* Reset user
	*
	*/
	this.resetUser = function(){
		for (var key in this.users.length) {
			this.logout({userid: key});
		}
	}
}