<?php
require 'model/User.php';

try{
	if ($_SERVER['REQUEST_METHOD'] === 'POST') {
		$model = new User();
		
		$date = new DateTime($_POST['coords']['timestamp']);
		$datetime = $date->format('Y-m-d H:i:s');

		$data = [
			'userid'=> addslashes($_POST['user']['uid'])	,
			'bundleid'=> addslashes($_POST['bundleId'])	,
			'latitude'=> addslashes($_POST['coords']['latitude']),
			'longitude'=> addslashes($_POST['coords']['longitude']),
			'timestamp'=> $datetime,
			'username'=> addslashes($_POST['user']['username']),
			'device_type'=> addslashes($_POST['device']['type']),
			'device_platform'=> addslashes($_POST['device']['platform']),
			'device_uid'=> addslashes($_POST['device']['uid']),
			'user_oauthUid'=> '',
			'avatar'=> addslashes($_POST['user']['avatar']),
			'city'=> '',
			'country'=>''
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

