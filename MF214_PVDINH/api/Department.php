<?php
	require 'ConnectionDB.php';
	$sql = "SELECT*FROM department";
	$departments = $conn->query($sql);
	$departmentList = array();
	while($row = $departments->fetch(PDO::FETCH_ASSOC)){
		$departmentList[] = array('departmentCode' => $row['DepartmentCode'],
								 'departmentName' => $row['DepartmentName']);
	}
	echo json_encode($departmentList);
?>