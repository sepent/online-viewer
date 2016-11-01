<?php
/*----------------------------------------------------
* Filename: event.php
* Author: Akademia
* Date: YYYY/MM/DD
* Description: The file to insert event to database
* ----------------------------------------------------
*/

// Set handle error when have some fatal error
@set_exception_handler(function($code, $message, $file, $line){
	ob_clean();
	echo json_encode(['error' => 0, 'message' => 'Success']);
});

@set_error_handler(function($code, $message, $file, $line){
	ob_clean();
	echo json_encode(['error' => 0, 'message' => 'Success']);
});

@register_shutdown_function(function(){
	if ( ($errors = error_get_last()) ) {
		ob_clean();
		echo json_encode(['error' => 0, 'message' => 'Success']);
	}
});

try{
	require 'defined.php';
	// Import model to access to database
	require 'model/User.php';
	//require 'weight/socket.io.php';

	// Check if method is post
	if($_SERVER['REQUEST_METHOD'] == 'POST'){
		//header('Content-type: application/json');
		$model = new User();

		// Get json in header php
		$json = file_get_contents('php://input');
		// Parse to object
		//echo $json;
		$dataObject = json_decode($json, true);

		// Check required parameters
		if(!isset($dataObject['user']['uid'])){
			echo json_encode(['error' => 1, 'message' => 'Parameter user\'s uid is required']);
			return;
		}

		if(!isset($dataObject['bundleid'])){
			echo json_encode(['error' => 1, 'message' => 'Parameter bundleid is required']);
			return;
		}

		if(!isset($dataObject['coords']['latitude'])){
			echo json_encode(['error' => 1, 'message' => 'Parameter latitude is required']);
			return;
		}

		if(!isset($dataObject['coords']['longitude'])){
			echo json_encode(['error' => 1, 'message' => 'Parameter longitude is required']);
			return;
		}

		// Check and get parameters
		$requestData = [
			'userid'			=> addslashes($dataObject['user']['uid']),
			'bundleid'			=> addslashes($dataObject['bundleid']),
			'latitude'			=> addslashes($dataObject['coords']['latitude']),
			'longitude'			=> addslashes($dataObject['coords']['longitude']),
			'timestamp'			=> isset($dataObject['coords']['timestamp']) ? date('Y-m-d H:i:s', strtotime($dataObject['coords']['timestamp'])) : date('Y-m-d H:i:s'),
			'username'			=> isset($dataObject['user']['username'])    ? addslashes($dataObject['user']['username']) : '',
			'device_type'		=> isset($dataObject['device']['type']) 		? addslashes($dataObject['device']['type']) : '',
			'device_platform'	=> isset($dataObject['device']['platform'])  ? addslashes($dataObject['device']['platform']) : '',
			'device_uid'		=> isset($dataObject['device']['uid']) 		? addslashes($dataObject['device']['uid']) : '',
			'user_oauthUid'		=> isset($dataObject['user']['oauthUid']) 	? addslashes($dataObject['user']['oauthUid']) : '',
			'avatar'			=> isset($dataObject['user']['avatar']) 		? addslashes($dataObject['user']['avatar']) : '',
			'city'				=> isset($dataObject['coords']['city']) 		? addslashes($dataObject['user']['city']) : '',
			'country'			=> isset($dataObject['coords']['country'])	? addslashes($dataObject['user']['country']) : '',
			'event_type'		=> isset($dataObject['event']['type']) 		? addslashes($dataObject['event']['type']) : '',
			'event_payload_image'		=> isset($dataObject['event']['payload ']['image']) 	? addslashes($dataObject['event']['payload']['image']) : ''
		];

		// Call method to save data
		if($model->insertUserLogin($requestData)){
			//$socketio = new SocketIO();
			//$socketio->send('https://akademia-analytics-socket.herokuapp.com', null, 'newSign', '');
			$curl = curl_init();
			curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");                                                                     
			curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

			// Call post data URL
			curl_setopt($curl, CURLOPT_URL, SOCKET_URL.'/newSign');  // Set the url path we want to call
			//curl_setopt($curl, CURLOPT_URL, 'http://localhost:8080/newSign');
			$result = curl_exec($curl);

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