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
	$bundle = isset($_GET['bundleId']) ? addslashes($_GET['bundleId']) : '';

	$starttime = isset($_GET['starttime']) ? addslashes($_GET['starttime']) : '';

	$endtime = isset($_GET['endtime']) ? addslashes($_GET['endtime']) : '';

	$deviceType = isset($_GET['deviceType']) ? addslashes($_GET['deviceType']) : '';

	$deviceFlatform = isset($_GET['deviceFlatform']) ? addslashes($_GET['deviceFlatform']) : '';

	$data = $model->selectUserLogin($bundle, $starttime, $endtime, $deviceType, $deviceFlatform);

	echo json_encode(['error' => 0, 'users' => $data]);

} catch(PDOException $e) {
	echo json_encode(['error' => 1, 'message' => 'Have error when access database, please try again!']);
} catch(Exception $e){
	echo json_encode(['error' => 1, 'message' => $e->getMessage()]);
}