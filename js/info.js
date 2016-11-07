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
    var shape = iframe.find('#shape').val();
 	var ressult = {
            "bundleid": data["bundleid"],
            "user": {
                "uid": data["user_uid"],
                "username": data["username"]
            },
            "device": {
                "type": data["device_type"],
                "platform": data["device_platform"],
                "uid": data["device_uid"]
            },
            "event": {
                "type": data["event_type"],
                "payload": {
                	"image": data["event_payload_image"]
                }
            },
            "coords": {
                "latitude": data["latitude"],
                "longitude": data["longitude"],
                "timestamp": data["timestamp"]
            }
	};

 	$('div#dataJsonUser').text(JSON.stringify(ressult));
};

$('#panel-container').click(function(){
	$('#myModal').modal('hide');
});

function functionLoad(){
	var $head = $("iframe.cesium-infoBox-iframe").contents().find("head");         
    $head.append($("<link/>", { rel: "stylesheet", href: "css/infobox.css", type: "text/css" }));
    $( ".cesium-infoBox-camera").unbind( "click" );
    $(".cesium-infoBox-camera").removeAttr("title");

}