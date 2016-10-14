<!DOCTYPE html>
<html>
	<head>
		<title>Tester insert Json object</title>
		<script src="plugins/jquery/jquery.min.js"></script>
		<style type="text/css">
			input{
				width: 50%;
				margin-bottom: 5px;
				display: block;
			}
		</style>
	</head>

	<body>
		<div style="float: left; border: 1px solid #ddd; padding: 5px; width: 48%;">
			<button class="auto">Random logged</button>				
			<div id="message" style="word-break: break-all;"></div>
		</div>
		<div style="float: right; border: 1px solid #ddd; padding: 5px; width: 48%;">
			<form action="insertlogin.php" method="post">
				<label>BundleId</label>
				<input type="text" class="form-control" name="bundleId" >

				<label>User_Id</label>
				<input type="text" class="form-control" name="user[uid]" value="user_" >

				<label>Username</label>
				<input type="text" class="form-control" name="user[username]" value="" >

				<label>avatar</label>
				<input type="text" class="form-control" name="user[avatar]" value="" >

				<label>Latitude</label>
				<input type="text" class="form-control" name= "coords[latitude]">

				<label>Longitude</label>
				<input type="text" class="form-control" name= "coords[longitude]" >

				<label>Timestamp</label>
				<input type="text" class="form-control" name= "coords[timestamp]" >

				<label>Event</label>
				<input type="text" class="form-control" name= "event[type]" >

				<label>Device type</label>
				<input type="text" class="form-control" name= "device[type]" >

				<label>Device platform</label>
				<input type="text" class="form-control" name= "device[platform]" >

				<label>Device uid</label>
				<input type="text" class="form-control" name= "device[uid]" >

				<button type="submit" class="btn btn-default">Add logged</button>
			</form>
			<div id="addmessage" style="word-break: break-all;"></div>
		</div>
		<script type="text/javascript">
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
				  	if(res.error == 0){
				  		$('#message').append('Added data:<div style="border: 1px solid #ddd; padding: 5px;">' + JSON.stringify(data) + '</div>');
				  	}
				}
			});	
		}
		//setInterval(autoinsert, 3000);
		$('.auto').click(function(){
			autoinsert();
		});

		// Set data
		$('form').submit(function(e){
			e.preventDefault();
			var data = $(this).serializeArray();
			$.ajax({
				type: "POST",
				url: 'login.php',
				data: data,
				dataType : 'json',
				success: function(res){
				  	if(res.error == 0){
				  		$('#addmessage').append('Added data:<div style="border: 1px solid #ddd; padding: 5px;">' + JSON.stringify(data) + '</div>');
				  	}
				}
			});	
		});
		</script>
	</body>
</html>