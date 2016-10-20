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
		if($('#filter-container').hasClass('active')){
			$('#filter-container').removeClass('active');
		} else {
			$('#filter-container').addClass('active');
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

	//--------------------------------------------------
 	// Event when submit filter
 	//--------------------------------------------------
 	function saveFilter(data){
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
 			filter.id = window.btoa(Date());

 			$('#filter-panel .filter-content ul').append(
	 			'<li class="list-group-item" data-key="'+ filter.id +'">'
	            + '<input type="checkbox" class="cbx-filter" id="'+filter.id+'" ' + (filter.checked == 'true' ? 'checked' : '') + '> <label for="'+filter.id+'"><span class="color-label" style="background: '+filter.color+'"></span><span>'+filter.filterName+'</span></label></label>'
	            + '<span class="action-group">'
	            + '<a href="#" class="btn-edit"><i class="glyphicon glyphicon-edit"></i></a>'
	            + '<a href="#" class="btn-remove"><i class="glyphicon glyphicon-remove"></i></a>'
	            + '</span>'
	            + '</li>'
	 		);

 		} else {

 			$('#filter-panel .filter-content ul li[data-key="'+filter.id+'"]').html(
	            '<input type="checkbox" class="cbx-filter" id="'+filter.id+'" ' + (filter.checked == 'true' ? 'checked' : '') + '> <label for="'+filter.id+'"><span class="color-label" style="background: '+filter.color+'"></span><span>'+filter.filterName+'</span></label></label>'
	            + '<span class="action-group">'
	            + '<a href="#" class="btn-edit"><i class="glyphicon glyphicon-edit"></i></a>'
	            + '<a href="#" class="btn-remove"><i class="glyphicon glyphicon-remove"></i></a>'
	            + '</span>'
 			);
 		}

 		cookies[filter.id] = filter;

 		$.cookie("filters", JSON.stringify(cookies));

 		$('#message-filter').hide();

 		loadLogin(filter);
 	}

 	//--------------------------------------------------
	// Delete filter
	//--------------------------------------------------
 	function deleteFilter(key){
 		var cookies = JSON.parse($.cookie("filters"));

 		cookies[key].checked = 'false';
 		loadLogin(cookies[key]);

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
 	}

 	//--------------------------------------------------
	// Edit filter
	//--------------------------------------------------
 	function editFilter(key){
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
 	}

 	//--------------------------------------------------
	// Load filter
	//--------------------------------------------------
 	function loadFilter(){
 		var cookies = $.cookie("filters");
 		if(cookies != undefined && cookies != null && cookies != ''){
 			var filters = JSON.parse(cookies);
 			
 			var count = 0;
 			for(var key in filters){
 				count++;
	 			$('#filter-panel .filter-content ul').append(
		 			'<li class="list-group-item" data-key="'+ filters[key].id +'">'
		            + '<input type="checkbox" class="cbx-filter" id="'+filters[key].id+'" ' + (filters[key].checked == 'true' ? 'checked' : '') + '> <label for="'+filters[key].id+'"><span class="color-label" style="background: '+filters[key].color+'"></span><span>'+filters[key].filterName+'</span></label></label>'
		            + '<span class="action-group">'
		            + '<a href="#" class="btn-edit"><i class="glyphicon glyphicon-edit"></i></a>'
		            + '<a href="#" class="btn-remove"><i class="glyphicon glyphicon-remove"></i></a>'
		            + '</span>'
		            + '</li>'
		 		);

		 		loadLogin(filters[key]);
	 		}

	 		if(count != 0){
 				$('#message-filter').hide();
 			}
 		}
 	}

 	// Event when click on delete btn
 	//--------------------------------------------------
	// Delete filter
	//--------------------------------------------------
 	$(document).on('click', '.filter-content ul .btn-remove', function(e){
 		e.preventDefault();
 		var key = $(this).closest('li').attr('data-key');
 		deleteFilter(key);
 	});

 	// Event when click on edit btn
 	//--------------------------------------------------
	// Delete filter
	//--------------------------------------------------
 	$(document).on('click', '.filter-content ul .btn-edit', function(e){
 		e.preventDefault();
 		var key = $(this).closest('li').attr('data-key');
 		editFilter(key);
 	});


 	// Event when filter form submitted
 	//--------------------------------------------------
	// Delete filter
	//--------------------------------------------------
 	$(document).on('submit', '#filter-form', function(e){
 		e.preventDefault();
 		var data = $(this).serializeArray();
 		addFilter(data);
 		$('#filterModal').modal('hide');
 	});

 	// Event when click on btn-save
 	//--------------------------------------------------
	// Delete filter
	//--------------------------------------------------
 	$(document).on('click', '.btn-save', function(e){
 		var data = $('#filter-form').serializeArray();

 		saveFilter(data);
 		
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
 	});

 	// Event when click on add-filter-btn
 	//--------------------------------------------------
	// Delete filter
	//--------------------------------------------------
 	$(document).on('click', '.reload-filter-btn', function(){
 		refreshLogin();
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
 		} else {
 			cookies[key].checked = 'false';
 			$('#event-panel .event-content ul li[data-filter="'+key+'"]').remove();
 		}

 		loadLogin(cookies[key]);

 		$.cookie("filters", JSON.stringify(cookies));
 	});
 	
 	loadFilter();
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
 	$(document).on('click', '.btn-show-more-setting', function(){
 		if($('.more-setting').hasClass('active')){
 			$('.more-setting').removeClass('active')
 			
 			$(this).text('Show more settings');
 		} else {
 			$('.more-setting').addClass('active')
 			$(this).text('Hide settings');
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
 	})
});