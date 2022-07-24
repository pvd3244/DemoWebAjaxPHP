<?php
	require 'ConnectionDB.php';
	$employeeCode = $_GET['employeeCode'];
	$sql = "SELECT*FROM employee e WHERE e.EmployeeCode = '$employeeCode'";
	$data = $conn->query($sql);
	$employee = $data->fetch(PDO::FETCH_ASSOC);
	echo json_encode($employee);
?>