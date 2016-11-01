/*----------------------------------------------------
* Filename: function.js
* Author: Akademia
* Date: YYYY/MM/DD
* Description: This file contains all event and also method to handle some logical
* ----------------------------------------------------
*/
var Event = {
	list: [],
	init: function(){
		//--------------------------------------------------
	 	// Event click on list
	 	//--------------------------------------------------
	 	$(document).on('click', '#event-panel .event-content ul li', function(){
	 		$('#event-panel .event-content ul li').removeClass('active');
	 		$(this).addClass('active');
	 		var filter = $(this).attr('data-filter');
	 		var user = $(this).attr('data-user');
	 		galaxy.earth.flyTo(filter, user);
	 	});
	},

	//--------------------------------------------------
	// getUserKey function
	//--------------------------------------------------
 	generateUserKey: function(data){
		return window.btoa(data.user_uid+'_'+data.longitude+'_'+data.latitude+'_'+data.timestamp);
	},

	//--------------------------------------------------
	// loadEventList function
	//--------------------------------------------------
	loadEventByfilter: function(filter, callback){
		$.ajax({
			url: 'getevents.php',
			data: filter,
			type: "GET",
			dataType: "json",
			success: function(response){
				if(response.error == 0){
					response.filter = filter;
					Event.list[filter.key] = response;
					if(callback != null){
						callback();
					}
				} else {
					Effect.alert('Have an error: ' + response.message);
					if(callback != null){
						callback();
					}
				}
			},
			error: function(){
				Effect.alert('Could not connect to server');
				if(callback != null){
					callback();
				}
			}
		});
	},

	//--------------------------------------------------
	// loadEventList function
	//--------------------------------------------------
	displayAllEvents: function(){
		$('#filter-panel .filter-content ul li').each(function(){
			if($(this).hasClass('not-use')){
				return;
			}

			var key = $(this).attr('data-key');
			
			if($(this).find('.cbx-filter').is(':checked') && Event.list[key] != undefined){
				Event.displayEvent(Event.list[key]);
			} else {
				$('#event-panel .event-content ul li[data-filter="'+key+'"]').remove();
		 		galaxy.earth.logoutFilterUser(key);
			}
		});
	},
	//--------------------------------------------------
	// loadEventList function
	//--------------------------------------------------
	displayEvent: function(response){
	    $('#event-panel .event-content ul li[data-filter="'+response.filter.key+'"]').each(function(){
	    	var userId = $(this).attr('data-user');
	    	response.users.map(function(value){	
	        	if(userId == value.key){
	        		return;
	        	}
	    	});
	    	galaxy.earth.logout(response.filter.key, userId);
	        $(this).remove();
	    });

		//$(ul+' li[data-filter="'+response.filter.key+'"]').remove();
		// Loop and get position data to login on earth				
		response.users.map(function(value){
			// load a single image asynchronously
			value.filter = response.filter.key;

			value.key = Event.generateUserKey(value);

			var rgb = response.filter.color.match(/\d+/g);

			value.color = rgb;

			value.shape = response.filter.shape;

	        if($('#event-panel .event-content ul li[data-user="'+value.key+'"]').length == 0){
	        	$('#event-panel .event-content ul').append('<li class="list-group-item" data-filter="'+response.filter.key+'" data-user="'+value.key+'" data-date="'+(new Date(value.timestamp)).getTime()+'">'
		        + '<span class="shape-item" style="color: '+response.filter.color+'"><i class="'+Filter.iconList[response.filter.shape]+'"></i></span>'
		        + '<div class="event-row">'
		        + '<div>'+value.bundleid+'</div>'
		        + '<div>'+value.event_type+'</div>'
		        + '<div>'+value.timestamp+'</div>'
		        + '</div>'
		    	+ '</li>');
		    	galaxy.earth.login(value);
	        }
		});

		Event.sortEventList();
	},

	//--------------------------------------------------
	// loadLogin function
	//--------------------------------------------------
	sortEventList: function(){
		$('#event-panel .event-content ul > li').sort(function(a, b) {
	    	return +b.getAttribute('data-date') - +a.getAttribute('data-date');
		}).appendTo('#event-panel .event-content ul');
	},

	removeAll: function(){
		galaxy.earth.logoutAllUser();
		$('#event-panel .event-content ul > li').remove();
	},

	removeByFilterId: function(id){
		$('#event-panel .event-content ul li[data-filter="'+id+'"]').remove();
	 	galaxy.earth.logoutFilterUser(id);
	}
};

