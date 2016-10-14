<!DOCTYPE html>
<html>
<head>
	<title>Tester insert Json object</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
</head>
<body>
<button type="button" class="btn btn-primary">Insert data</button>
	<script>

		var id = Math.floor(Math.random() * 100)
		var data = {
					bundleId: 'com.akademia.ryokou'+id,
					user: {
							uid: 'user_'+id,
							username:'username'+id,
							avatar: ''
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
						latitude: 127.3453534,
						longitude: 30.977961,
						timestamp: '2016-01-25T06:59:59.000Z'
					}
				}
				
	$("button").click(function(){
		$.ajax({
			type: "POST",
			url: 'insertjson.php',
			data: data,
			dataType : 'json',
			success: function(res){
			  alert(res['message']);
				}
			});		
		});

	</script>
</html>