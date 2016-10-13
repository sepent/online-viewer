<?php
require 'model/User.php';
	
	$model = new User();



	if ($_SERVER['REQUEST_METHOD'] === 'POST') {

			if($_POST['BundleId'] == null )
			{
				 return ['message'=>'Bundleid is request'];
			}

			$data = [
				'bundleid'=> addslashes($_POST['BundleId'])	,
				'latitude'=> addslashes($_POST['latitude']),
				'longitude'=> addslashes($_POST['longitude']),
				'username'=> addslashes($_POST['username']),
				'device_type'=> addslashes($_POST['device_type']),
				'device_platform'=> addslashes($_POST['device_platform']),
				'device_uid'=> addslashes($_POST['device_uid']),
				'user_oauthUid'=> addslashes($_POST['user_oauthUid']),
				'avatar'=> addslashes($_POST['avatar']),
				'city'=> addslashes($_POST['city']),
				'country'=> addslashes($_POST['country'])
				];
				
				$model->insertUserLogin($data);
	}
	else{
		echo "npo";
	}
	




	



