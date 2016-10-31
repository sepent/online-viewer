/*----------------------------------------------------
* Filename: info.js
* Author: Akademia
* Date: YYYY/MM/DD
* Description: info box
* ----------------------------------------------------
*/

window.showRawEvent = function() {

 	var iframe = $('iframe[class=cesium-infoBox-iframe]').contents();

 	$('#myModal').modal('show');
 	var data = JSON.parse(iframe.find('#jsonUser').val());
 	delete data['filter'];
 	delete data['key'];
 	delete data['shape'];
 	delete data['color'];

 	$('div#dataJsonUser').text(JSON.stringify(data));
};

$('#panel-container').click(function(){
	$('#myModal').modal('hide');
});

function functionLoad(){
	var $head = $("iframe.cesium-infoBox-iframe").contents().find("head");                
    $head.append($("<link/>", { rel: "stylesheet", href: "css/infobox.css", type: "text/css" }));
}