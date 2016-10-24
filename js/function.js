function getUserKey(data){
	return window.btoa(data.user_uid+'_'+data.longitude+'_'+data.latitude+'_'+data.timestamp);
}

function getFilterKey(data){
	return window.btoa(Date());
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
// loadLogin function
//--------------------------------------------------
function loadLogin(data){
	if(data.checked != 'true'){
		galaxy.earth.logoutFilterUser(data.id);
		return;
	}

	var url = 'getuser.php';
	// Show loading effect
	$('.loading-container').addClass('active');

	$.ajax({
		url: url,
		data: data,
		type: "GET",
		dataType: "json",

		// Success handle 
		success: function(response){
			// Hide loading effect
			$('.loading-container').removeClass('active');
			if(response.error == 0){
				//alert(response);
				galaxy.earth.logoutFilterUser(data.id);

				if(response.users.length != 0){
					$('#message-filter').hide();
				} else {
					return;
				}

				var ul = '#event-panel .event-content ul';

				$(ul+' li[data-filter="'+data.id+'"]').remove();
				// Loop and get position data to login on earth				
				response.users.map(function(value){					
					// load a single image asynchronously
					value.filter = data.id;
					value.id = getUserKey(value);

					var rgb = data.color.match(/\d+/g);

					value.color = rgb;

			        galaxy.earth.login(value);

					$(ul).append('<li class="list-group-item" data-filter="'+data.id+'" data-user="'+value.id+'" data-date="'+(new Date(value.timestamp)).getTime()+'">'
                            + '<span class="color-label" style="background: '+data.color+'"></span>'
                            + '<div class="event-row">'
                            + '<div>Bundle ID: '+value.bundleId+'</div>'
                            + '<div>Event type: '+value.event_type+'</div>'
                            + '<div>Timestamp: '+value.timestamp+'</div>'
                            + '</div>'
                        	+ '</li>');
					sortLogin();
				});
				
				//$('.counter').text(response.users.length + ' result(s) is found');
			} else {
				alert('Have error when searching. :: ' + response.message);
			}
		},

		// Error handle
		error: function(){
			// Hide loading effect
			$('.loading-container').removeClass('active');
			alert('Could not connect to server.');
		}
	});
}

//--------------------------------------------------
// loadLogin function
//--------------------------------------------------
function refreshLogin(){
	var strFilter = $.cookie("filters");

	if(strFilter == '' || strFilter == undefined){
		galaxy.earth.logoutAllUser();
	}

	var filters = JSON.parse(strFilter);
	for(var data in filters){
		loadLogin(filters[data]);
	}
}

//--------------------------------------------------
// loadLogin function
//--------------------------------------------------
function sortLogin(){
	$('#event-panel .event-content ul > li').sort(function(a, b) {
	    return +b.getAttribute('data-date') - +a.getAttribute('data-date');
	})
	.appendTo('#event-panel .event-content ul');
}