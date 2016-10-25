//--------------------------------------------------
// Map.js file
// 
// This file contains events of earth page and some handle with display on page
//--------------------------------------------------

$(document).ready(function(){
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
	// Register local for datetimepicker
	//--------------------------------------------------
	//jQuery.datetimepicker.setLocale('ja');
	
	//--------------------------------------------------
	// Set datetime picker for starttime textbox
	//--------------------------------------------------
	$('#txtStarttime').datetimepicker({
		dayOfWeekStart : 1,
		formatTime:'H:i',
		formatDate:'Y-m-d'
	});

	//--------------------------------------------------
	// Set endtime picker for endtime textbox
	//--------------------------------------------------
	$('#txtEndtime').datetimepicker({
		dayOfWeekStart : 1,
		formatTime:'H:i',
		formatDate:'Y-m-d'
	});

	//--------------------------------------------------
	// Set fiter color
	//--------------------------------------------------
	$('#filter-color').colorpicker({
        color: 'rgba(1,1,1,1)',
        format: 'rgba'
    });

 	// Event when click on delete btn
 	//--------------------------------------------------
	// Delete filter
	//--------------------------------------------------
 	$(document).on('click', '.filter-content ul .btn-remove', function(e){
 		e.preventDefault();
 		var key = $(this).closest('li').attr('data-key');
 		var cookies = JSON.parse($.cookie("filters"));

 		galaxy.earth.logoutFilterUser(key);

 		delete cookies[key];

 		var count = 0;
 		for (var k in cookies) {
		    if (cookies.hasOwnProperty(k)) {
		       ++count;
		    }
		}

 		if(count == 0){
 			$('#message-filter').show();
 		}

 		$('li[data-key="'+key+'"]').remove();
 		$.cookie("filters", JSON.stringify(cookies));
 		

 		$('#event-panel .event-content ul li[data-filter="'+key+'"]').remove();
 	});

 	// Event when filter form submitted
 	//--------------------------------------------------
	// Delete filter
	//--------------------------------------------------
 	$(document).on('submit', '#filter-form', function(e){
 		e.preventDefault();
 	});

 	// Event when click on btn-save
 	//--------------------------------------------------
	// Delete filter
	//--------------------------------------------------
 	$(document).on('click', '.btn-save', function(e){
 		var data = $('#filter-form').serializeArray();
 		var filter = {};

 		data.map(function(field){
 			filter[field.name] = field.value;
 		});
 		
 		var cookies = $.cookie("filters");

 		if(cookies == undefined || cookies == null){
 			cookies = {};
 		} else {
 			cookies = JSON.parse(cookies);
 		}

 		if(filter.id == ''){
 			filter.id = getFilterKey(filter);

 			$('#filter-panel .filter-content ul').append(
	 			'<li class="list-group-item" data-key="'+ filter.id +'">'
	            + '<input type="checkbox" class="cbx-filter" id="'+filter.id+'" ' + (filter.checked == 'true' ? 'checked' : '') + '> <label for="'+filter.id+'"><span class="color-label" style="background: '+filter.color+'"></span><span>'+filter.filtername+'</span></label></label>'
	            + '<span class="action-group">'
	            + '<a href="#" class="btn-edit"><i class="glyphicon glyphicon-edit"></i></a>'
	            + '<a href="#" class="btn-remove"><i class="glyphicon glyphicon-remove"></i></a>'
	            + '</span>'
	            + '</li>'
	 		);

 		} else {

 			$('#filter-panel .filter-content ul li[data-key="'+filter.id+'"]').html(
	            '<input type="checkbox" class="cbx-filter" id="'+filter.id+'" ' + (filter.checked == 'true' ? 'checked' : '') + '> <label for="'+filter.id+'"><span class="color-label" style="background: '+filter.color+'"></span><span>'+filter.filtername+'</span></label></label>'
	            + '<span class="action-group">'
	            + '<a href="#" class="btn-edit"><i class="glyphicon glyphicon-edit"></i></a>'
	            + '<a href="#" class="btn-remove"><i class="glyphicon glyphicon-remove"></i></a>'
	            + '</span>'
 			);
 		}

 		cookies[filter.id] = filter;

 		$.cookie("filters", JSON.stringify(cookies));

 		$('#message-filter').hide();

 		loading(true);
 		loadEventList([filter]);

 		$('#filterModal').modal('hide');
 	});

 	// Event when click on add-filter-btn
 	//--------------------------------------------------
	// Delete filter
	//--------------------------------------------------
 	$(document).on('click', '.add-filter-btn', function(){
 		$('#filter-form').get(0).reset();
 		$('#filter-form input[name="id"]').val('');
 		$('#filter-form input[name="checked"]').val('true');
 		$('#filterModal .title').text('Add new filter');
 		$('#filter-color').colorpicker('setValue', 'rgba(1,1,1,1)');
 	});

 	// Event when click on edit btn
 	//--------------------------------------------------
	// Delete filter
	//--------------------------------------------------
 	$(document).on('click', '.filter-content ul .btn-edit', function(e){
 		e.preventDefault();
 		$('#filterModal .title').text('Edit filter');
 		var key = $(this).closest('li').attr('data-key');
 		var cookies = $.cookie("filters");

 		if(cookies != undefined && cookies != null && cookies != ''){
 			var filter = JSON.parse(cookies);

 			if(filter[key] != undefined){
 				for(var attr in filter[key]){
	 				$('#filter-form input[name="'+attr+'"]').val(filter[key][attr]);
	 			}

	 			$('#filter-color').colorpicker('setValue', filter[key]['color']);

	 			$('#filterModal').modal('show');
 			}
 		}
 	});

 	// Event when chkecbox change
 	//--------------------------------------------------
	// Delete filter
	//--------------------------------------------------
 	$(document).on('change', '.cbx-filter', function(){
 		var key = $(this).closest('li').attr('data-key');
 		var cookies = JSON.parse($.cookie("filters"));

 		if($(this).is(':checked')){
 			cookies[key].checked = 'true';
 			loading(true);
 			loadEventList([cookies[key]]);
 		} else {
 			cookies[key].checked = 'false';
 			$('#event-panel .event-content ul li[data-filter="'+key+'"]').remove();
 			galaxy.earth.logoutFilterUser(key);
 		}

 		$.cookie("filters", JSON.stringify(cookies));
 	});
 	
 	//--------------------------------------------------
 	// Event when change rotation
 	// This function will set rotation and lighting of the earth
 	//
 	//--------------------------------------------------
 	$(document).on('change', '#cbx-rotation, #cbx-lighting, #txtRotation', function(){
 		actionSettings();
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
 	// Event click list
 	//
 	//--------------------------------------------------
 	$(document).on('click', '#event-panel .event-content ul li', function(){
 		var filter = $(this).attr('data-filter');
 		var user = $(this).attr('data-user');
 		galaxy.earth.flyTo(filter, user);
 	});

 	//--------------------------------------------------
 	// Resize event
 	//
 	//--------------------------------------------------
 	$( window ).resize(function() {
	  loadScreen();
	});

 	//--------------------------------------------------
 	// Call function load first
 	//
 	//--------------------------------------------------
 	loadScreen();
	loadSettings();
	loadFilterList();

	if(!isEmptyFilterList()){
		loading(true);
	}
	loadEventListByAllFilters();
});