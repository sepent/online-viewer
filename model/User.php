<?php
require 'Db.php';
/**
* 
*/
class User extends Db{
	/**
	* construct method
	*
	* @param string $strConnect
	* @param string $dbname
	* @param string $username
	* @param string $password
	*/
	function __construct(){
		try{
			$host = "localhost";
			$dbname = "viewer";
			$username = "root";
			$password = "";

			if(!$this->connect("mysql:host={$host};dbname={$dbname}", $username, $password)){
				throw new Exception("Cannot connect to db", 1);
			}

		} catch(Exception $e){
			throw $e;
		}
	}

	/**
	* construct method
	*
	* @param string $bundle
	* @param string $starttime
	* @param string $endtime
	* @return array
	*/
	public function selectUserLogin($bundle, $starttime, $endtime){
		try{
			// Check inject sql
			$bundle = addslashes($bundle);
			$starttime = addslashes($starttime);
			$endtime = addslashes($endtime);

			$sql = "SELECT * FROM users";

			if($bundle){
				$sql .= " WHERE bundleId LIKE '{$bundle}'";
			} else {
				$sql .= " WHERE bundleId LIKE '%'";
			}

			if($starttime){
				$sql .= " AND timestamp >= '{$starttime}'";
			}

			if($endtime){
				$sql .= " AND timestamp <= '{$endtime}'";
			}

			$data = $this->connection->query($sql);

			if(!$data){
				return [];
			}

			return $data->fetchAll(PDO::FETCH_ASSOC);

		} catch (Exception $e){
			throw $e;
		}
	}

	/**
	* construct method
	*
	* @param string $bundle
	* @param string $starttime
	* @param string $endtime
	* @return array
	*/
	public function insertUserLogin(){

	}
}