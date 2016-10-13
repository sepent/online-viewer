<?php
/**
* 
*/
class Db{
	protected $connection = null;

	/**
	* Connect to db
	*
	* @param string $strConnect
	* @param string $username
	* @param string $password
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