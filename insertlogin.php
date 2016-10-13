<?php
require 'model/User.php';

try{
	if ($_SERVER['REQUEST_METHOD'] === 'POST') {
		$model = new User();
		
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
			
		if($model->insertUserLogin($data)){
			echo json_encode(['error' => 0, 'message' => 'Success']);
		} else {
			echo json_encode(['error' => 1, 'message' => 'UnSuccess']);
		}
	}else{
		echo json_encode(['error' => 1, 'message' => 'Method is not supported']);
	}
} catch(Exception $e){
	echo json_encode(['error' => 1, 'message' => $e->getMessage()]);
}




	



