/*----------------------------------------------------
* Filename: earth.js
* Author: Akademia
* Date: YYYY/MM/DD
* Description: Earth object
* ----------------------------------------------------
*/
function Earth(container, config){
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
	this.container = container;

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

		this.viewer = new Cesium.Viewer(this.container, this.config.cesium);

		this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
		this.viewer.infoBox.frame.setAttribute('sandbox', 'allow-same-origin allow-popups allow-forms allow-scripts allow-top-navigation');
		
		var parent = this;
		handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
		handler.setInputAction(function(click) {
			var pickedObject = parent.viewer.scene.pick(click.position);
			$('#event-panel .event-content ul li').removeClass('active');
			    if (Cesium.defined(pickedObject)) {
					for(var filterKey in parent.users){
						for(var userKey in parent.users[filterKey]){
							var user = parent.users[filterKey][userKey];
							if(user.entity == null)
							{
								continue;
							}else{
								if(pickedObject.id.id == user.entity.id){
									$(".cesium-infoBox-camera i" ).remove();
									$(".cesium-infoBox-camera" ).append('<i class="'+Filter.iconList[user.data.shape]+'" style="color: rgba('+user.data.color+')"></i>');
									$('#event-panel .event-content ul li[data-user="'+userKey+'"]').addClass('active');
									console.log(user.data);
								break;
								}
							}
						}
					}
				}
			}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
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
	this.logout = function(filter, user){
		if(this.users[filter] == undefined){
			return;
		}

		if(this.users[filter][user] == undefined){
			return;
		}

		this.viewer.entities.remove(this.users[filter][user].entity);
		delete this.users[filter][user];
	};

	//--------------------------------------------------
	// login method
	// This method will be added user point on the earth
	//--------------------------------------------------
	this.login = function(_point){
		this.logout(_point.filter, _point.user_uid);

		var user = new User(_point);

		var point = user.point;

		user.entity = this.viewer.entities.add(point);

		if(this.users[_point.filter] == undefined){
			this.users[_point.filter] = {};
		}

		this.users[_point.filter][_point.key]  = user;
		// if(this.config.logouttime != false){
		// 	this.users[_point.user_uid].logoutTimeout = window.setTimeout(logoutAffter, this.config.logouttime);
		// }

		// var status = 'logout';

    	// var opacity = 0;

    	// var times = 0;

  		// var parent = this;

  		// function logoutAffter(){
		// 	parent.logout(_point);
		// }

		// function effectLighting(){
		// 	parent.logout(_point);

		// 	if(opacity <= 0){
		// 		status = 'logout';
		// 	}

		// 	if(opacity >= 1){
		// 		status = 'login';
		// 	}

		// 	if(status == 'login'){
		// 		opacity -= 0.1;
		// 		point.billboard.color = new Cesium.Color(1, 1, 1, opacity);
		// 		user.entity = parent.viewer.entities.add(point);				
		// 	} else {
		// 		opacity += 0.1;
		// 		point.billboard.color = new Cesium.Color(1, 1, 1, opacity);
		// 		user.entity = parent.viewer.entities.add(point);
		// 		times++;
		// 	}

		// 	parent.users[_point.user_uid] = user;

		// 	if(!(times > 25 && opacity >= 1)){
		// 		parent.users[_point.user_uid].lightingTimeout = window.setTimeout(effectLighting, parent.config.speedlighting);
		// 	} else {
		// 		if(parent.config.logouttime != false){
		// 			parent.users[_point.user_uid].logoutTimeout = window.setTimeout(logoutAffter, parent.config.logouttime);
		// 		}
		// 	}
		// }

		// if(this.config.speedlighting == false){
		// 	//point.billboard.color = new Cesium.Color(1, 1, 1, 1);
		// 	user.entity = this.viewer.entities.add(point);
		// 	this.users[][_point.user_uid] = user;

		// 	if(this.config.logouttime != false){
		// 		this.users[_point.user_uid].logoutTimeout = window.setTimeout(logoutAffter, this.config.logouttime);
		// 	}
		// } else {
		// 	effectLighting();
		// }
	};


	//--------------------------------------------------
	// Reset user method
	// This method will remove all user on earth
	//--------------------------------------------------
	this.logoutAllUser = function(){
		for (var filter in this.users) {
			for (var user in this.users[filter]) {
				this.logout(filter, user);
			}
		}
	};

	//--------------------------------------------------
	// Reset user method
	// This method will remove all user on earth
	//--------------------------------------------------
	this.logoutFilterUser = function(filter){
		for (var user in this.users[filter]) {
			var users = $.extend({}, this.users);
			delete users[filter];

			for (var filterKey in users) {
		   		for(var userKey in this.users[filterKey]){
		   			if(this.users[filterKey][userKey].data.longitude == this.users[filter][user].data.longitude
		   				&& this.users[filterKey][userKey].data.latitude == this.users[filter][user].data.latitude){
		   				if(this.users[filterKey][userKey].entity != null){
		   					this.viewer.entities.remove(this.users[filterKey][userKey].entity);
		   				}
		   				
	   					this.users[filterKey][userKey].entity = this.viewer.entities.add(this.users[filterKey][userKey].point);
		   			}
		   		}
		   	}
		   	this.logout(filter, user);
		}
	};

	//--------------------------------------------------
	// flyTo method
	//--------------------------------------------------
	this.flyTo = function(filter, user){

	   	var data =  $.extend({}, this.users[filter][user].data);


	   	for (var filterKey in this.users) {
	   		for(var userKey in this.users[filterKey]){
	   			if(this.users[filterKey][userKey].data.longitude == data.longitude
	   				&& this.users[filterKey][userKey].data.latitude == data.latitude){
	   				if(this.users[filterKey][userKey].entity != null){
		   				this.viewer.entities.remove(this.users[filterKey][userKey].entity);
	   					this.users[filterKey][userKey].entity = null;
		   			}
	   			}
	   		}
	   	}

	    this.users[filter][user].entity = this.viewer.entities.add(this.users[filter][user].point);

	   	this.viewer.camera.setView({
            destination : Cesium.Cartesian3.fromDegrees(parseFloat(data.longitude) ,parseFloat(data.latitude) ,Cesium.Ellipsoid.WGS84.cartesianToCartographic(this.viewer.camera.position).height)   
    	});
	   	
    	this.viewer.selectedEntity = this.users[filter][user].entity;
	};
}