<?php
require 'Db.php';
/**
* 
*/
class MySQL extends Db{
	/**
	* construct method
	*
	* @param string $strConnect
	* @param string $dbname
	* @param string $username
	* @param string $password
	*/
	function __construct($host, $dbname, $username, $password){
		try{
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
		return [];
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