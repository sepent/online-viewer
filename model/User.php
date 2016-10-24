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
			$host = "ec2-54-225-64-254.compute-1.amazonaws.com";
			$dbname = "dd7lp4mpjcpf1f";
			$username = "bolnwoylarherg";
			$password = "6miwdS4HqZYBN780ngc_2g4CVA";
			$type = "pgsql";

			if(!$this->connect("{$type}:host={$host};dbname={$dbname}", $username, $password)){
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
	public function selectUserLogin($bundle, $starttime, $endtime, $device, $device_platform){
		try{

			$sql = "SELECT * FROM users";

			// Check if have bundle name
			if($bundle){
				$sql .= " WHERE bundleId LIKE '%{$bundle}%'";
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

			// Check if have device
			if($device){
				$sql .= " AND device_type LIKE '{$device}'";
			}

			// Device flatform
			if($device_platform){
				$sql .= " AND device_platform LIKE '{$device_platform}'";
			}

			// Check if have event
			// if($event){
			// 	$sql .= " AND event_type <= '{$event}'";
			// }

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

			$sql = "INSERT INTO users(user_uid,bundleId,latitude,longitude,username,timestamp,avatar,device_type,device_platform,device_uid,user_oauthUid,city,country,event_type,event_payload)"
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
								'{$user['country']}',
								'{$user['event_type']}',
								'{$user['event_payload']}'
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