var Filter = {
	filterIndexs: "filterIndexs",
	filters: "filters",
	iconList: {
		"circle": "fa fa-circle",
		"square": "fa fa-square",
		"star": "fa fa-star",
		"triangle": "glyphicon glyphicon-play",
		"diamond": "fa fa-diamond"
	},

	init: function(){
		//--------------------------------------------------
		// Register local for datetimepicker
		//--------------------------------------------------
		//jQuery.datetimepicker.setLocale('ja');
		
		//--------------------------------------------------
		// Set datetime picker for starttime textbox
		//--------------------------------------------------
		$('#txtStarttime').datetimepicker({
			dayOfWeekStart : 1,
			format: 'yyyy-mm-dd hh:ii'
		});

		//--------------------------------------------------
		// Set endtime picker for endtime textbox
		//--------------------------------------------------
		$('#txtEndtime').datetimepicker({
			dayOfWeekStart : 1,
			format: 'yyyy-m-dd hh:ii'
		});

		//--------------------------------------------------
		// Set fiter color
		//--------------------------------------------------
		$('#filter-color').colorpicker({
	        color: 'rgba(1,1,1,1)',
	        format: 'rgba'
	    }).on('changeColor',function(){
	    	$('#filter-form .shape-btn .shape-item').css({color: $('#filter-form input[name="color"]').val()});
	    });
	    $(document).on('change paste blur', '#filter-color input', function(){
	    	if($(this).val() == ''){
	    		$(this).val($(this).closest('#filter-color').attr('default-value'));
	    	}

	    	$('#filter-form .shape-btn .shape-item').css({color: $(this).val()});
	    });

	    $(document).on('click','#filter-form .shape-group a', function(){
	    	$('#filter-form .shape-btn .shape-item').html('<i class="' + Filter.iconList[$(this).data('value')] + '"></i>');
	    	$('#filter-form input[name="shape"]').val($(this).data('value'));
	    });

	    $(document).on('change paste blur', '#filter-form input[name="shape"]', function(){
	    	if($(this).val() == ''){
	    		$('#filter-form .shape-btn .shape-item').html('<i class="' + Filter.iconList[$(this).attr('default-value')] + '"></i>');
	    		$(this).val($(this).attr('default-value'));
	    	}
	    });

	    $(document).on('change paste blur', '#filter-form input[name="filtername"]', function(){
	    	if($(this).val() == ''){
	    		$(this).val($(this).attr('default-value'));
	    	}
	    });
		//--------------------------------------------------
		// Save filter
		//--------------------------------------------------
		$(document).on('submit', '#filter-form', function(e){
			e.preventDefault();
	 	});

	 	$(document).on('click', '.btn-save', function(e){
	 		if(!Filter.isValidForm($('#filter-form').get(0))){
	 			return;
	 		}

	 		var data = $('#filter-form').serializeArray();
	 		var filter = {};

	 		data.map(function(field){
	 			filter[field.name] = field.value;
	 		});

	 		if(filter.key == ''){
	 			filter.key = Filter.generateFilterKey(filter);
		 		Filter.addFilter(filter);
	 		} else {
	 			Filter.updateFilter(filter);
	 		}

	 		Filter.displayFilter(filter);

	 		$('#message-filter').hide();

	 		//loading(true);
	 		//loadEventList([filter]);

	 		$('#filterModal').modal('hide');
	 	});

	 	// Event when click on add-filter-btn
	 	//--------------------------------------------------
		// Add filter
		//--------------------------------------------------
	 	$(document).on('click', '.add-filter-btn', function(){
	 		$('.validation-msg').text('');
	 		$('#filter-form').get(0).reset();
	 		$('#filter-form input[name="key"]').val('');
	 		$('#filter-form input[name="checked"]').val('true');
	 		$('#filterModal .title').text('Add new filter');
	 		$('#filter-color').colorpicker('setValue', 'rgba(1,1,1,1)');
	 		$('#filter-form').find('.shape-btn .shape-item').css({color: 'rgba(1,1,1,1)'})
	 		$('#filter-form').find('.shape-btn .shape-item').html('<i class="'+Filter.iconList['circle']+'"></i>');
	 		$('#filter-form input[name="shape"]').val('circle');
	 		$('#filter-form input[name="shape"]').attr('default-value', 'circle');

	 		$('#filter-color').attr('default-value', 'rgba(1,1,1,1)');
	 		
	 		$('#filter-form input[name="filtername"]').attr('default-value', 'New filter');
	 		$('#filter-form input[name="filtername"]').val('New filter');
	 	});

	 	//--------------------------------------------------
		// Event when click on edit btn
		//--------------------------------------------------
	 	$(document).on('click', '.filter-content ul .btn-edit', function(e){
	 		e.preventDefault();

	 		if(!Filter.isEmptyFilterList()){
		 		var key = $(this).closest('li').attr('data-key');
		 		var cookies = $.cookie(Filter.filters);

	 			var filter = JSON.parse(cookies);
	 			if(filter[key] != undefined){
	 				$('.validation-msg').text('');
	 				$('#filterModal .title').text('Edit filter');

	 				for(var attr in filter[key]){
		 				$('#filter-form input[name="'+attr+'"]').val(filter[key][attr]);
		 			}

		 			$('#filter-color').colorpicker('setValue', filter[key]['color']);

		 			$('#filter-form').find('.shape-btn .shape-item').css({color: filter[key]['color']});
		 			$('#filter-form').find('.shape-btn .shape-item').html('<i class="' + Filter.iconList[filter[key]['shape']] + '"></i>');

		 			$('#filter-form input[name="shape"]').attr('default-value', filter[key]['shape']);

	 				$('#filter-color').attr('default-value', filter[key]['color']);

	 				$('#filter-form input[name="filtername"]').attr('default-value', filter[key]['filtername']);

		 			$('#filterModal').modal('show');
	 			}
	 		}
	 	});

	 	//--------------------------------------------------
		// Event when change filter checkbox
		//--------------------------------------------------
	 	$(document).on('change', '.cbx-filter', function(){
	 		var key = $(this).closest('li').attr('data-key');
	 		var filters = JSON.parse($.cookie(Filter.filters));

	 		if($(this).is(':checked')){
	 			filters[key].checked = 'true';
	 			Filter.updateFilter(filters[key]);
	 		} else {
	 			filters[key].checked = 'false';

		 		$.cookie(Filter.filters, JSON.stringify(filters));
		 		Event.displayAllEvents();
	 		}
	 	});

	 	// Event when click on delete btn
	 	//--------------------------------------------------
		// Delete filter
		//--------------------------------------------------
	 	$(document).on('click', '.filter-content ul .btn-remove', function(e){
	 		e.preventDefault();
	 		var key = $(this).closest('li').attr('data-key');
	 		
	 		Filter.removeFilter(key);

	 		Event.removeByFilterId(key);

	 		$('#filter-panel .filter-content ul li[data-key="'+ key +'"]').remove();

	 		Filter.checkQuantityMessage();

	 		Event.displayAllEvents();
	 	});

	 	// Event when drag on filter list
	 	$('.filter-content .list-group').sortable({
	        //disabled: false,
	        axis: 'y',
	        //forceHelperSize: true,
	        update: function (event, ui) {
	            Filter.updateFilterIndexByScreen();
	        },
	        cancel : '.filter-content .list-group .action-group, .filter-content .list-group .cbx-filter, .filter-content .list-group label'
	    });

	    // Generate list of icon
	    for(var key in Filter.iconList){
	    	$('#filter-form .shape-group').append('<li><a href="#" data-value="'+key+'"><span class="shape-item"><i class="'+Filter.iconList[key]+'"></i></span>'+key.charAt(0).toUpperCase() + key.slice(1)+'</a></li>');
	    }
	},

	isEmptyFilterList: function(){
		var strFilter = $.cookie(Filter.filters);

		if(strFilter == '' || strFilter == '{}' || strFilter == undefined){
			return true;
		}

		return false;
	},
	//--------------------------------------------------
	// getFilterKey function
	//--------------------------------------------------
	generateFilterKey: function(data){
		return window.btoa(Date());
	},

	//--------------------------------------------------
	// Get filter cookie
	//--------------------------------------------------
	getFilterCookie: function(){
		if(Filter.isEmptyFilterList()){
			return [];
		}

		var fiterIndex = $.cookie(Filter.filterIndexs);
		var filters = $.cookie(Filter.filters);

		filters = JSON.parse(filters);
		fiterIndex = JSON.parse(fiterIndex);

		for (var i = 0; i < fiterIndex.length; i++) {
			fiterIndex[i] = filters[fiterIndex[i]];
		}

		return fiterIndex;
	},
	//--------------------------------------------------
	// Add filter
	//--------------------------------------------------
	addFilter: function(filter){
		var cookies = $.cookie(Filter.filters);

 		if(cookies == undefined || cookies == null){
 			cookies = {};
 		} else {
 			cookies = JSON.parse(cookies);
 		}

 		cookies[filter.key] = filter;

 		$.cookie(Filter.filters, JSON.stringify(cookies));

 		var filterIndexs = $.cookie(Filter.filterIndexs);
 		var filterIndexArray = [];
 		if(filterIndexs != undefined && filterIndexs != null && filterIndexs != '' && filterIndexs != '{}'){
 			var filterIndexArray = JSON.parse(filterIndexs);
 		}

 		filterIndexArray.push(filter.key);
 		$.cookie(Filter.filterIndexs, JSON.stringify(filterIndexArray));

 		Effect.loading(true);
 		Event.loadEventByfilter(filter, function(){
 			Event.removeAll();
			Effect.loading(false);
			Event.displayAllEvents();
		});
	},

	//--------------------------------------------------
	// Add filter
	//--------------------------------------------------
	updateFilter: function(filter){
		var cookies = $.cookie(Filter.filters);

 		if(cookies == undefined || cookies == null){
 			cookies = {};
 		} else {
 			cookies = JSON.parse(cookies);
 		}

 		cookies[filter.key] = filter;

 		$.cookie(Filter.filters, JSON.stringify(cookies));

 		Effect.loading(true);
 		Event.loadEventByfilter(filter, function(){
 			Event.removeAll();
			Effect.loading(false);
			Event.displayAllEvents();
		});
	},

	//--------------------------------------------------
	// resetFilterList
	//--------------------------------------------------
	resetFilterList: function(){
		if(!Filter.isEmptyFilterList()){
			Effect.loading(true);
		}

		var cookies = Filter.getFilterCookie();
		var filters = [];
		cookies.map(function(filter){
			Filter.displayFilter(filter);
			if(filter.checked == 'true'){
				filters.push(filter);
			}
		});

		Filter.checkQuantityMessage();

		//--------------------------------------------------
		// loadEventCallBack
		//--------------------------------------------------
		var length = filters.length;
		var count = 0;
		function finish(){
			count++;
			if(count == length){
				Effect.loading(false);
				Event.displayAllEvents();
			}
		}
		
		for(var index = 0; index < length; index++){
			Event.loadEventByfilter(filters[index], finish);
		}
	},

	//--------------------------------------------------
	// resetFilterList
	//--------------------------------------------------
	socketResetFilterList: function(){
		var cookies = Filter.getFilterCookie();
		var filters = [];
		cookies.map(function(filter){
			Filter.displayFilter(filter);
			if(filter.checked == 'true'){
				filters.push(filter);
			}
		});

		Filter.checkQuantityMessage();

		//--------------------------------------------------
		// loadEventCallBack
		//--------------------------------------------------
		var length = filters.length;
		var count = 0;
		function finish(){
			count++;
			if(count == length){
				Event.displayAllEvents();
			}
		}
		
		for(var index = 0; index < length; index++){
			Event.loadEventByfilter(filters[index], finish);
		}
	},

	//--------------------------------------------------
	// Load filter
	//--------------------------------------------------
	displayFilter: function(data){
		if($('#filter-panel .filter-content ul li[data-key="'+data.key+'"]').length == 0){
			$('#filter-panel .filter-content ul').append('<li class="list-group-item" data-key="'+ data.key +'"></li>');
		}

		$('#filter-panel .filter-content ul li[data-key="'+data.key+'"]').html(
		    '<input type="checkbox" class="cbx-filter" id="'+data.key+'" ' + (data.checked == 'true' ? 'checked' : '') + '/>'
		    + '<label for="'+data.key+'"></label><span class="shape-item" style="color: '+data.color+'"><i class="'+Filter.iconList[data.shape]+'"></i></span> <span class="filter-name" style="font-weight: bold">'+data.filtername+'</span>'
		    + '<span class="action-group">'
		    + '<a href="#" class="btn-edit"><i class="glyphicon glyphicon-edit"></i></a>'
		    + '<a href="#" class="btn-remove"><i class="glyphicon glyphicon-remove"></i></a>'
		    + '</span>'
		);
	},

	//--------------------------------------------------
	// checkQuantityMessage
	//--------------------------------------------------
	checkQuantityMessage: function(){
		if($('#filter-panel .filter-content ul li').length > 1){
			$('#message-filter').hide();
		} else {
			$('#message-filter').show();
		}
	},

	//--------------------------------------------------
	// removeFilter
	//--------------------------------------------------
	removeFilter(id){
		var cookies = JSON.parse($.cookie(Filter.filterIndexs));
		var index = cookies.indexOf(id);

		if (index > -1) {
		    cookies.splice(index, 1);
		    var filters = JSON.parse($.cookie(Filter.filters));
		    delete filters[id];
		    $.cookie(Filter.filters, JSON.stringify(filters));
		    $.cookie(Filter.filterIndexs, JSON.stringify(cookies));
		}
	},
	//--------------------------------------------------
	// updateFilterIndexByScreen
	//--------------------------------------------------
	updateFilterIndexByScreen: function(){

		var filterIndex = [];
		$('#filter-panel .filter-content ul li').each(function(){
			if($(this).hasClass('not-use')){
				return;
			}

			var key = $(this).attr('data-key');

			filterIndex.push(key);

			Event.removeByFilterId(key);
		});

		$.cookie(Filter.filterIndexs, JSON.stringify(filterIndex));

		Event.displayAllEvents();
	},

	isValidForm: function(ob){
		function validTextColour(stringToTest) {
		    //Alter the following conditions according to your need.
		    if (stringToTest === "") { return false; }
		    if (stringToTest === "inherit") { return false; }
		    if (stringToTest === "transparent") { return false; }
		    
		    var image = document.createElement("img");
		    image.style.color = "rgb(0, 0, 0)";
		    image.style.color = stringToTest;
		    if (image.style.color !== "rgb(0, 0, 0)") { return true; }
		    image.style.color = "rgb(255, 255, 255)";
		    image.style.color = stringToTest;
		    return image.style.color !== "rgb(255, 255, 255)";
		}

		$('.validation-msg').text('');
		var isOK = true;
		// Valid for filtername
		value = $(ob).find('input[name="filtername"]').val();
		if(value == ''){
			$(ob).find('input[name="filtername"]').focus();
			$('#filternameValidation').text('Please input filter\'s name');
			isOK = false;
		}

		// Validate for shape
		value = $(ob).find('input[name="shape"]').val();
		if(value == ''){
			$(ob).find('input[name="shape"]').focus();
			$('#shapeValidation').text('Please input filter\'s shape');
			isOK = false;
		} else if(Filter.iconList[value] == undefined){
			$(ob).find('input[name="shape"]').focus();
			$('#shapeValidation').text('Shape\'s name is not exists');
			isOK = false;
		}

		// Validate for color
		value = $(ob).find('input[name="color"]').val();
		if(value == ''){
			$(ob).find('input[name="color"]').focus();
			$('#colorValidation').text('Please input filter\'s color');
			isOK = false;
		} else if(!validTextColour(value)){
			$(ob).find('input[name="color"]').focus();
			$('#colorValidation').text('Invalid color\'s name');
			isOK = false;
		}

		return isOK;
	}
};

