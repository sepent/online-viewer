<?php
/*----------------------------------------------------
* Filename: Db.php
* Author: Akademia
* Date: YYYY/MM/DD
* Description: The Db is parent model, that contains db connection
* ----------------------------------------------------
*/
class Db{
	protected $connection = null;

	/**
	* construct method
	*
	*/
	function __construct(){
		try{
			$host = "ec2-54-225-64-254.compute-1.amazonaws.com";
			$dbname = "dd7lp4mpjcpf1f";
			$username = "bolnwoylarherg";
			$password = "6miwdS4HqZYBN780ngc_2g4CVA";
			$type = "pgsql";
			// $host = "localhost";
			// $dbname = "viewer";
			// $username = "root";
			// $password = "";
			// $type = "mysql";


			if(!$this->connect("{$type}:host={$host};dbname={$dbname}", $username, $password)){
				throw new Exception("Cannot connect to db", 1);
			}

		} catch(Exception $e){
			throw $e;
		}
	}

	/**
	* Connect to db
	*
	* @param string $strConnect
	* @param string $username
	* @param string $password
	* @return boolean
	*/
	public function connect($strConnect, $username, $password){
		try {

		    $this->connection = new PDO($strConnect, $username, $password);

		    if($this->connection){
		    	return true;
		    }
		    
		    return false;
		} catch (PDOException $e) {
		    throw $e;
		}
	}
}