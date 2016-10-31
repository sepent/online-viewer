<?php 

require 'model/User.php';
$model = new User();

if($model->deleteAllData())
{
	echo json_encode(['error' => 0, 'message' => 'Success']);
	return;
}else{
	echo json_encode(['error' => 1, 'message' => 'UnSuccess']);
	return;
}
