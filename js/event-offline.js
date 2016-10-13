$('.logged').click(function(){
	var lat = $('.lat').val();
	var lng = $('.lng').val();
	var username = $('.username').val();
	var password = $('.password').val();
	var fullname = $('.fullname').val();
	var avatar = $('.avatar').val();
	var age = $('.age').val();
	var logouttime = $('.logged-time').val();
	galaxy.earth.login({lat: parseInt(lat), lng: parseInt(lng), username: username, password: password, fullname: fullname, age: age, avatar: avatar, logouttime: logouttime});
	// $.get('http://localhost/map_demo/', function(data){
	// 	galaxy.earth.user.login(JSON.parse(data));
	// });
});

$('.imagepst').click(function(){
	var lat = $('.imglat').val();
	var lng = $('.imglng').val();
	var username = $('.imgname').val();
	var avatar = $('.img-dat').val();
	var logouttime = $('.logged-time').val();
	galaxy.earth.addImagePost({lat: parseInt(lat), lng: parseInt(lng), username: username, avatar: avatar, logouttime: logouttime});
	// $.get('http://localhost/map_demo/', function(data){
	// 	galaxy.earth.user.login(JSON.parse(data));
	// var entity = new Cesium.Entity('Title to put in the infobox');
	// entity.description = {
	//     getValue : function() {
	//         return 'HTML to display in the infobox';
	//     }
	// };
	// galaxy.earth.viewer.selectedEntity = entity;
	// });
});

$('.logout').click(function(){
	var lat = $('.lat').val();
	var lng = $('.lng').val();
	var username = $('.username').val();
	
	galaxy.earth.logout({lat: parseInt(lat), lng: parseInt(lng), username: username});
});

$('.start-rotation').click(function(){
	var rotation = $('.rotation').val();
	galaxy.earth.startRotate(parseFloat(rotation)*1000);
});

$('.stop-rotation').click(function(){
	galaxy.earth.stopRotate();
});

$('.enable-lighting').click(function(){
	galaxy.earth.enableLighting(true);
});

$('.disable-lighting').click(function(){
	galaxy.earth.enableLighting(false);
});

$('.btn-show button').click(function(){
	var show = $(this).parent().attr('data-show');
	if(show == 'true'){
		$(this).parent().attr('data-show', 'false');
		$(this).parent().parent().css({left: '-200px'});
	} else {
		$(this).parent().attr('data-show', 'true');
		$(this).parent().parent().css({left: '10px'});
	}
});

$('.facebook').click(function(){
	var data = [];
	var lat = $('.lat').val();
	var lng = $('.lng').val();
	var username = $('.username').val();
	var password = $('.password').val();
	var fullname = $('.fullname').val();
	var avatar = $('.avatar').val();
	var age = $('.age').val();
	var logouttime = $('.logged-time').val();
	
	//galaxy.earth.logout({lat: parseInt(lat), lng: parseInt(lng), username: username});
	data.push({lat: parseInt(lat), lng: parseInt(lng), username: username, avatar: avatar, logouttime: logouttime});

	for(var i = 0; i < data.length; i++){
		galaxy.earth.login(data[i]);
	}
});

$('.sampleposition').click(function(){
	$.get('Apps/api.json', function(data){
		for(var i = 0; i < data.length; i++){
			galaxy.earth.login(data[i]);
		}
	});
});