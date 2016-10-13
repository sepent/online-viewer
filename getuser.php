<?php
require 'model/User.php';

try{
	$model = new User();

	$bundle = isset($_GET['bundleId']) ? addslashes($_GET['bundleId']) : '';

	$starttime = isset($_GET['starttime']) ? addslashes($_GET['starttime']) : '';

	$endtime = isset($_GET['endtime']) ? addslashes($_GET['endtime']) : '';

	$data = $model->selectUserLogin($bundle, $starttime, $endtime);

	echo json_encode(['status' => true, 'users' => $data]);

} catch(Exception $e){
	echo json_encode(['status' => false, 'message' => $e->getMessage()]);
}