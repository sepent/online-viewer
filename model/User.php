<?php
/*----------------------------------------------------
* Filename: User.php
* Author: Akademia
* Date: YYYY/MM/DD
* Description: The user model, that connect to users table in database
* ----------------------------------------------------
*/
require 'Db.php';
/**
* 
*/
class User extends Db{

	/**
	* selectUserLogin method
	*
	* @param string $bundle
	* @param string $starttime
	* @param string $endtime
	* @return array
	*/
	public function selectUserLogin($bundleid, $starttime, $endtime, $device_type, $device_platform, $event_type){
		try{

			$sql = "SELECT * FROM users";

			// Check if have bundle name
			// if($bundleid){
			// 	$sql .= " WHERE bundleid LIKE '%{$bundleid}%'";
			// } else {
			// 	$sql .= " WHERE bundleid LIKE '%'";
			// }
			if($bundleid){
				$bundleid = strtolower($bundleid);
				$sql .= " WHERE lower(bundleid) similar to '%{$bundleid}%'";
			} else {
				$sql .= " WHERE lower(bundleid) similar to '%'";
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
			// if($device_type){
			// 	$sql .= " AND device_type LIKE '{$device_type}'";
			// }
			if($device_type){
				$device_type = strtolower($device_type);
				$sql .= " AND lower(device_type) similar to '{$device_type}'";
			}

			// Device platform
			// if($device_platform){
			// 	$sql .= " AND device_platform LIKE '{$device_platform}'";
			// }
			if($device_platform){
				$device_platform = strtolower($device_platform);
				$sql .= " AND lower(device_platform) similar to '{$device_platform}'";
			}

			// Check if have event
			// if($event_type){
			// 	$sql .= " AND event_type LIKE '{$event_type}'";
			// }
			if($event_type){
				$event_type = strtolower($event_type);
				$sql .= " AND lower(event_type) similar to '%{$event_type}%'";
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
	* @return boolean
	*/
	public function insertUserLogin($user){			
		try{

			$sql = "INSERT INTO users(user_uid,bundleid,latitude,longitude,username,timestamp,avatar,device_type,device_platform,device_uid,user_oauthUid,city,country,event_type,event_payload_image)"
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
								'{$user['event_payload_image']}'
			   					)";

			$data =  $this->connection->query($sql);

			if ($data) {
			    return true;
			}

			return false;					    
		}catch (Exception $e){
			throw $e;
		}
	}

	/**
	 * Delete all data
	 * @return boolean
	 */
	public function deleteAllData(){
		$sql = "DELETE FROM users";
		return $this->connection->query($sql);

		if ($data) {
		    return true;
		}

		return false;
	}
}