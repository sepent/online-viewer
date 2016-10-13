<!DOCTYPE html>
<html>
<head>
	<title></title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" >
</head>
<body>
<div class="container">
				<form action="insertlogin.php" method="post">
					<div class="form-group">
					<label>BundleId</label>
					<input type="text" class="form-control" name="BundleId" >
					</div>
					<div class="form-inline">
						<div class="form-group">
							<label>Latitude</label>
							<input type="text" class="form-control" name= "latitude">
							</div>
							<div class="form-group">
							<label>Longitude</label>
							<input type="text" class="form-control" name= "longitude" >
						</div>
					</div>
					<div class="form-group">
					<label>Username</label>
					<input type="text" class="form-control" name= "username" >
					</div>
					 <div class="form-group">
					<label>Device_type</label>
					<input type="text" class="form-control" name="device_type" >
					</div>
					<div class="form-group">
					<label>Device_platform</label>
					<input type="text" class="form-control" name="device_platform" >
					</div>
					 <div class="form-group">
					<label >Device_uid</label>
					<input type="text" class="form-control" name="device_uid">
					</div>
					<div class="form-group">
					<label >Avatar</label>
					<input type="text" class="form-control" name="avatar" >
					</div>
					<div class="form-group">
					<label >user_oauthUid</label>
					<input type="text" class="form-control" name="user_oauthUid" >
					</div>
					<div class="form-inline">
						<div class="form-group">
							<label >City</label>
							<input type="text" class="form-control" name="city" >
							</div>
							<div class="form-group">
							<label >Country</label>
							<input type="text" class="form-control" name="country" >
						</div>
					</div>
					<button type="submit" class="btn btn-default">Submit</button>
			</form>
</div>

</body>
</html>