var Effect = {
	init: function(){
		//$.removeCookie("filters");
		//--------------------------------------------------
		// Event when click on show button
		//--------------------------------------------------
		$('.btn-show').click(function(){
			if($('#panel-container').hasClass('active')){
				$('#panel-container').removeClass('active');
				$(this).html('<i class="glyphicon glyphicon-chevron-right"></i>');
			} else {
				$('#panel-container').addClass('active');
				$(this).html('<i class="glyphicon glyphicon-chevron-left"></i>');
			}
		});
		//--------------------------------------------------
	 	// Event when change rotation
	 	// This function will set rotation and lighting of the earth
	 	//
	 	//--------------------------------------------------
	 	$(document).on('change', '#cbx-rotation, #cbx-lighting, #txtRotation', function(){
	 		Effect.actionSettings();
	 	});
		//--------------------------------------------------
	 	// Event click show more setting
	 	//
	 	//--------------------------------------------------
	 	$(document).on('click', '.setting-btn', function(){
	 		if($('.setting-panel').hasClass('active')){
	 			$('.setting-panel').removeClass('active')
	 			
	 			$(this).html('<i class="glyphicon glyphicon-cog"></i> Show settings');
	 		} else {
	 			$('.setting-panel').addClass('active')
	 			$(this).html('<i class="glyphicon glyphicon-cog"></i> Hide settings');
	 		}
	 	});
		//--------------------------------------------------
	 	// Resize event
	 	//
	 	//--------------------------------------------------
	 	$( window ).resize(function() {
		  Effect.loadScreen();
		});

		$("#modal-alert").hide();
		//--------------------------------------------------
	 	// Call function load first
	 	//
	 	//--------------------------------------------------
	 	Effect.loadScreen();
		Effect.loadSettings();
	},
	//--------------------------------------------------
	// actionSettings function
	//--------------------------------------------------
	actionSettings: function(){
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
	},

	//--------------------------------------------------
	// loadLogin function
	//--------------------------------------------------
	loadSettings: function(){
		var cookie = $.cookie('settings');
		if(cookie != undefined && cookie != ''){
			var cookie = JSON.parse(cookie) ;
			$('#txtRotation').val(cookie.rotationSpeed != undefined ? cookie.rotationSpeed : '');
			$('#cbx-rotation').prop('checked', cookie.isRotate != undefined ? cookie.isRotate : false);
			$('#cbx-lighting').prop('checked', cookie.isLighting != undefined ? cookie.isLighting : false);
			Effect.actionSettings();
		}
	},

	//--------------------------------------------------
	// loading function
	//--------------------------------------------------
	loading: function(show){
		if(show){
			$('#panel-container .disable-panel').addClass('active');
			$('.loading-container').addClass('active');
		} else {
			$('#panel-container .disable-panel').removeClass('active');
			$('.loading-container').removeClass('active');
		}
	},
	//--------------------------------------------------
	// loadScreen
	//
	//--------------------------------------------------
	loadScreen: function(){
		var containerHeight = $('#panel-container').height();
		$('#filter-panel').css({height: (containerHeight/2) + 'px'});
		var controlHeight = parseFloat($('#filter-panel .filter-controls').css('height').replace('px', ''));
		$('#filter-panel .filter-content').css({height: (containerHeight/2 - controlHeight - 10) + 'px'});
		$('#event-panel').css({height: (containerHeight/2) + 'px'});
	},

	alert: function(message){
		$("#modal-alert").find('.msg').text(message);
		$("#modal-alert").alert();
        $("#modal-alert").fadeTo(2000, 500).slideUp(500, function(){
        	$("#modal-alert").slideUp(500);
        });  
	}
};