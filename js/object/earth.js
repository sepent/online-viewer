//--------------------------------------------------
// earth.js file
// Cotnains earth object
//--------------------------------------------------

function Earth(id, config){
	//--------------------------------------------------
	// config property
	// 
	// Config json data
	//--------------------------------------------------
	this.config = config;
	
	//--------------------------------------------------
	// id property
	// id of element on HTML
	//--------------------------------------------------
	this.id = id;

	//--------------------------------------------------
	// viewer property
	// Contains viewer cesium object 
	//--------------------------------------------------
	this.viewer = null;

	//--------------------------------------------------
	// users property
	// Contains user objects
	//--------------------------------------------------
	this.users = [];

	//--------------------------------------------------
	// rotation property
	// Contains rotation cesium object
	//--------------------------------------------------
	this.rotation = null;

	//--------------------------------------------------
	// show method
	// This method will be show the earth
	//--------------------------------------------------
	this.show = function(){
		// register key bing map
 		Cesium.BingMapsApi.defaultKey = this.config.mapKey;

		this.viewer = new Cesium.Viewer(this.id, this.config.cesium);

		//this.user = new User(this.viewer);
		this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
	};

	//--------------------------------------------------
	// show method
	// This method start rotation
	//--------------------------------------------------
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

		camera.flyHome(0);
		    
		clock.multiplier = times;
		this.rotation = scene.preRender.addEventListener(icrf);
		scene.globe.enableLighting = true;
	}

	//--------------------------------------------------
	// stopRotate method
	// This method stop rotation
	//--------------------------------------------------
	this.stopRotate = function(){
		//this.viewer.scene.remove = 0;
		this.viewer.clock.multiplier = 0;
		this.viewer.scene.preRender.removeEventListener(this.rotation);
	}

	//--------------------------------------------------
	// enableLighting method
	// enableLighting on earth
	//--------------------------------------------------
	this.enableLighting = function(val){
		this.viewer.scene.globe.enableLighting = val;
	}

	//--------------------------------------------------
	// logout method
	// This method remove user on earth
	//--------------------------------------------------
	this.logout = function(point){
		if(this.users[point.user_uid] != undefined){
			var live = this.users[point.user_uid];
			window.clearTimeout(this.users[point.user_uid].lightingTimeout);
			window.clearTimeout(this.users[point.user_uid].logoutTimeout);
			this.viewer.entities.remove(live.entity);
			this.users[point.user_uid] = undefined;
		}
	};

	//--------------------------------------------------
	// login method
	// This method will be added user point on the earth
	//--------------------------------------------------
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

			parent.users[_point.user_uid] = user;

			if(!(times > 25 && opacity >= 1)){
				parent.users[_point.user_uid].lightingTimeout = window.setTimeout(effectLighting, parent.config.speedlighting);
			} else {
				if(parent.config.logouttime != false){
					parent.users[_point.user_uid].logoutTimeout = window.setTimeout(logoutAffter, parent.config.logouttime);
				}
			}
		}

		if(this.config.speedlighting == false){
			point.billboard.color = new Cesium.Color(1, 1, 1, 1);
			user.entity = this.viewer.entities.add(point);
			this.users[_point.user_uid] = user;

			if(this.config.logouttime != false){
				this.users[_point.user_uid].logoutTimeout = window.setTimeout(logoutAffter, this.config.logouttime);
			}
		} else {
			effectLighting();
		}
	};


	//--------------------------------------------------
	// Reset user method
	// This method will remove all user on earth
	//--------------------------------------------------
	this.resetUser = function(){
		for (var key in this.users) {
			this.logout({user_uid: key});
		}
	}
}