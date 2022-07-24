<?php
	require 'ConnectionDB.php';
	$employeeCode = $_GET['employeeCode'];
	$sql = "DELETE FROM employee WHERE EmployeeCode = '$employeeCode'";
	$lineNumbers = $conn->exec($sql);
	if($lineNumbers > 0)
		echo 1;
	else
		echo 0;
?>