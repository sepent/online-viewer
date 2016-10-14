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
	* construct method
	*
	* @param string $bundle
	* @param string $starttime
	* @param string $endtime
	* @return array
	*/
	public function selectUserLogin($bundle, $starttime, $endtime){
		try{

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

			$rs = $data->fetchAll(PDO::FETCH_ASSOC);

			return $rs ? $rs : [];

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
	{	//date_default_timezone_set("Asia/Ho_Chi_Minh"); 
		
		try{
			$user_uid = $user['userid'];
			//$timestamp = date('Y-m-d H:i:s');
			$timestamp = $user['timestamp'];
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
			//$user_uid = 'user_4486';
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
				    return true;
				} else { 
					return false;
				}
					    
		}catch (Exception $e){
			throw $e;
		}
	}

	public function insertJson($value='')
	{
		
	}
}