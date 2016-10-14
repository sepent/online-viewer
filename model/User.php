<?php
require 'Db.php';
/**
* 
*/
class User extends Db{
	/**
	* construct method
	*
	*/
	function __construct(){
		try{
			$host = "localhost";//"103.18.6.177";
			$dbname = "viewer";//"inamlim9_viewer";
			$username = "root";//"inamlim9_viewer";
			$password = ""; //"Tltttml14112109";

			if(!$this->connect("mysql:host={$host};dbname={$dbname}", $username, $password)){
				throw new Exception("Cannot connect to db", 1);
			}

		} catch(Exception $e){
			throw $e;
		}
	}

	/**
	* selectUserLogin method
	*
	* @param string $bundle
	* @param string $starttime
	* @param string $endtime
	* @return array
	*/
	public function selectUserLogin($bundle, $starttime, $endtime){
		try{

			$sql = "SELECT * FROM users";

			// Check if have bundle name
			if($bundle){
				$sql .= " WHERE bundleId LIKE '{$bundle}'";
			} else {
				$sql .= " WHERE bundleId LIKE '%'";
			}

			// Check if have start time
			if($starttime){
				$sql .= " AND timestamp >= '{$starttime}'";
			}

			// Check if have end time
			if($endtime){
				$sql .= " AND timestamp <= '{$endtime}'";
			}

			$sql .= " ORDER BY timestamp DESC";

			$data = $this->connection->query($sql);

			if(!$data){
				return [];
			}

			// Fetch data to an array
			$rs = $data->fetchAll(PDO::FETCH_ASSOC);

			return $rs ? $rs : [];

		} catch (Exception $e){
			throw $e;
		}
	}

	/**
	* insertUserLogin method
	*
	* @param array $user
	* @return array
	*/
	public function insertUserLogin($user){			
		try{

			$sql = "INSERT INTO users(user_uid,bundleId,latitude,longitude,username,timestamp,avatar,device_type,device_platform,device_uid,user_oauthUid,city,country)"
			   		." VALUES ('{$user['userid']}',
			   					'{$user['bundleid']}',
			   					'{$user['latitude']}',
			   					'{$user['longitude']}',
			   					'{$user['username']}',
			   					'{$user['timestamp']}',
								'{$user['avatar']}',
								'{$user['device_type']}',
								'{$user['device_platform']}',
								'{$user['device_uid']}',
								'{$user['user_oauthUid']}',
								'{$user['city']}',
								'{$user['country']}'
			   					)";
			$data =  $this->connection->query($sql);

			if ($data) {
			    return true;
			} else { 
				return false;
			}
					    
		}catch (Exception $e){
			throw $e;
		}
	}
}