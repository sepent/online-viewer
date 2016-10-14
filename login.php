<?php
/**
* getuser.php file
* When have ajax call from view (earth) with parameters
* this page return data to view as json 
* @method get
*/

try{
	// Import model to access to database
	require 'model/User.php';

	// Check if method is post
	if($_SERVER['REQUEST_METHOD'] === 'POST'){

	}

	echo json_encode(['error' => 1, 'message' => 'Method is not support']);
} catch (Exception $e){
	echo json_encode(['error' => 1, 'message' => $e->getMessage()]);
}