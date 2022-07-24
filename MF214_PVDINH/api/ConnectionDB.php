<?php
	$server = "localhost";
	$dbName = "wdt.2022.pvdinh";
	$user = "root";
	$pass = "123456";
	try{
		$conn = new PDO("mysql:host=$server; dbname=$dbName; charset=utf8", $user, $pass);
	}
	catch(PDOException $ex){
		die("Error: ".$ex->getMessage());
	}
	header('Access-Control-Allow-Origin: *');

	header('Access-Control-Allow-Methods: GET, POST');

	header("Access-Control-Allow-Headers: X-Requested-With");
?>