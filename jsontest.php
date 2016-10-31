<?php

// Data json
$json = '{
            "bundleid": "test.danang.vietnam",
            "user": {
                "uid": "test9999",
                "username": "RikkeiTester"
            },
            "device": {
                "type": "mobile",
                "platform": "ios",
                "uid": "device9999999"
            },
            "event": {
                "type": "login",
                "payload": "object"
            },
            "coords": {
                "latitude": 19,
                "longitude": 30,
                "timestamp": ""
            }
}';

$jsondata = json_encode($_POST);

$curl = curl_init();
curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");                                                                     
curl_setopt($curl, CURLOPT_POSTFIELDS, $jsondata);                                                                  
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);                                                                      
curl_setopt($curl, CURLOPT_HTTPHEADER, array(                                                                          
    'Content-Type: application/json',                                                                                
    'Content-Length: ' . strlen($jsondata))                                                                       
);

// Call post data URL
curl_setopt($curl, CURLOPT_URL, ((!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://").$_SERVER['HTTP_HOST'].'/event.php');  // Set the url path we want to call
$result = curl_exec($curl);

print_r($result);