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

	$data = $model->selectUserLogin($bundle, $starttime, $endtime);

	echo json_encode(['error' => 0, 'users' => $data]);

} catch(Exception $e){
	echo json_encode(['error' => 1, 'message' => $e->getMessage()]);
}