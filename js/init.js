var galaxy = null;
$('.loading-container').addClass('active');
$.getJSON('js/config.json', function(data){
	galaxy = new Galaxy('earthContainer', data);
	galaxy.earth.show();
	$('.loading-container').removeClass('active');
});



// Create the cosmic
//var galaxy = new Galaxy('earthContainer');

// Create background for cosmic
//cosmic.setBackground('');

// Create the earth
//galaxy.earth.show();

// Load point
// $.get('http://localhost:8080/Apps/api.json', function(data, status){
	
// });

// var viewer = galaxy.earth.viewer;
// var scene = viewer.scene;

// var labels = scene.primitives.add(new Cesium.LabelCollection());
// labels.add({
//     position: Cesium.Cartesian3.fromDegrees(-75.1641667, 29.9522222),
//     text: 'Another label',
//     pixelOffset: new Cesium.Cartesian2(100, -100)
// });

// var billboards = scene.primitives.add(new Cesium.BillboardCollection());
// billboards.add({
//     color : Cesium.Color.RED,
//     pixelOffset: new Cesium.Cartesian2(50, -50),
//     position : Cesium.Cartesian3.fromDegrees(-75.1641667, 29.9522222)
// });