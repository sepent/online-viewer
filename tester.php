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
			<button onclick="deleteall()">Delete all data</button>		
			<button class="auto">Random logged</button>				
			<div id="message" style="word-break: break-all;"></div>
		</div>
		<div style="float: right; border: 1px solid #ddd; padding: 5px; width: 48%;">
			<form action="event.php" method="post">
				<label>bundleid</label>
				<input type="text" class="form-control" name="bundleid" >

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

			var arrayAvatar = [
							  'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/TUX-G2-SVG.svg/610px-TUX-G2-SVG.svg',
							  'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/2000px-Map_marker.svg.png',
							  'https://www.w3.org/TR/SVG-access/tiger.png',
							  'https://scontent-hkg3-1.xx.fbcdn.net/t31.0-8/11034400_820924321288648_8126060411202343388_o.jpg',
							  'http://cdn.osxdaily.com/wp-content/uploads/2013/07/dancing-banana.gif',
							  'https://upload.wikimedia.org/wikipedia/commons/8/84/Konqi_svg.svg',
							  'http://media.giphy.com/media/109Ku3hdapZJle/giphy.gif'

							];
			var yeahs = [2014, 2015,2016];
			var months = ['01','02','03','04','05','06','07','08','09',11,12]
			var days = ['01','02','03','04','05','06','07','08','09',10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];

			var rand = arrayBundid[Math.floor(Math.random() * arrayBundid.length)];
			var avatar = arrayAvatar[Math.floor(Math.random() * arrayAvatar.length)];

			var yeah = yeahs[Math.floor(Math.random() * yeahs.length)];
			var month = months[Math.floor(Math.random() * months.length)];
			var day = days[Math.floor(Math.random() * days.length)];

			var data = {
				bundleid: rand,
				user: {
						uid: 'user_'+id,
						username:'username'+id,
						avatar: avatar
					},
				device: {
					type: 'mobile',
					platform: 'ios',
					uid: 'device_'
				},
				event: {
					type: 'login',
					payload: 'object'
				},
				coords: {
					latitude: latitude,
					longitude: longitude,
					timestamp: ''+yeah+'-'+month+'-'+day+'T06:59:59.000Z'
				}
			};

			$.ajax({
				type: "POST",
				url: 'jsontest.php',
				data: data,
				dataType : 'json',
				success: function(res){
					console.log(res);
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
				url: 'jsontest.php',
				data: data,
				dataType : 'json',
				success: function(res){
				  	if(res.error == 0){
				  		$('#addmessage').append('Added data:<div style="border: 1px solid #ddd; padding: 5px;">' + JSON.stringify(data) + '</div>');
				  	}
				}
			});	
		});

		function deleteall() {
			$.ajax({
				type:'GET',
				url: 'deleteevents.php',
				dataType : 'json',
				success: function(res){
					$('#message').append('Added data:<div style="border: 1px solid #ddd; padding: 5px;">' +JSON.stringify(res)+ '</div>');
				}
			})
		};
		</script>
	</body>
</html>