<?php
/**
* login.php file
* When have post request from login application
* this page save data to database 
* @method get
*/

try{
	// Import model to access to database
	require 'model/User.php';
	require 'weight/socket.io.php';

	// Check if method is post
	if($_SERVER['REQUEST_METHOD'] == 'POST'){

		$model = new User();

		// Check required parameters
		if(!isset($_POST['user']['uid'])){
			echo json_encode(['error' => 1, 'message' => 'Parameter userid is required']);
			return;
		}

		if(!isset($_POST['bundleid'])){
			echo json_encode(['error' => 1, 'message' => 'Parameter bundleid is required']);
			return;
		}

		if(!isset($_POST['coords']['latitude'])){
			echo json_encode(['error' => 1, 'message' => 'Parameter latitude is required']);
			return;
		}

		if(!isset($_POST['coords']['longitude'])){
			echo json_encode(['error' => 1, 'message' => 'Parameter longitude is required']);
			return;
		}

		// Check and get parameters
		$requestData = [
			'userid'			=> addslashes($_POST['user']['uid']),
			'bundleid'			=> addslashes($_POST['bundleid']),
			'latitude'			=> addslashes($_POST['coords']['latitude']),
			'longitude'			=> addslashes($_POST['coords']['longitude']),
			'timestamp'			=> isset($_POST['coords']['timestamp']) ? date('Y-m-d H:i:s', strtotime($_POST['coords']['timestamp'])) : date('Y-m-d H:i:s'),
			'username'			=> isset($_POST['user']['username'])    ? addslashes($_POST['user']['username']) : '',
			'device_type'		=> isset($_POST['device']['type']) 		? addslashes($_POST['device']['type']) : '',
			'device_platform'	=> isset($_POST['device']['platform'])  ? addslashes($_POST['device']['platform']) : '',
			'device_uid'		=> isset($_POST['device']['uid']) 		? addslashes($_POST['device']['uid']) : '',
			'user_oauthUid'		=> isset($_POST['user']['oauthUid']) 	? addslashes($_POST['user']['oauthUid']) : '',
			'avatar'			=> isset($_POST['user']['avatar']) 		? addslashes($_POST['user']['avatar']) : '',
			'city'				=> isset($_POST['coords']['city']) 		? addslashes($_POST['user']['city']) : '',
			'country'			=> isset($_POST['coords']['country'])	? addslashes($_POST['user']['country']) : '',
			'event_type'		=> isset($_POST['event']['type']) 		? addslashes($_POST['event']['type']) : '',
			'event_payload'		=> isset($_POST['event']['payload ']) 	? addslashes($_POST['event']['payload']) : ''
		];

		// Call method to save data
		if($model->insertUserLogin($requestData)){
			$socketio = new SocketIO();
			$socketio->send('localhost', 8080, 'newSign', '');
		 	echo json_encode(['error' => 0, 'message' => 'Success']);
		 	return;
		}
		
		echo json_encode(['error' => 1, 'message' => 'UnSuccess']);
		return;
	}

	echo json_encode(['error' => 1, 'message' => 'Method is not support']);
} catch (Exception $e){
	echo json_encode(['error' => 1, 'message' => $e->getMessage()]);
}