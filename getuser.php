<?php
/**
* getuser.php file
* When have ajax call from view (earth) with parameters
* this page return data to view as json 
* @method get
*/

try{
	// Require model to access to database
	require 'model/User.php';
	
	$model = new User();

	// Check and get parameter
	$bundle = isset($_GET['bundleid']) ? addslashes($_GET['bundleid']) : '';

	$starttime = isset($_GET['starttime']) ? addslashes($_GET['starttime']) : '';

	$endtime = isset($_GET['endtime']) ? addslashes($_GET['endtime']) : '';

	$device_type = isset($_GET['device_type']) ? addslashes($_GET['device_type']) : '';

	$device_flatform = isset($_GET['device_flatform']) ? addslashes($_GET['device_flatform']) : '';

	$data = $model->selectUserLogin($bundle, $starttime, $endtime, $device_type, $device_flatform);

	echo json_encode(['error' => 0, 'users' => $data]);

} catch(PDOException $e) {
	echo json_encode(['error' => 1, 'message' => 'Have error when access database, please try again!']);
} catch(Exception $e){
	echo json_encode(['error' => 1, 'message' => $e->getMessage()]);
}