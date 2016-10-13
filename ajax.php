<?php
require 'model/MySQL.php';

try{
	$model = new MySQL('localhost', 'test', 'root', '');

	//
	$data = [
		['latitue' => 10, 'longtitue' => 10, 'userid' => 2,'username' => 'Trần lâm tới', 'avatar' => 'http://image.flaticon.com/icons/svg/204/204316.svg'],
		['latitue' => 30, 'longtitue' => 10, 'userid' => 1,'username' => 'Hoàng Văn Quân', 'avatar' => 'http://image.flaticon.com/icons/svg/204/204316.svg']
	];

	echo json_encode(['status' => true, 'users' => $data]);

} catch(Exception $e){
	echo json_encode(['status' => false, 'message' => $e->getMessage()]);
}