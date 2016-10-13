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
			$dbname = "usersviewer";
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
	public function insertUserLogin($user)
	{	date_default_timezone_set("Asia/Ho_Chi_Minh"); 
		


		try{
			$user_uid = "user_".rand();
			$timestamp = date('Y-m-d H:i:s');
			$bundleid = $user['bundleid'];
			$latitude = $user['latitude'];
			$longitude = $user['longitude'];
			$username = $user['username'];
			$device_type = $user['device_type'];
			$device_platform = $user['device_platform'];
			$device_uid = $user['device_uid'];
			$user_oauthUid = $user['user_oauthUid'];
			$avatar = $user['avatar'];
			$city = $user['city'];
			$country = $user['country'];

			/**
				$user_uid use test update
			*/
			//$user_uid = 'user_04';

			$sqlselect = "SELECT * FROM users WHERE user_uid = '$user_uid' ";
			$dataselect = $this->connection->query($sqlselect);

				if($dataselect == null){
					$sql = "INSERT INTO users(user_uid,bundleId,latitude,longitude,username,timestamp,avatar,device_type,device_platform,device_uid,user_oauthUid,city,country)"
					   		." VALUES ('$user_uid',
					   					'$bundleid',
					   					'$latitude',
					   					'$longitude',
					   					'$username',
					   					'$timestamp',
										'$avatar',
										'$device_type',
										'$device_platform',
										'$device_uid',
										'$user_oauthUid',
										'$city',
										'$country'
					   					)";
							$data =  $this->connection->query($sql);

							if ($data) {
							    echo "insert successfully";
							} else { 
								echo 'error';
							}
				}else{
					$sql =" UPDATE users"
						. " SET 	bundleId ='$bundleid',"
						. " latitude ='$latitude',"
					   	. " longitude ='$longitude',"
					   	. " username = '$username',"
					   	. " timestamp ='$timestamp',"
					   	. " avatar ='$avatar',"
					   	. " device_type ='$device_type',"
					   	. " device_platform ='$device_platform',"
					   	. " device_uid = '$device_uid',"
					   	. " user_oauthUid ='$user_oauthUid',"
					   	. " city ='$city',"
					   	. " country ='$country'"
					   	. " WHERE user_uid = '$user_uid'";
					echo $sql;						
					$data =  $this->connection->query($sql);
					if($data){
						echo "update successfully";
					}else{
						echo "update error";
					}
				}
					    
		}catch (Exception $e){
			throw $e;
		}
	}
}