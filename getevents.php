<?php
/*----------------------------------------------------
* Filename: getevents.php
* Author: Akademia
* Date: YYYY/MM/DD
* Description: The file to select events with filter
* ----------------------------------------------------
*/

try{
	// Require model to access to database
	require 'model/User.php';

	
	$model = new User();

	// Check and get parameter
	$bundle = isset($_GET['bundleid']) ? addslashes($_GET['bundleid']) : '';

	$starttime = isset($_GET['starttime']) ? addslashes($_GET['starttime']) : '';

	$date = strtotime(date('Y-m-d H:i:s'));
	if(is_numeric($starttime)){
		$starttime = date('Y-m-d H:i:s', $date + $starttime);
	}

	$endtime = isset($_GET['endtime']) ? addslashes($_GET['endtime']) : '';
	if(is_numeric($endtime)){
		$endtime = date('Y-m-d H:i:s', $date + $endtime);
	}

	$device_type = isset($_GET['device_type']) ? addslashes($_GET['device_type']) : '';

	$device_platform = isset($_GET['device_platform']) ? addslashes($_GET['device_platform']) : '';

	$event_type = isset($_GET['event_type']) ? addslashes($_GET['event_type']) : '';

	$data = $model->selectUserLogin($bundle, $starttime, $endtime, $device_type, $device_platform, $event_type);

	echo json_encode(['error' => 0, 'users' => $data]);

} catch(PDOException $e) {
	echo json_encode(['error' => 1, 'message' => 'Have error when access database, please try again!']);
} catch(Exception $e){
	echo json_encode(['error' => 1, 'message' => $e->getMessage()]);
}