//--------------------------------------------------
// getUserKey function
//--------------------------------------------------
function getUserKey(data){
	return window.btoa(data.user_uid+'_'+data.longitude+'_'+data.latitude+'_'+data.timestamp);
}

//--------------------------------------------------
// getFilterKey function
//--------------------------------------------------
function getFilterKey(data){
	return window.btoa(Date());
}

//--------------------------------------------------
// getFilterList function
//--------------------------------------------------
function getCookieFilterList(){
	var strFilter = $.cookie("filters");

	if(strFilter == '' || strFilter == '{}' || strFilter == undefined){
		return [];
	}

	return JSON.parse(strFilter);
}

//--------------------------------------------------
// loadEventList function
//--------------------------------------------------
function applyHTMLForEvents(response){
	loading(false);
	if(response.error == 0){
		//alert(response);
		galaxy.earth.logoutFilterUser(response.filter.id);

		var ul = '#event-panel .event-content ul';

		$(ul+' li[data-filter="'+response.filter.id+'"]').remove();
		// Loop and get position data to login on earth				
		response.users.map(function(value){	
			// load a single image asynchronously
			value.filter = response.filter.id;

			value.id = getUserKey(value);

			var rgb = response.filter.color.match(/\d+/g);

			value.color = rgb;

	        galaxy.earth.login(value);

	        $(ul).append('<li class="list-group-item" data-filter="'+response.filter.id+'" data-user="'+value.id+'" data-date="'+(new Date(value.timestamp)).getTime()+'">'
	        + '<span class="color-label" style="background: '+response.filter.color+'"></span>'
	        + '<div class="event-row">'
	        + '<div>Bundle ID: '+value.bundleid+'</div>'
	        + '<div>Event type: '+value.event_type+'</div>'
	        + '<div>Timestamp: '+value.timestamp+'</div>'
	        + '</div>'
	    	+ '</li>');
			
		});

		sortEventList();
	} else {
		alert('Have error when searching. :: ' + response.message);
	}
}

//--------------------------------------------------
// loadEventList function
//--------------------------------------------------
function loadEventByfilter(filter){
	$.ajax({
		url: 'getuser.php',
		data: filter,
		type: "GET",
		dataType: "json",
		success: function(response){
			response.filter = filter;
			applyHTMLForEvents(response);
		},
		error: function(){
			loading(false);
		}
	});
}

//--------------------------------------------------
// loadEventList function
//--------------------------------------------------
function loadEventList(data){
	data.map(function(filter){

		if(filter.checked != 'true'){
			galaxy.earth.logoutFilterUser(filter.id);
			loading(false);
			return;
		}
		loading(true);
		//socket.loadEventList(filter);
		loadEventByfilter(filter);
	});
}

//--------------------------------------------------
// loadEventListByAllFilters function
//--------------------------------------------------
function loadEventListByAllFilters(){
	var data = getCookieFilterList();
	for(var id in data){
		if(data[id].checked != 'true'){
			galaxy.earth.logoutFilterUser(id);
			loading(false);
			continue;
		}
		loading(true);
		//socket.loadEventList(data[id]);
		loadEventByfilter(data[id]);
	}
}

function isEmptyFilterList(){
	var strFilter = $.cookie("filters");

	if(strFilter == '' || strFilter == '{}' || strFilter == undefined){
		return true;
	}

	return false;
}

//--------------------------------------------------
// loadLogin function
//--------------------------------------------------
function sortEventList(){
	$('#event-panel .event-content ul > li').sort(function(a, b) {
	    return +b.getAttribute('data-date') - +a.getAttribute('data-date');
	})
	.appendTo('#event-panel .event-content ul');
}

//--------------------------------------------------
// Load filter
//--------------------------------------------------
function applyHTMLForFilters(data){
	$('#filter-panel .filter-content ul').append(
		'<li class="list-group-item" data-key="'+ data.id +'">'
    + '<input type="checkbox" class="cbx-filter" id="'+data.id+'" ' + (data.checked == 'true' ? 'checked' : '') + '> <label for="'+data.id+'"><span class="color-label" style="background: '+data.color+'"></span><span>'+data.filtername+'</span></label></label>'
    + '<span class="action-group">'
    + '<a href="#" class="btn-edit"><i class="glyphicon glyphicon-edit"></i></a>'
    + '<a href="#" class="btn-remove"><i class="glyphicon glyphicon-remove"></i></a>'
    + '</span>'
    + '</li>'
	);
}

function loadFilterList(){
	var cookies = $.cookie("filters");
	if(cookies != undefined && cookies != null && cookies != ''){
		var filters = JSON.parse(cookies);
		
		var count = 0;
		for(var key in filters){
			count++;
			applyHTMLForFilters(filters[key]);
		}

		if(count != 0){
			$('#message-filter').hide();
		}
	}
}

//--------------------------------------------------
// actionSettings function
//--------------------------------------------------
function actionSettings(){
	var isRotate = $('#cbx-rotation').is(":checked");
	var rotation = $('#txtRotation').val();
	var isLighting = $('#cbx-lighting').is(":checked");
	var cookie = {
		rotationSpeed: rotation,
		isRotate: isRotate,
		isLighting: isLighting
	};

	$.cookie('settings', JSON.stringify(cookie));

	if(isRotate){
		
		if(isNaN(rotation) || rotation > 99999999 || rotation < 0){
			alert('Rotational speed is invalid');
			return;
		}

		galaxy.earth.startRotate($('#txtRotation').val());
	} else {
		galaxy.earth.stopRotate();
	}

	galaxy.earth.enableLighting(isLighting);
}

//--------------------------------------------------
// loadLogin function
//--------------------------------------------------
function loadSettings(){
	var cookie = $.cookie('settings');
	if(cookie != undefined && cookie != ''){
		var cookie = JSON.parse(cookie) ;
		$('#txtRotation').val(cookie.rotationSpeed != undefined ? cookie.rotationSpeed : '');
		$('#cbx-rotation').prop('checked', cookie.isRotate != undefined ? cookie.isRotate : false);
		$('#cbx-lighting').prop('checked', cookie.isLighting != undefined ? cookie.isLighting : false);
		actionSettings();
	}
}

//--------------------------------------------------
// loading function
//--------------------------------------------------
function loading(show){
	if(show){
		$('#panel-container .disable-panel').addClass('active');
		$('.loading-container').addClass('active');
	} else {
		$('#panel-container .disable-panel').removeClass('active');
		$('.loading-container').removeClass('active');
	}
}
//--------------------------------------------------
// loadScreen
//
//--------------------------------------------------
function loadScreen(){
	var containerHeight = $('#panel-container').height();
	$('#filter-panel').css({height: (containerHeight/2) + 'px'});
	var controlHeight = parseFloat($('#filter-panel .filter-controls').css('height').replace('px', ''));
	$('#filter-panel .filter-content').css({height: (containerHeight/2 - controlHeight - 10) + 'px'});
	$('#event-panel').css({height: (containerHeight/2) + 'px'});
}