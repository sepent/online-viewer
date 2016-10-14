<!DOCTYPE html>
<html>
<head>
	<title>Tester insert Json object</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
</head>

<body>
<script>

function autoinsert(){
				var id = Math.floor(Math.random() * 100);
				var latitude = (Math.random() * (180 + 180) - 180).toFixed(6) * 1;
				var longitude =(Math.random() * (180 + 180) - 180).toFixed(6) * 1;

				var arrayBundid =['com.akademia.ryokou','overfull.net','google.com','apple.com'];

				var rand = arrayBundid[Math.floor(Math.random() * arrayBundid.length)];

				var data = {
							bundleId: rand,
							user: {
									uid: 'user_'+id,
									username:'username'+id,
									avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/2000px-Map_marker.svg.png'
							},
							device: {
								type: 'mobile',
								platform: 'ios',
								uid: 'device_'
							},
							event: {
								type: 'login',
							},
							coords: {
								latitude: latitude,
								longitude: longitude,
								timestamp: '2016-01-25T06:59:59.000Z'
							}
						};
				$.ajax({
					type: "POST",
					url: 'login.php',
					data: data,
					dataType : 'json',
					success: function(res){
					  console.log(res['message']);
						}
					});	
		}
setInterval(autoinsert, 3000);
	</script>
</html>