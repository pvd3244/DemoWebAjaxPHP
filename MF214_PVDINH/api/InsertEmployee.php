<?php
	require 'ConnectionDB.php';

	$EmployeeCode = $_POST['EmployeeCode'];
	$EmployeeName = $_POST['EmployeeName'];
	if(empty($_POST['DateOfBirth']))
		$DateOfBirth = null;
	else
		$DateOfBirth = $_POST['DateOfBirth'];

	$Gender = $_POST['Gender'];
	$PeopleID = $_POST['PeopleID'];
	if(empty($_POST['AddressRange']))
		$AddressRange = "";
	else
		$AddressRange = $_POST['AddressRange'];

	if(empty($_POST['DateRange']))
		$DateRange = null;
	else
		$DateRange = $_POST['DateRange'];

	$Email = $_POST['Email'];
	$Phone = $_POST['Phone'];
	$PositionCode = $_POST['PositionCode'];
	$DepartmentCode = $_POST['DepartmentCode'];
	if(empty($_POST['SingerCode']))
		$SingerCode = "";
	else
		$SingerCode = $_POST['SingerCode'];

	if(empty($_POST['Salary']))
		$Salary = 0;
	else	
		$Salary = $_POST['Salary'];

	if(empty($_POST['DateOfJoin']))
		$DateOfJoin = null;
	else	
		$DateOfJoin = $_POST['DateOfJoin'];

	if(empty($_POST['WorkStatus']))
		$WorkStatus = 0;
	else
		$WorkStatus = $_POST['WorkStatus'];

	// $EmployeeCode = "NV1234";
	// $EmployeeName = "Pham Dinh";
	// $DateOfBirth = NULL;
	// $Gender = 1;
	// $PeopleID = "";
	// $AddressRange = "";
	// $DateRange = NULL;
	// $Email = "abc@gmail.com";
	// $Phone = "1234";
	// $PositionCode = 0;
	// $DepartmentCode = 0;
	// $SingerCode = "";
	// $Salary = 0;
	// $DateOfJoin = NULL;
	// $WorkStatus = 0;

	$sql = "INSERT INTO employee (EmployeeID, EmployeeCode, EmployeeName, DateOfBirth, Gender, PeopleID, AddressRange, DateRange, Email, Phone, PositionCode, DepartmentCode, SingerCode, Salary, DateOfJoin, WorkStatus, CreatedDate, CreatedBy) 
    VALUES (UUID(), '$EmployeeCode', '$EmployeeName', '$DateOfBirth', $Gender, '$PeopleID', '$AddressRange', '$DateRange', '$Email', '$Phone', $PositionCode, $DepartmentCode, '$SingerCode', $Salary, '$DateOfJoin', $WorkStatus, NOW(), 'admin')";

	$checkEmployeeCode = "SELECT*FROM employee e WHERE e.EmployeeCode = '$EmployeeCode'";
	$check = $conn->query($checkEmployeeCode)->fetch(PDO::FETCH_ASSOC);
	if($check)
		echo 0;
	else{
		$sql = "INSERT INTO employee (EmployeeID, EmployeeCode, EmployeeName, DateOfBirth, Gender, PeopleID, AddressRange, DateRange, Email, Phone, PositionCode, DepartmentCode, SingerCode, Salary, DateOfJoin, WorkStatus, CreatedDate, CreatedBy) 
    	VALUES (UUID(), :EmployeeCode, :EmployeeName, :DateOfBirth, :Gender, :PeopleID, :AddressRange, :DateRange, :Email, :Phone, :PositionCode, :DepartmentCode, :SingerCode, :Salary, :DateOfJoin, :WorkStatus, NOW(), 'admin')";
		$stmt = $conn->prepare($sql);
		$parameters = array('EmployeeCode'=>$EmployeeCode,
						'EmployeeName'=>$EmployeeName,
						'DateOfBirth'=>$DateOfBirth,
						'Gender'=>$Gender,
						'PeopleID'=>$PeopleID,
						'AddressRange'=>$AddressRange,
						'DateRange'=>$DateRange,
						'Email'=>$Email,
						'Phone'=>$Phone,
						'PositionCode'=>$PositionCode,
						'DepartmentCode'=>$DepartmentCode,
						'SingerCode'=>$SingerCode,
						'Salary'=>$Salary,
						'DateOfJoin'=>$DateOfJoin,
						'WorkStatus'=>$WorkStatus);
		$stmt->execute($parameters);
		echo 1;
	}
?>